import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCkammUx0F7NX4Lf1wo4PAB173g2lUjfac",
	authDomain: "drift-chronicles-dev-a254f.firebaseapp.com",
	projectId: "drift-chronicles-dev-a254f",
	storageBucket: "drift-chronicles-dev-a254f.firebasestorage.app",
	messagingSenderId: "134532957790",
	appId: "1:134532957790:web:9e0d95dd95d966f46156cf",
	measurementId: "G-2FQHLX2QLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
// This ensures auth state persists between app sessions
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
