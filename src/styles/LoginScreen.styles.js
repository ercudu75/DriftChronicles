import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
	},
	keyboardView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: SPACING.xxxl,
		paddingVertical: SPACING.xxxl * 2,
		justifyContent: 'center',
	},

	// Header
	header: {
		alignItems: 'center',
		marginBottom: SPACING.xxxl,
	},
	logoContainer: {
		width: 80,
		height: 80,
		backgroundColor: COLORS.oceanSurface,
		borderRadius: BORDER_RADIUS.lg,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.lg,
	},
	logoSymbol: {
		fontSize: 40,
		color: COLORS.cyan,
		fontWeight: FONTS.weights.bold,
	},
	title: {
		fontSize: FONTS.sizes.xxxl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanText,
		marginBottom: SPACING.sm,
	},
	subtitle: {
		fontSize: FONTS.sizes.md,
		color: COLORS.oceanMuted,
	},

	// Error
	errorContainer: {
		backgroundColor: 'rgba(255, 82, 82, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(255, 82, 82, 0.3)',
		borderRadius: BORDER_RADIUS.md,
		padding: SPACING.lg,
		marginBottom: SPACING.lg,
	},
	errorText: {
		color: COLORS.error,
		fontSize: FONTS.sizes.sm,
		textAlign: 'center',
	},

	// Toggle
	toggleContainer: {
		flexDirection: 'row',
		backgroundColor: 'rgba(26, 31, 58, 0.5)',
		borderRadius: BORDER_RADIUS.full,
		padding: 4,
		marginBottom: SPACING.xl,
	},
	toggleButton: {
		flex: 1,
		paddingVertical: SPACING.md,
		borderRadius: BORDER_RADIUS.full,
		alignItems: 'center',
	},
	toggleButtonActive: {
		backgroundColor: COLORS.oceanSurface,
	},
	toggleText: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanMuted,
	},
	toggleTextActive: {
		color: COLORS.oceanText,
	},

	// Inputs
	inputGroup: {
		marginBottom: SPACING.lg,
	},
	label: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanText,
		marginBottom: SPACING.sm,
		fontWeight: FONTS.weights.medium,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.oceanSurface,
		borderRadius: BORDER_RADIUS.md,
		paddingHorizontal: SPACING.lg,
		paddingVertical: SPACING.lg,
	},
	input: {
		flex: 1,
		fontSize: FONTS.sizes.md,
		color: COLORS.oceanText,
	},

	// Forgot Password
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: SPACING.xl,
	},
	forgotPasswordText: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
	},

	// Buttons
	primaryButton: {
		backgroundColor: COLORS.cyan,
		borderRadius: BORDER_RADIUS.md,
		paddingVertical: SPACING.lg,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.lg,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
	primaryButtonText: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanDark,
	},
	secondaryButton: {
		borderWidth: 1,
		borderColor: 'rgba(139, 147, 176, 0.3)',
		borderRadius: BORDER_RADIUS.md,
		paddingVertical: SPACING.md,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.xl,
	},
	secondaryButtonText: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
		marginLeft: SPACING.sm,
	},
	buttonContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},

	// Footer
	footer: {
		marginTop: SPACING.lg,
	},
	footerText: {
		fontSize: FONTS.sizes.xs,
		color: COLORS.oceanMuted,
		textAlign: 'center',
	},
	footerLink: {
		color: COLORS.cyan,
	},
});
