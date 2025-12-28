import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	StatusBar,
	Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

// Feature card data
const FEATURES = [
	{
		id: 1,
		icon: 'shield-checkmark',
		title: 'Zero Tracking',
		description: "We don't collect personal data.",
	},
	{
		id: 2,
		icon: 'eye-off',
		title: '100% Anonymous',
		description: 'Your identity is never revealed.',
	},
	{
		id: 3,
		icon: 'lock-closed',
		title: 'Secure Encryption',
		description: 'Messages are end-to-end encrypted.',
	},
];

const FeatureCard = ({ icon, title, description }) => (
	<View style={styles.featureCard}>
		<View style={styles.iconContainer}>
			<Ionicons name={icon} size={24} color={COLORS.cyan} />
		</View>
		<View style={styles.featureTextContainer}>
			<Text style={styles.featureTitle}>{title}</Text>
			<Text style={styles.featureDescription}>{description}</Text>
		</View>
	</View>
);

const WelcomeScreen = ({ navigation }) => {
	const handleStartDrifting = () => {
		// Navigate to Login screen (will show anonymous "Enter Void" option)
		navigation?.navigate('Login');
	};

	const handleSignIn = () => {
		// Navigate to Login screen with email form visible
		navigation?.navigate('Login', { showEmailForm: true });
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={COLORS.oceanDark} />

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Header / Logo */}
				<View style={styles.header}>
					<Text style={styles.logoSymbol}>∞</Text>
					<Text style={styles.logoText}>DriftChronicles</Text>
				</View>

				{/* Hero Visual - Wave Animation Placeholder */}
				<View style={styles.heroContainer}>
					<LinearGradient
						colors={['transparent', COLORS.oceanDark]}
						style={styles.heroGradient}
					/>
					{/* Animated wave visualization */}
					<View style={styles.waveContainer}>
						{/* Multiple wave layers for depth effect */}
						{[...Array(5)].map((_, index) => (
							<View
								key={index}
								style={[
									styles.waveLine,
									{
										top: 40 + index * 25,
										opacity: 0.3 + (index * 0.15),
										transform: [
											{ translateX: index % 2 === 0 ? -20 : 20 },
											{ scaleX: 1 + (index * 0.1) },
										],
									},
								]}
							/>
						))}
						{/* Glowing orbs for particle effect */}
						{[...Array(8)].map((_, index) => (
							<View
								key={`orb-${index}`}
								style={[
									styles.glowOrb,
									{
										left: 30 + (index * 35),
										top: 50 + Math.sin(index) * 40,
										width: 4 + (index % 3) * 2,
										height: 4 + (index % 3) * 2,
										opacity: 0.4 + (index % 4) * 0.15,
									},
								]}
							/>
						))}
					</View>
				</View>

				{/* Main Headlines */}
				<View style={styles.headlineContainer}>
					<Text style={styles.primaryHeadline}>Speak Freely.</Text>
					<Text style={styles.secondaryHeadline}>Drift Anonymously.</Text>
				</View>

				{/* Description */}
				<Text style={styles.description}>
					Share your thoughts without revealing your identity. Your voice matters, but your name stays hidden.
				</Text>

				{/* Feature Cards */}
				<View style={styles.featuresContainer}>
					{FEATURES.map((feature) => (
						<FeatureCard
							key={feature.id}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					))}
				</View>

				{/* CTA Section */}
				<View style={styles.ctaContainer}>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={handleStartDrifting}
						activeOpacity={0.8}
					>
						<Text style={styles.primaryButtonText}>Start Drifting</Text>
						<Ionicons name="arrow-forward" size={20} color={COLORS.oceanDark} />
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.secondaryButton}
						onPress={handleSignIn}
						activeOpacity={0.7}
					>
						<Text style={styles.secondaryButtonText}>
							Already have an account?{' '}
							<Text style={styles.signInLink}>Sign In</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},

	// Header styles
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 60,
		paddingBottom: 20,
	},
	logoSymbol: {
		fontSize: 28,
		color: COLORS.cyan,
		marginRight: 8,
		fontWeight: FONTS.weights.bold,
	},
	logoText: {
		fontSize: FONTS.sizes.xl,
		color: COLORS.oceanText,
		fontWeight: FONTS.weights.semibold,
	},

	// Hero visual styles
	heroContainer: {
		height: 220,
		marginHorizontal: SPACING.lg,
		marginTop: SPACING.md,
		borderRadius: BORDER_RADIUS.lg,
		backgroundColor: COLORS.oceanSurface,
		overflow: 'hidden',
		position: 'relative',
	},
	heroGradient: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 60,
		zIndex: 10,
	},
	waveContainer: {
		flex: 1,
		position: 'relative',
	},
	waveLine: {
		position: 'absolute',
		left: 0,
		right: 0,
		height: 2,
		backgroundColor: COLORS.cyan,
		borderRadius: 1,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 10,
	},
	glowOrb: {
		position: 'absolute',
		borderRadius: 50,
		backgroundColor: COLORS.cyan,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 8,
	},

	// Headline styles
	headlineContainer: {
		alignItems: 'center',
		marginTop: SPACING.xxl,
		paddingHorizontal: SPACING.lg,
	},
	primaryHeadline: {
		fontSize: FONTS.sizes.xxxl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanText,
		textAlign: 'center',
	},
	secondaryHeadline: {
		fontSize: FONTS.sizes.xxxl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.cyan,
		textAlign: 'center',
		marginTop: 4,
	},

	// Description styles
	description: {
		fontSize: FONTS.sizes.md,
		color: COLORS.oceanMuted,
		textAlign: 'center',
		marginTop: SPACING.lg,
		marginHorizontal: SPACING.xxl,
		lineHeight: 24,
	},

	// Feature cards styles
	featuresContainer: {
		marginTop: SPACING.xxxl,
		paddingHorizontal: SPACING.lg,
		gap: SPACING.md,
	},
	featureCard: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.oceanCard,
		borderRadius: BORDER_RADIUS.md,
		padding: SPACING.lg,
		borderWidth: 1,
		borderColor: 'rgba(0, 217, 255, 0.1)',
	},
	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: BORDER_RADIUS.sm,
		backgroundColor: 'rgba(0, 217, 255, 0.15)',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: SPACING.lg,
	},
	featureTextContainer: {
		flex: 1,
	},
	featureTitle: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
		marginBottom: 4,
	},
	featureDescription: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
	},

	// CTA styles
	ctaContainer: {
		marginTop: SPACING.xxxl,
		paddingHorizontal: SPACING.lg,
		alignItems: 'center',
	},
	primaryButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.cyan,
		borderRadius: BORDER_RADIUS.xl,
		paddingVertical: SPACING.lg,
		paddingHorizontal: SPACING.xxxl,
		width: '100%',
		gap: 8,
	},
	primaryButtonText: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanDark,
	},
	secondaryButton: {
		marginTop: SPACING.lg,
		padding: SPACING.md,
	},
	secondaryButtonText: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
	},
	signInLink: {
		color: COLORS.cyan,
		fontWeight: FONTS.weights.semibold,
	},
});

export default WelcomeScreen;
