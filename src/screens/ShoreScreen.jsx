import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	Image,
	Animated,
	Dimensions,
	ActivityIndicator,
	Alert,
	RefreshControl,
	BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ShoreScreen.styles';
import BottleService from '../services/BottleService';
import { logout } from '../services/authService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ShoreScreen({ navigation }) {
	// State for fetched bottle (null = no bottle, object = bottle found)
	const [bottle, setBottle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [lastUpdated, setLastUpdated] = useState(null);
	const [seenBottleIds, setSeenBottleIds] = useState([]); // Track bottles seen in this session

	// Animation value for bobbing effect
	const bobbingAnim = useRef(new Animated.Value(0)).current;

	// Disable back button to prevent going back to login (only when this screen is focused)
	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			// Check if this screen is focused
			const isFocused = navigation.isFocused();
			if (isFocused) {
				// Return true to prevent default back behavior only on ShoreScreen
				return true;
			}
			// Return false to allow default back behavior on other screens
			return false;
		});

		return () => backHandler.remove();
	}, [navigation]);

	// Check for bottles on mount only
	useEffect(() => {
		checkTide();
	}, []);

	// Bobbing animation effect
	useEffect(() => {
		const bobbing = Animated.loop(
			Animated.sequence([
				Animated.timing(bobbingAnim, {
					toValue: -10,
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(bobbingAnim, {
					toValue: 10,
					duration: 2000,
					useNativeDriver: true,
				}),
			])
		);

		bobbing.start();

		return () => bobbing.stop();
	}, [bobbingAnim]);

	const checkTide = async () => {
		try {
			setIsLoading(true);
			// Exclude bottles already seen in this session
			const foundBottle = await BottleService.pickBottle(seenBottleIds);
			if (foundBottle) {
				setBottle(foundBottle);
				setSeenBottleIds([...seenBottleIds, foundBottle.id]);
			} else {
				setBottle(null);
			}
			setLastUpdated(new Date());
			console.log('Bottle check:', foundBottle ? 'Found bottle!' : 'No bottles available');
		} catch (error) {
			console.error('Error checking for bottles:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await checkTide();
		setRefreshing(false);
	};

	const handleThrowBottle = () => {
		navigation.navigate('Compose');
	};

	const handleOpenBottle = () => {
		if (bottle) {
			navigation.navigate('BottleViewer', {
				bottleId: bottle.id,
				seenBottleIds: seenBottleIds // Pass seen bottles for continuity
			});
		}
	};

	const handleProfile = () => {
		Alert.alert(
			'Leave the Shore?',
			'Do you want to sign out and return to the void?',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Sign Out',
					style: 'destructive',
					onPress: async () => {
						try {
							await logout();
							navigation.reset({
								index: 0,
								routes: [{ name: 'Welcome' }],
							});
						} catch (error) {
							Alert.alert('Error', error.message || 'Failed to sign out');
						}
					}
				}
			]
		);
	};



	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			{/* Starry Background */}
			<View style={styles.starsContainer}>
				{[...Array(30)].map((_, index) => (
					<View
						key={index}
						style={[
							styles.star,
							{
								left: Math.random() * SCREEN_WIDTH,
								top: Math.random() * SCREEN_HEIGHT,
								opacity: 0.3 + Math.random() * 0.7,
							},
						]}
					/>
				))}
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor="#00D9FF"
						colors={['#00D9FF']}
					/>
				}
			>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Ionicons name="water" size={28} color="#00D9FF" />
						<Text style={styles.headerTitle}>The Shore</Text>
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity
							style={styles.iconButton}
							onPress={handleProfile}
							activeOpacity={0.7}
						>
							<Ionicons name="exit-outline" size={24} color="#E8F0FF" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Main Content Area */}
				<View style={styles.contentContainer}>
					{!bottle ? (
						// Empty State
						<View style={styles.emptyState}>
							<View style={styles.waveAnimation}>
								{[...Array(3)].map((_, index) => (
									<View
										key={index}
										style={[
											styles.wave,
											{
												opacity: 0.3 + index * 0.2,
												marginTop: index * 20,
											},
										]}
									/>
								))}
							</View>
							<Text style={styles.emptyText}>The ocean is quiet...</Text>
							<Text style={styles.emptySubtext}>
								No bottles have drifted to shore yet
							</Text>
						</View>
					) : (
						// Bottle Found State
						<TouchableOpacity
							style={styles.bottleContainer}
							onPress={handleOpenBottle}
							activeOpacity={0.9}
						>
							<Animated.View
								style={[
									styles.bottleImageContainer,
									{
										transform: [{ translateY: bobbingAnim }],
									},
								]}
							>
								{/* Bottle Image */}
								<Image
									source={require('../../assets/drifting_bottle.png')}
									style={styles.bottleImage}
									resizeMode="contain"
								/>
							</Animated.View>

							<Text style={styles.bottleText}>A bottle has washed up...</Text>
							<Text style={styles.bottleAction}>TAP TO OPEN</Text>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>

			{/* Floating Action Button - Throw a Bottle */}
			<View style={styles.fabContainer}>
				<TouchableOpacity
					style={styles.fab}
					onPress={handleThrowBottle}
					activeOpacity={0.8}
				>
					<Ionicons name="add" size={28} color="#0A0E27" />
					<Text style={styles.fabText}>Throw a Bottle</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
