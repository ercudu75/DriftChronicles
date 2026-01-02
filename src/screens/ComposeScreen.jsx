import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ComposeScreen.styles';
import BottleService from '../services/BottleService';

const MAX_CHARS = 500;
const MIN_CHARS = 10;

export default function ComposeScreen({ navigation }) {
	const [text, setText] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleClose = () => {
		if (text.trim().length > 0) {
			Alert.alert(
				'Discard Message?',
				'Are you sure you want to discard this message?',
				[
					{ text: 'Cancel', style: 'cancel' },
					{
						text: 'Discard',
						style: 'destructive',
						onPress: () => navigation.goBack()
					},
				]
			);
		} else {
			navigation.goBack();
		}
	};

	const handleCastBottle = async () => {
		const trimmedText = text.trim();

		// Validation
		if (trimmedText.length < MIN_CHARS) {
			Alert.alert(
				'Message Too Short',
				`Your message must be at least ${MIN_CHARS} characters long.`
			);
			return;
		}

		if (trimmedText.length > MAX_CHARS) {
			Alert.alert(
				'Message Too Long',
				`Your message must be less than ${MAX_CHARS} characters.`
			);
			return;
		}

		try {
			setIsSubmitting(true);

			// Cast bottle using BottleService
			const bottleId = await BottleService.castBottle(trimmedText);
			console.log('Bottle cast successfully:', bottleId);

			Alert.alert(
				'Bottle Cast Away!',
				'Your message is now drifting in the ocean...',
				[
					{
						text: 'OK',
						onPress: () => navigation.goBack()
					}
				]
			);
		} catch (error) {
			console.error('Cast bottle error:', error);
			Alert.alert('Error', error.message || 'Failed to cast bottle. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const charCount = text.length;
	const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.closeButton}
					onPress={handleClose}
					activeOpacity={0.7}
				>
					<Ionicons name="close" size={28} color="#E8F0FF" />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>COMPOSE</Text>
				<View style={styles.headerSpacer} />
			</View>

			{/* Text Input Area */}
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder="Write your thought..."
					placeholderTextColor="#64748b"
					value={text}
					onChangeText={setText}
					multiline
					maxLength={MAX_CHARS}
					autoFocus
					editable={!isSubmitting}
				/>
			</View>

			{/* Footer */}
			<View style={styles.footer}>
				{/* Character Counter */}
				<Text style={[
					styles.charCounter,
					charCount > MAX_CHARS && styles.charCounterError,
					charCount >= MIN_CHARS && charCount <= MAX_CHARS && styles.charCounterValid
				]}>
					{charCount}/{MAX_CHARS}
				</Text>

				{/* Cast Button */}
				<TouchableOpacity
					style={[
						styles.castButton,
						(!isValid || isSubmitting) && styles.castButtonDisabled
					]}
					onPress={handleCastBottle}
					disabled={!isValid || isSubmitting}
					activeOpacity={0.8}
				>
					{isSubmitting ? (
						<ActivityIndicator color="#0A0E27" />
					) : (
						<>
							<Ionicons name="arrow-forward" size={24} color="#0A0E27" />
							<Text style={styles.castButtonText}>Cast into Ocean</Text>
						</>
					)}
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
