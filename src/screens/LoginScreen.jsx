import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
	Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { loginAnonymously, register, login } from '../services/authService';
import { styles } from '../styles/LoginScreen.styles';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const slideAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.spring(slideAnim, {
			toValue: isRegistering ? 1 : 0,
			useNativeDriver: false,
			tension: 50,
			friction: 7,
		}).start();
	}, [isRegistering]);

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			setError('');

			if (!email.trim() || !password.trim()) {
				setError('Please enter both email and password');
				return;
			}

			if (isRegistering) {
				// Sign up the user
				await register(email, password);

				// After successful signup, switch to login mode
				setPassword('');
				setError('');
				setIsRegistering(false); // Switch to Log In
			} else {
				await login(email, password);

				console.log('Navigating to Shore');
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAnonymousLogin = async () => {
		try {
			setIsLoading(true);
			setError('');
			await loginAnonymously();
			console.log('Navigating to Shore');
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={COLORS.oceanDark} />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.keyboardView}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{/* Header */}
					<View style={styles.header}>
						<View style={styles.logoContainer}>
							<Text style={styles.logoSymbol}>∞</Text>
						</View>
						<Text style={styles.title}>The Void</Text>
						<Text style={styles.subtitle}>Whisper into the unknown.</Text>
					</View>

					{/* Error Message */}
					{error ? (
						<View style={styles.errorContainer}>
							<Text style={styles.errorText}>{error}</Text>
						</View>
					) : null}

					{/* Auth Toggle */}
					<View style={styles.toggleContainer}>
						<TouchableOpacity
							onPress={() => setIsRegistering(false)}
							style={[
								styles.toggleButton,
								!isRegistering && styles.toggleButtonActive,
							]}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.toggleText,
									!isRegistering && styles.toggleTextActive,
								]}
							>
								Log In
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIsRegistering(true)}
							style={[
								styles.toggleButton,
								isRegistering && styles.toggleButtonActive,
							]}
							activeOpacity={0.7}
						>
							<Text
								style={[
									styles.toggleText,
									isRegistering && styles.toggleTextActive,
								]}
							>
								Sign Up
							</Text>
						</TouchableOpacity>
					</View>

					{/* Email Input */}
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Email</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="anon@example.com"
								placeholderTextColor={COLORS.oceanMuted}
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
								editable={!isLoading}
							/>
							<Ionicons name="at" size={20} color={COLORS.oceanMuted} />
						</View>
					</View>

					{/* Password Input */}
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="••••••••"
								placeholderTextColor={COLORS.oceanMuted}
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!showPassword}
								autoCapitalize="none"
								editable={!isLoading}
							/>
							<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
								<Ionicons
									name={showPassword ? 'eye-off' : 'eye'}
									size={20}
									color={COLORS.oceanMuted}
								/>
							</TouchableOpacity>
						</View>
					</View>

					{/* Forgot Password */}
					<TouchableOpacity style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot password?</Text>
					</TouchableOpacity>

					{/* Primary Button - Dynamic Text */}
					<TouchableOpacity
						onPress={handleSubmit}
						disabled={isLoading}
						style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
						activeOpacity={0.8}
					>
						{isLoading ? (
							<ActivityIndicator color={COLORS.oceanDark} />
						) : (
							<View style={styles.buttonContent}>
								<Text style={styles.primaryButtonText}>
									{isRegistering ? 'SIGN UP' : 'ENTER THE VOID'}
								</Text>
								<Ionicons name="arrow-forward" size={20} color={COLORS.oceanDark} />
							</View>
						)}
					</TouchableOpacity>

					{/* Secondary Button - Anonymous */}
					<TouchableOpacity
						onPress={handleAnonymousLogin}
						disabled={isLoading}
						style={styles.secondaryButton}
						activeOpacity={0.7}
					>
						<View style={styles.buttonContent}>
							<Ionicons name="eye-off-outline" size={18} color={COLORS.oceanMuted} />
							<Text style={styles.secondaryButtonText}>
								Or drift silently (Anonymous Entry)
							</Text>
						</View>
					</TouchableOpacity>

					{/* Footer */}
					<View style={styles.footer}>
						<Text style={styles.footerText}>
							By entering, you agree to our{' '}
							<Text style={styles.footerLink}>Anonymity Rules</Text>.
						</Text>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}


