import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * UserService - Handles user profile initialization and management
 */
export const UserService = {
	/**
	 * Initialize user profile in Firestore
	 * Creates a new user document if it doesn't exist
	 * @param {Object} user - Firebase user object
	 * @returns {Promise<void>}
	 */
	async initializeUser(user) {
		try {
			if (!user) {
				throw new Error('User object is required');
			}

			const userRef = doc(db, 'users', user.uid);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				// Create the new user profile
				await setDoc(userRef, {
					uid: user.uid,
					email: user.email || 'Anonymous',
					isAnonymous: user.isAnonymous,
					createdAt: serverTimestamp(),
					stats: {
						bottlesThrown: 0,
						bottlesFound: 0,
						bottlesKept: 0,
					},
				});
				console.log('User profile created for', user.uid);
			} else {
				console.log('User profile already exists for', user.uid);
			}
		} catch (error) {
			console.error('Error initializing user:', error);
			throw new Error('Failed to initialize user profile');
		}
	},

	/**
	 * Get user profile from Firestore
	 * @param {string} userId - User ID
	 * @returns {Promise<Object>} - User profile data
	 */
	async getUserProfile(userId) {
		try {
			const userRef = doc(db, 'users', userId);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				throw new Error('User profile not found');
			}

			return {
				id: userSnap.id,
				...userSnap.data(),
			};
		} catch (error) {
			console.error('Error getting user profile:', error);
			throw new Error('Failed to get user profile');
		}
	},
};

export default UserService;
