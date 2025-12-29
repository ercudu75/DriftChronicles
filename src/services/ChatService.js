import {
	collection,
	doc,
	addDoc,
	updateDoc,
	query,
	where,
	orderBy,
	getDocs,
	getDoc,
	onSnapshot,
	serverTimestamp,
	limit,
	increment,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

/**
 * ChatService - Handles all Firestore operations for chats
 */
const ChatService = {
	/**
	 * Get all active chats for current user
	 * @returns {Promise<Array>} - Array of chat objects
	 */
	async getUserChats() {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			const chatsQuery = query(
				collection(db, 'chats'),
				where('participants', 'array-contains', currentUser.uid),
				where('isActive', '==', true),
				orderBy('lastMessageAt', 'desc')
			);

			const querySnapshot = await getDocs(chatsQuery);
			const chats = [];

			querySnapshot.forEach((doc) => {
				chats.push({
					id: doc.id,
					...doc.data(),
				});
			});

			return chats;
		} catch (error) {
			console.error('Error getting user chats:', error);
			throw new Error('Failed to load chats');
		}
	},

	/**
	 * Get messages for a chat
	 * @param {string} chatId - The chat ID
	 * @param {number} messageLimit - Max messages to fetch
	 * @returns {Promise<Array>} - Array of message objects
	 */
	async getChatMessages(chatId, messageLimit = 50) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			const messagesQuery = query(
				collection(db, 'chats', chatId, 'messages'),
				orderBy('createdAt', 'asc'),
				limit(messageLimit)
			);

			const querySnapshot = await getDocs(messagesQuery);
			const messages = [];

			querySnapshot.forEach((doc) => {
				messages.push({
					id: doc.id,
					...doc.data(),
				});
			});

			return messages;
		} catch (error) {
			console.error('Error getting messages:', error);
			throw new Error('Failed to load messages');
		}
	},

	/**
	 * Subscribe to real-time message updates
	 * @param {string} chatId - The chat ID
	 * @param {Function} callback - Called with updated messages
	 * @returns {Function} - Unsubscribe function
	 */
	subscribeToMessages(chatId, callback) {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			console.error('User must be authenticated');
			return () => { };
		}

		const messagesQuery = query(
			collection(db, 'chats', chatId, 'messages'),
			orderBy('createdAt', 'asc')
		);

		const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
			const messages = [];
			snapshot.forEach((doc) => {
				messages.push({
					id: doc.id,
					...doc.data(),
				});
			});
			callback(messages);
		}, (error) => {
			console.error('Error subscribing to messages:', error);
		});

		return unsubscribe;
	},

	/**
	 * Send a new message to a chat
	 * @param {string} chatId - The chat ID
	 * @param {string} content - Message content
	 * @returns {Promise<void>}
	 */
	async sendMessage(chatId, content) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			if (!content.trim()) {
				throw new Error('Message cannot be empty');
			}

			// Get chat to find recipient
			const chatDoc = await getDoc(doc(db, 'chats', chatId));
			const chatData = chatDoc.data();
			const recipientId = chatData.participants.find(id => id !== currentUser.uid);

			// Add message to subcollection
			await addDoc(collection(db, 'chats', chatId, 'messages'), {
				senderId: currentUser.uid,
				content: content.trim(),
				createdAt: serverTimestamp(),
				type: 'reply',
			});

			// Update chat's lastMessage and increment recipient's unread count
			await updateDoc(doc(db, 'chats', chatId), {
				lastMessage: content.trim(),
				lastMessageAt: serverTimestamp(),
				[`unreadCount.${recipientId}`]: increment(1),
			});
		} catch (error) {
			console.error('Error sending message:', error);
			throw new Error('Failed to send message');
		}
	},

	/**
	 * Release a chat (end the conversation for both users)
	 * @param {string} chatId - The chat ID
	 * @returns {Promise<void>}
	 */
	async releaseChat(chatId) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			await updateDoc(doc(db, 'chats', chatId), {
				isActive: false,
				releasedAt: serverTimestamp(),
				releasedBy: currentUser.uid,
			});

			console.log('Chat released:', chatId);
		} catch (error) {
			console.error('Error releasing chat:', error);
			throw new Error('Failed to release chat');
		}
	},

	/**
	 * Mark a chat as read for the current user
	 * @param {string} chatId - The chat ID
	 * @returns {Promise<void>}
	 */
	async markChatAsRead(chatId) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			await updateDoc(doc(db, 'chats', chatId), {
				[`unreadCount.${currentUser.uid}`]: 0,
				[`lastReadAt.${currentUser.uid}`]: serverTimestamp(),
			});
		} catch (error) {
			console.error('Error marking chat as read:', error);
		}
	},

	/**
	 * Get a single chat by ID
	 * @param {string} chatId - The chat ID
	 * @returns {Promise<Object>} - Chat data
	 */
	async getChat(chatId) {
		try {
			const currentUser = auth.currentUser;
			if (!currentUser) {
				throw new Error('User must be authenticated');
			}

			const chatDoc = await getDoc(doc(db, 'chats', chatId));

			if (!chatDoc.exists()) {
				throw new Error('Chat not found');
			}

			return {
				id: chatDoc.id,
				...chatDoc.data(),
			};
		} catch (error) {
			console.error('Error getting chat:', error);
			throw new Error('Failed to load chat');
		}
	},
};

export default ChatService;
