import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StatusBar,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/BottleViewer.styles';
import BottleService from '../services/BottleService';

export default function BottleViewer({ route, navigation }) {
	const { bottleId, seenBottleIds = [] } = route.params || {};
	const [bottle, setBottle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [localSeenIds, setLocalSeenIds] = useState([...seenBottleIds, bottleId]);

	useEffect(() => {
		console.log('[BottleViewer] Bottle ID changed:', bottleId);
		console.log('[BottleViewer] Current localSeenIds:', localSeenIds);
		fetchBottle();
	}, [bottleId]);

	const fetchBottle = async () => {
		try {
			setIsLoading(true);

			// Fetch bottle using BottleService
			const bottleData = await BottleService.getBottle(bottleId);
			setBottle(bottleData);
		} catch (error) {
			console.error('Fetch bottle error:', error);
			Alert.alert('Error', error.message || 'Failed to load bottle message.');
			navigation.goBack();
		} finally {
			setIsLoading(false);
		}
	};

	const handleThrowBack = async () => {
		Alert.alert(
			'Throw Back?',
			'This bottle will drift back into the ocean for someone else to find.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Throw Back',
					style: 'destructive',
					onPress: async () => {
						try {
							setIsProcessing(true);

							// Return bottle using BottleService
							await BottleService.returnBottle(bottle.id);
							console.log('Bottle thrown back:', bottle.id);

							// Try to fetch the next bottle (excluding already seen ones)
							console.log('[ThrowBack] Current localSeenIds before fetch:', localSeenIds);
							const nextBottle = await BottleService.pickBottle(localSeenIds);
							console.log('[ThrowBack] Next bottle received:', nextBottle?.id);

							if (nextBottle) {
								// Found a new bottle - update state
								const newSeenIds = [...localSeenIds, nextBottle.id];
								setBottle(nextBottle);
								setLocalSeenIds(newSeenIds);
								console.log('[ThrowBack] Updated localSeenIds:', newSeenIds);
								console.log('[ThrowBack] Loaded next bottle:', nextBottle.id);
							} else {
								// No more new bottles - return to Shore
								console.log('No more bottles available, returning to Shore');
								navigation.goBack();
							}
						} catch (error) {
							console.error('Return bottle error:', error);
							Alert.alert('Error', error.message || 'Failed to throw back bottle.');
						} finally {
							setIsProcessing(false);
						}
					}
				}
			]
		);
	};

	const handleKeepAndReply = async () => {
		try {
			setIsProcessing(true);

			// Claim bottle and get chat ID
			const { chatId } = await BottleService.claimBottle(bottle.id);
			console.log('Bottle claimed, chat created:', chatId);

			// Navigate to Chat screen
			navigation.replace('Chat', { chatId });
		} catch (error) {
			console.error('Claim bottle error:', error);
			Alert.alert('Error', error.message || 'Failed to keep bottle.');
			setIsProcessing(false);
		}
	};

	const handleClose = () => {
		navigation.goBack();
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#00D9FF" />
				<Text style={styles.loadingText}>Opening bottle...</Text>
			</View>
		);
	}

	if (!bottle) {
		return null;
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={handleClose}
					activeOpacity={0.7}
				>
					<Ionicons name="close" size={28} color="#E8F0FF" />
				</TouchableOpacity>

				<View style={styles.headerCenter}>
					<Ionicons name="water" size={20} color="#00D9FF" />
					<Text style={styles.headerTitle}>THE SHORE</Text>
				</View>

				<TouchableOpacity
					style={styles.menuButton}
					activeOpacity={0.7}
				>
					<Ionicons name="ellipsis-vertical" size={24} color="#E8F0FF" />
				</TouchableOpacity>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Message Card */}
				<View style={styles.messageCard}>
					{/* Quote Icon */}
					<View style={styles.quoteIconContainer}>
						<Ionicons name="chatbox-ellipses" size={32} color="#00D9FF" />
					</View>

					{/* Message Text */}
					<Text style={styles.messageText}>{bottle.content}</Text>

					{/* Location/Metadata */}
					<View style={styles.metadata}>
						<Ionicons name="location-outline" size={16} color="#8B93B0" />
						<Text style={styles.metadataText}>{bottle.location || 'From somewhere in the world...'}</Text>
					</View>
				</View>
			</ScrollView>

			{/* Action Buttons */}
			<View style={styles.actionBar}>
				<TouchableOpacity
					style={styles.throwBackButton}
					onPress={handleThrowBack}
					disabled={isProcessing}
					activeOpacity={0.7}
				>
					<Ionicons name="water-outline" size={20} color="#E8F0FF" />
					<Text style={styles.throwBackText}>Throw Back</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.keepButton, isProcessing && styles.buttonDisabled]}
					onPress={handleKeepAndReply}
					disabled={isProcessing}
					activeOpacity={0.8}
				>
					{isProcessing ? (
						<ActivityIndicator color="#0A0E27" />
					) : (
						<>
							<Ionicons name="chatbubble" size={20} color="#0A0E27" />
							<Text style={styles.keepText}>Keep & Reply</Text>
						</>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
}
