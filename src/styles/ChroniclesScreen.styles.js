import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0A1628',
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: '700',
		color: '#FFFFFF',
	},
	menuButton: {
		padding: 8,
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#FFFFFF',
	},
	searchPlaceholder: {
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.4)',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.5)',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	emptyIcon: {
		marginBottom: 20,
		opacity: 0.4,
	},
	emptyTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#FFFFFF',
		marginBottom: 10,
		textAlign: 'center',
	},
	emptySubtitle: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		lineHeight: 20,
	},
	chatList: {
		flex: 1,
	},
	chatListContent: {
		paddingHorizontal: 20,
	},
	chatItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.05)',
	},
	chatIcon: {
		width: 50,
		height: 50,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 14,
	},
	chatContent: {
		flex: 1,
	},
	chatHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	chatTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
		flex: 1,
		marginRight: 10,
	},
	chatTime: {
		fontSize: 13,
		color: '#00D4AA',
	},
	chatPreviewRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	chatPreview: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.5)',
		flex: 1,
	},
	unreadDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#00BFFF',
		marginLeft: 10,
	},
	unreadBadge: {
		backgroundColor: '#EF4444',
		borderRadius: 10,
		minWidth: 20,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 6,
		marginLeft: 10,
	},
	unreadBadgeText: {
		color: '#FFFFFF',
		fontSize: 11,
		fontWeight: '700',
	},
});

// Random colors for chat icons
export const ICON_COLORS = [
	'#00BFFF', // Cyan
	'#4A5568', // Gray-blue
	'#48BB78', // Green
	'#ED64A6', // Pink
	'#F6AD55', // Orange
	'#9F7AEA', // Purple
	'#FC8181', // Red
	'#68D391', // Light green
];

export const ICON_EMOJIS = ['💬', '📖', '🐱', '🎵', '💡', '🌟', '🎨', '🚀'];
