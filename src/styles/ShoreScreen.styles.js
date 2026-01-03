import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.oceanDark,
	},

	// Starry Background
	starsContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	star: {
		position: 'absolute',
		width: 2,
		height: 2,
		backgroundColor: '#FFFFFF',
		borderRadius: 1,
	},

	scrollContent: {
		flexGrow: 1,
		paddingBottom: 120, // Space for FAB
	},

	// Header
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: SPACING.xl,
		paddingTop: SPACING.xxxl + 20,
		paddingBottom: SPACING.xl,
	},
	headerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: SPACING.md,
	},
	headerTitle: {
		fontSize: FONTS.sizes.xxl,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanText,
	},
	headerRight: {
		flexDirection: 'row',
		gap: SPACING.md,
	},
	iconButton: {
		width: 44,
		height: 44,
		borderRadius: BORDER_RADIUS.sm,
		backgroundColor: COLORS.oceanSurface,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		top: -4,
		right: -4,
		backgroundColor: COLORS.cyan,
		borderRadius: 10,
		width: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	badgeText: {
		fontSize: 10,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanDark,
	},

	// Content
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: SPACING.xl,
	},

	// Empty State
	emptyState: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	waveAnimation: {
		width: 200,
		height: 100,
		marginBottom: SPACING.xxxl,
	},
	wave: {
		width: '100%',
		height: 3,
		backgroundColor: COLORS.cyan,
		borderRadius: 2,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 10,
	},
	emptyText: {
		fontSize: FONTS.sizes.xxl,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
		marginBottom: SPACING.sm,
	},
	emptySubtext: {
		fontSize: FONTS.sizes.md,
		color: COLORS.oceanMuted,
		textAlign: 'center',
	},

	// Bottle Found State
	bottleContainer: {
		alignItems: 'center',
		width: '100%',
	},
	bottleImageContainer: {
		width: 280,
		height: 280,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: SPACING.xl,
	},
	underwaterGradient: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 100, 150, 0.2)',
	},
	bottleImage: {
		width: 280,
		height: 280,
	},
	bottleText: {
		fontSize: FONTS.sizes.xl,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.oceanText,
		marginBottom: SPACING.sm,
	},
	bottleAction: {
		fontSize: FONTS.sizes.sm,
		fontWeight: FONTS.weights.semibold,
		color: COLORS.cyan,
		letterSpacing: 1,
	},

	// Debug Button
	debugButton: {
		alignSelf: 'center',
		marginTop: SPACING.xl,
		paddingVertical: SPACING.sm,
		paddingHorizontal: SPACING.lg,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: BORDER_RADIUS.sm,
	},
	debugButtonText: {
		fontSize: FONTS.sizes.xs,
		color: COLORS.oceanMuted,
	},

	// Floating Action Button
	fabContainer: {
		position: 'absolute',
		bottom: SPACING.xxxl,
		left: SPACING.xl,
		right: SPACING.xl,
	},
	fab: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.cyan,
		borderRadius: BORDER_RADIUS.md,
		paddingVertical: SPACING.lg,
		paddingHorizontal: SPACING.xxxl,
		gap: SPACING.sm,
		shadowColor: COLORS.cyan,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 12,
		elevation: 8,
	},
	fabText: {
		fontSize: FONTS.sizes.lg,
		fontWeight: FONTS.weights.bold,
		color: COLORS.oceanDark,
	},
});
