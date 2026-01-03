import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
	},

	// Header
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: SPACING.lg,
		paddingTop: SPACING.xxxl + 20,
		paddingBottom: SPACING.xl,
	},
	closeButton: {
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
		letterSpacing: 2,
	},
	headerSpacer: {
		width: 44,
	},

	// Input Area
	inputContainer: {
		flex: 1,
		paddingHorizontal: SPACING.xl,
		paddingTop: SPACING.lg,
	},
	textInput: {
		flex: 1,
		fontSize: FONTS.sizes.lg,
		color: COLORS.oceanText,
		textAlignVertical: 'top',
		lineHeight: 28,
	},

	// Footer
	footer: {
		paddingHorizontal: SPACING.xl,
		paddingBottom: SPACING.xxxl,
		paddingTop: SPACING.lg,
	},
	charCounter: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
		textAlign: 'right',
		marginBottom: SPACING.md,
	},
	charCounterError: {
		color: COLORS.error,
	},
	charCounterValid: {
		color: COLORS.cyan,
	},

	// Cast Button
	castButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.cyan,
		borderRadius: BORDER_RADIUS.xl,
		paddingVertical: SPACING.lg,
		gap: SPACING.sm,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 12,
		elevation: 8,
	},
	castButtonDisabled: {
		backgroundColor: COLORS.oceanMuted,
		opacity: 0.5,
	},
	castButtonText: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanDark,
	},
});
