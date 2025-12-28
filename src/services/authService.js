import { auth } from '../config/firebase';
import {
	signInAnonymously,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth';

/**
 * Sign in anonymously - Primary "Enter Void" action
 * @returns {Promise<Object>} User credential object
 * @throws {Error} Clean error message for UI display
 */
export const loginAnonymously = async () => {
	try {
		const userCredential = await signInAnonymously(auth);
		return userCredential;
	} catch (error) {
		switch (error.code) {
			case 'auth/operation-not-allowed':
				throw new Error('Anonymous sign-in is not enabled. Please contact support.');
			case 'auth/network-request-failed':
				throw new Error('Network error. Please check your connection and try again.');
			default:
				throw new Error(error.message || 'Failed to sign in anonymously. Please try again.');
		}
	}
};

/**
 * Register a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential object
 * @throws {Error} Clean error message for UI display
 */
export const register = async (email, password) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		switch (error.code) {
			case 'auth/email-already-in-use':
				throw new Error('This email is already registered. Please try logging in instead.');
			case 'auth/invalid-email':
				throw new Error('Invalid email address. Please check and try again.');
			case 'auth/weak-password':
				throw new Error('Password is too weak. Please use at least 6 characters.');
			case 'auth/operation-not-allowed':
				throw new Error('Email/password sign-up is not enabled. Please contact support.');
			case 'auth/network-request-failed':
				throw new Error('Network error. Please check your connection and try again.');
			default:
				throw new Error(error.message || 'Failed to create account. Please try again.');
		}
	}
};

/**
 * Sign in an existing user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} User credential object
 * @throws {Error} Clean error message for UI display
 */
export const login = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential;
	} catch (error) {
		switch (error.code) {
			case 'auth/invalid-email':
				throw new Error('Invalid email address. Please check and try again.');
			case 'auth/user-disabled':
				throw new Error('This account has been disabled. Please contact support.');
			case 'auth/user-not-found':
				throw new Error('No account found with this email. Please sign up first.');
			case 'auth/wrong-password':
				throw new Error('Incorrect password. Please try again.');
			case 'auth/invalid-credential':
				throw new Error('Invalid credentials. Please check your email and password.');
			case 'auth/network-request-failed':
				throw new Error('Network error. Please check your connection and try again.');
			default:
				throw new Error(error.message || 'Failed to sign in. Please try again.');
		}
	}
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 * @throws {Error} Clean error message for UI display
 */
export const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		switch (error.code) {
			case 'auth/network-request-failed':
				throw new Error('Network error. Please check your connection and try again.');
			default:
				throw new Error(error.message || 'Failed to sign out. Please try again.');
		}
	}
};
