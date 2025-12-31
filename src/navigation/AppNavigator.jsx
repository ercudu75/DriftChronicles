import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ShoreScreen from '../screens/ShoreScreen';
import ComposeScreen from '../screens/ComposeScreen';
import BottleViewer from '../screens/BottleViewer';
import ChroniclesScreen from '../screens/ChroniclesScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app
function MainTabs() {
	const [totalUnread, setTotalUnread] = useState(0);

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) return;

		// Listen to chats for unread count
		const chatsQuery = query(
			collection(db, 'chats'),
			where('participants', 'array-contains', currentUser.uid),
			where('isActive', '==', true)
		);

		const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
			let count = 0;
			snapshot.forEach((doc) => {
				const data = doc.data();
				const userUnread = data.unreadCount?.[currentUser.uid] || 0;
				count += userUnread;
			});
			setTotalUnread(count);
		});

		return () => unsubscribe();
	}, []);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#0A1628',
					borderTopWidth: 1,
					borderTopColor: 'rgba(255, 255, 255, 0.05)',
					height: 85,
					paddingBottom: 25,
					paddingTop: 10,
				},
				tabBarActiveTintColor: '#00D4AA',
				tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: '500',
				},
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Ocean') {
						iconName = focused ? 'water' : 'water-outline';
					} else if (route.name === 'Chronicles') {
						iconName = focused ? 'mail' : 'mail-outline';
					}

					// Add indicator bar for active tab
					return (
						<View style={{ alignItems: 'center' }}>
							{focused && (
								<View
									style={{
										width: 24,
										height: 3,
										backgroundColor: '#00D4AA',
										borderRadius: 2,
										marginBottom: 6,
									}}
								/>
							)}
							<View>
								<Ionicons name={iconName} size={24} color={color} />
								{route.name === 'Chronicles' && totalUnread > 0 && (
									<View style={styles.badge}>
										<Text style={styles.badgeText}>
											{totalUnread > 99 ? '99+' : totalUnread}
										</Text>
									</View>
								)}
							</View>
						</View>
					);
				},
			})}
		>
			<Tab.Screen name="Ocean" component={ShoreScreen} />
			<Tab.Screen name="Chronicles" component={ChroniclesScreen} />
		</Tab.Navigator>
	);
}

export default function AppNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: '#0A1628' },
				}}
			>
				{/* Auth Screens */}
				<Stack.Screen name="Welcome" component={WelcomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />

				{/* Main App with Tabs - Disable back navigation */}
				<Stack.Screen
					name="Main"
					component={MainTabs}
					options={{
						gestureEnabled: false,
						headerLeft: () => null,
					}}
				/>

				{/* Modal/Detail Screens */}
				<Stack.Screen
					name="Compose"
					component={ComposeScreen}
					options={{
						presentation: 'modal',
						animation: 'slide_from_bottom',
					}}
				/>
				<Stack.Screen
					name="BottleViewer"
					component={BottleViewer}
				/>
				<Stack.Screen
					name="Chat"
					component={ChatScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	badge: {
		position: 'absolute',
		right: -8,
		top: -4,
		backgroundColor: '#EF4444',
		borderRadius: 10,
		minWidth: 18,
		height: 18,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 4,
	},
	badgeText: {
		color: '#FFFFFF',
		fontSize: 10,
		fontWeight: '700',
	},
});
