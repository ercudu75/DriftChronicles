import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
	},

	// Loading State
	loadingContainer: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loadingText: {
		fontSize: FONTS.sizes.md,
		color: COLORS.oceanMuted,
		marginTop: SPACING.lg,
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
	headerCenter: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.sm,
	},
	headerTitle: {
		fontSize: FONTS.sizes.sm,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
		letterSpacing: 1.5,
	},
	menuButton: {
		width: 44,
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
	},

	// Content
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: SPACING.xl,
		paddingBottom: SPACING.xxxl,
		justifyContent: 'center',
	},

	// Message Card
	messageCard: {
		backgroundColor: 'rgba(26, 31, 58, 0.6)',
		borderRadius: BORDER_RADIUS.lg,
		padding: SPACING.xxxl,
		borderWidth: 1,
		borderColor: 'rgba(139, 147, 176, 0.2)',
	},
	quoteIconContainer: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: 'rgba(0, 217, 255, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginBottom: SPACING.xl,
	},
	messageText: {
		fontSize: FONTS.sizes.xl,
		lineHeight: 32,
		color: COLORS.oceanText,
		textAlign: 'center',
		marginBottom: SPACING.xl,
	},
	metadata: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: SPACING.sm,
	},
	metadataText: {
		fontSize: FONTS.sizes.sm,
		color: COLORS.oceanMuted,
	},

	// Action Bar
	actionBar: {
		flexDirection: 'row',
		paddingHorizontal: SPACING.xl,
		paddingBottom: SPACING.xxxl,
		paddingTop: SPACING.lg,
		gap: SPACING.md,
	},
	throwBackButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.oceanSurface,
		borderRadius: BORDER_RADIUS.md,
		paddingVertical: SPACING.lg,
		gap: SPACING.sm,
		borderWidth: 1,
		borderColor: 'rgba(139, 147, 176, 0.3)',
	},
	throwBackText: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
	},
	keepButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.cyan,
		borderRadius: BORDER_RADIUS.md,
		paddingVertical: SPACING.lg,
		gap: SPACING.sm,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 12,
		elevation: 8,
	},
	keepText: {
		fontSize: FONTS.sizes.md,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanDark,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
