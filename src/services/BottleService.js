import {
	collection,
	addDoc,
	updateDoc,
	doc,
	increment,
	serverTimestamp,
	query,
	where,
	getDocs,
	limit,
	writeBatch,
	arrayUnion,
	runTransaction,
	getDoc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

/**
 * BottleService - Handles all Firestore operations for bottles
 */
const BottleService = {
	/**
	 * Cast a new bottle into the ocean
	 * @param {string} content - The message content
	 * @returns {Promise<string>} - The new bottle ID
	 */
	async castBottle(content) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated to cast a bottle');
			}

			const batch = writeBatch(db);

			// Action A: Create new bottle document
			const bottleRef = doc(collection(db, 'bottles'));
			batch.set(bottleRef, {
				content,
				creatorId: currentUser.uid,
				status: 'DRIFTING',
				createdAt: serverTimestamp(),
				viewedBy: [], // Users who viewed and threw back
				claimedBy: null, // User who kept the bottle
				history: [], // Deprecated - keeping for backward compatibility
			});

			// Action B: Update user stats
			const userRef = doc(db, 'users', currentUser.uid);
			batch.update(userRef, {
				'stats.bottlesThrown': increment(1),
			});

			// Commit batch
			await batch.commit();

			return bottleRef.id;
		} catch (error) {
			console.error('Error casting bottle:', error);
			throw new Error('Failed to cast bottle into the ocean');
		}
	},

	/**
	 * Pick a random bottle from the ocean
	 * @param {Array<string>} excludeIds - Optional array of bottle IDs to exclude
	 * @returns {Promise<Object|null>} - A random bottle or null if none available
	 */
	async pickBottle(excludeIds = []) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated to pick a bottle');
			}

			// Query for drifting bottles (increased limit for better availability)
			const bottlesQuery = query(
				collection(db, 'bottles'),
				where('status', '==', 'DRIFTING'),
				limit(100)
			);

			const querySnapshot = await getDocs(bottlesQuery);

			console.log(`[PickBottle] Total DRIFTING bottles found: ${querySnapshot.size}`);
			console.log(`[PickBottle] Excluding ${excludeIds.length} bottles:`, excludeIds);

			if (querySnapshot.empty) {
				console.log('[PickBottle] No bottles in database');
				return null;
			}

			// Filter out bottles created by current user, viewed by them, or claimed
			const availableBottles = [];
			querySnapshot.forEach((doc) => {
				const bottleData = doc.data();
				const isOwnBottle = bottleData.creatorId === currentUser.uid;
				// Only check viewedBy if no excludeIds provided (first load)
				// If excludeIds provided, rely on local session tracking
				const alreadyViewed = excludeIds.length === 0 && bottleData.viewedBy?.includes(currentUser.uid);
				const isClaimed = bottleData.claimedBy != null; // Checks both null and undefined
				const isExcluded = excludeIds.includes(doc.id);

				if (!isOwnBottle && !alreadyViewed && !isClaimed && !isExcluded) {
					availableBottles.push({
						id: doc.id,
						...bottleData,
					});
				}
			});

			console.log(`[PickBottle] Available bottles after filtering: ${availableBottles.length}`);

			if (availableBottles.length === 0) {
				console.log('[PickBottle] No available bottles after filtering');
				return null;
			}

			// Return a random bottle from available ones
			const randomIndex = Math.floor(Math.random() * availableBottles.length);
			const selectedBottle = availableBottles[randomIndex];
			console.log(`[PickBottle] Selected bottle: ${selectedBottle.id}`);
			return selectedBottle;
		} catch (error) {
			console.error('Error picking bottle:', error);
			throw new Error('Failed to pick a bottle from the ocean');
		}
	},

	/**
	 * Return a bottle back to the ocean (throw back)
	 * Adds user to viewedBy array so they won't see it again this session
	 * @param {string} bottleId - The bottle ID to return
	 * @returns {Promise<void>}
	 */
	async returnBottle(bottleId) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated to return a bottle');
			}

			const bottleRef = doc(db, 'bottles', bottleId);

			// Add current user to viewedBy array
			await updateDoc(bottleRef, {
				viewedBy: arrayUnion(currentUser.uid),
			});
		} catch (error) {
			console.error('Error returning bottle:', error);
			throw new Error('Failed to return bottle to the ocean');
		}
	},

	/**
	 * Claim a bottle (keep it and prepare to reply)
	 * Creates a chat document and adds bottle message as first message
	 * @param {string} bottleId - The bottle ID to claim
	 * @returns {Promise<{chatId: string}>} - The created chat ID
	 */
	async claimBottle(bottleId) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated to claim a bottle');
			}

			const bottleRef = doc(db, 'bottles', bottleId);
			let bottleData;
			let chatId;

			// Use transaction to ensure bottle is still available
			await runTransaction(db, async (transaction) => {
				const bottleDoc = await transaction.get(bottleRef);

				if (!bottleDoc.exists()) {
					throw new Error('Bottle not found');
				}

				bottleData = bottleDoc.data();

				// Check if bottle is still drifting
				if (bottleData.status !== 'DRIFTING') {
					throw new Error('This bottle has already been claimed');
				}

				// Update bottle status to claimed
				transaction.update(bottleRef, {
					status: 'CLAIMED',
					claimedBy: currentUser.uid,
					claimedAt: serverTimestamp(),
				});

				// Update user stats
				const userRef = doc(db, 'users', currentUser.uid);
				transaction.update(userRef, {
					'stats.bottlesFound': increment(1),
				});
			});

			// Create chat document after successful claim
			const chatRef = doc(collection(db, 'chats'));
			chatId = chatRef.id;

			const batch = writeBatch(db);

			// Create chat document
			batch.set(chatRef, {
				participants: [bottleData.creatorId, currentUser.uid],
				creatorId: bottleData.creatorId,
				claimerId: currentUser.uid,
				bottleId: bottleId,
				bottleContent: bottleData.content,
				lastMessage: bottleData.content,
				lastMessageAt: serverTimestamp(),
				createdAt: serverTimestamp(),
				isActive: true,
			});

			// Add bottle content as first message
			const firstMessageRef = doc(collection(db, 'chats', chatId, 'messages'));
			batch.set(firstMessageRef, {
				senderId: bottleData.creatorId,
				content: bottleData.content,
				createdAt: serverTimestamp(),
				type: 'bottle',
			});

			await batch.commit();
			console.log('Chat created with ID:', chatId);

			return { chatId };
		} catch (error) {
			console.error('Error claiming bottle:', error);
			if (error.message === 'This bottle has already been claimed') {
				throw error;
			}
			throw new Error('Failed to claim bottle');
		}
	},

	/**
	 * Get a specific bottle by ID
	 * @param {string} bottleId - The bottle ID
	 * @returns {Promise<Object>} - The bottle data
	 */
	async getBottle(bottleId) {
		try {
			const bottleRef = doc(db, 'bottles', bottleId);
			const bottleDoc = await getDoc(bottleRef);

			if (!bottleDoc.exists()) {
				throw new Error('Bottle not found');
			}

			return {
				id: bottleDoc.id,
				...bottleDoc.data(),
			};
		} catch (error) {
			console.error('Error getting bottle:', error);
			throw new Error('Failed to retrieve bottle');
		}
	},
};

export default BottleService;
