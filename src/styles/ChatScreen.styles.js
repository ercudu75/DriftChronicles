import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0A1628',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 12,
		backgroundColor: '#0A1628',
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(255, 255, 255, 0.05)',
	},
	backButton: {
		padding: 8,
	},
	headerCenter: {
		flex: 1,
		marginLeft: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	headerStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
	},
	onlineDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#48BB78',
		marginRight: 6,
	},
	statusText: {
		fontSize: 13,
		color: 'rgba(255, 255, 255, 0.5)',
	},
	releaseButton: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(239, 68, 68, 0.15)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	releaseText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#EF4444',
		marginRight: 4,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	connectionBanner: {
		alignSelf: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 16,
		marginVertical: 16,
	},
	connectionText: {
		fontSize: 13,
		color: 'rgba(255, 255, 255, 0.6)',
	},
	releasedContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
	},
	releasedIcon: {
		marginBottom: 16,
		opacity: 0.5,
	},
	releasedTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#FFFFFF',
		marginBottom: 8,
	},
	releasedSubtitle: {
		fontSize: 14,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
	},
	messageList: {
		flex: 1,
	},
	messageListContent: {
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	messageContainer: {
		marginBottom: 16,
		maxWidth: '80%',
	},
	myMessageContainer: {
		alignSelf: 'flex-end',
	},
	theirMessageContainer: {
		alignSelf: 'flex-start',
	},
	messageBubble: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 18,
	},
	myBubble: {
		backgroundColor: '#00D4AA',
		borderBottomRightRadius: 4,
	},
	theirBubble: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderBottomLeftRadius: 4,
	},
	messageText: {
		fontSize: 16,
		lineHeight: 22,
	},
	myMessageText: {
		color: '#0A1628',
	},
	theirMessageText: {
		color: '#FFFFFF',
	},
	messageTime: {
		fontSize: 11,
		marginTop: 4,
	},
	myMessageTime: {
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'right',
	},
	theirMessageTime: {
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'left',
	},
	bottleMessageContainer: {
		alignSelf: 'center',
		maxWidth: '90%',
		marginBottom: 20,
	},
	bottleLabel: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
	},
	bottleLabelText: {
		fontSize: 12,
		color: '#00D4AA',
		marginLeft: 6,
		fontWeight: '600',
	},
	bottleBubble: {
		backgroundColor: 'rgba(0, 212, 170, 0.1)',
		borderWidth: 1,
		borderColor: 'rgba(0, 212, 170, 0.3)',
		borderRadius: 16,
		paddingHorizontal: 20,
		paddingVertical: 16,
	},
	bottleText: {
		fontSize: 16,
		color: '#FFFFFF',
		fontStyle: 'italic',
		textAlign: 'center',
		lineHeight: 24,
	},
	bottleTime: {
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginTop: 8,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingBottom: Platform.OS === 'ios' ? 100 : 12,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, 0.1)',
		backgroundColor: '#0A1628',
	},
	inputWrapper: {
		flex: 1,
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 24,
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginRight: 12,
		maxHeight: 120,
	},
	textInput: {
		fontSize: 16,
		color: '#FFFFFF',
		maxHeight: 100,
	},
	sendButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#00D4AA',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sendButtonDisabled: {
		backgroundColor: 'rgba(0, 212, 170, 0.3)',
	},
});
