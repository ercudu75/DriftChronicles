import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	TextInput,
	FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ChatScreen.styles';
import ChatService from '../services/ChatService';
import { auth } from '../config/firebase';

export default function ChatScreen({ route, navigation }) {
	const { chatId, bottleContent } = route.params || {};
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [chat, setChat] = useState(null);
	const [strangerId, setStrangerId] = useState('');
	const [inputText, setInputText] = useState('');
	const [isSending, setIsSending] = useState(false);
	const flatListRef = useRef(null);
	const currentUserId = auth.currentUser?.uid;

	useEffect(() => {
		// Generate consistent stranger ID from chat ID
		const hash = chatId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
		setStrangerId(`Stranger #${(hash % 900) + 100}`);

		// Mark chat as read
		ChatService.markChatAsRead(chatId);

		// Subscribe to real-time message updates
		const unsubscribe = ChatService.subscribeToMessages(chatId, (newMessages) => {
			setMessages(newMessages);
			setIsLoading(false);
		});

		// Load chat info
		loadChatInfo();

		return () => unsubscribe();
	}, [chatId]);

	const loadChatInfo = async () => {
		try {
			const chatData = await ChatService.getChat(chatId);
			setChat(chatData);
		} catch (error) {
			console.error('Error loading chat:', error);
		}
	};

	const handleSend = async () => {
		if (!inputText.trim() || isSending) return;

		try {
			setIsSending(true);
			await ChatService.sendMessage(chatId, inputText);
			setInputText('');
		} catch (error) {
			Alert.alert('Error', 'Failed to send message');
		} finally {
			setIsSending(false);
		}
	};

	const handleRelease = () => {
		Alert.alert(
			'Release Connection?',
			'This will end the conversation for both of you. This cannot be undone.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Release',
					style: 'destructive',
					onPress: async () => {
						try {
							await ChatService.releaseChat(chatId);
							navigation.goBack();
						} catch (error) {
							Alert.alert('Error', 'Failed to release connection');
						}
					},
				},
			]
		);
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const formatTime = (timestamp) => {
		if (!timestamp) return '';
		const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	const renderMessage = ({ item }) => {
		const isMyMessage = item.senderId === currentUserId;
		const isBottle = item.type === 'bottle';

		if (isBottle) {
			return (
				<View style={styles.bottleMessageContainer}>
					<View style={styles.bottleLabel}>
						<Ionicons name="water" size={16} color="#00D4AA" />
						<Text style={styles.bottleLabelText}>Original Bottle</Text>
					</View>
					<View style={styles.bottleBubble}>
						<Text style={styles.bottleText}>"{item.content}"</Text>
					</View>
					<Text style={styles.bottleTime}>{formatTime(item.createdAt)}</Text>
				</View>
			);
		}

		return (
			<View style={[
				styles.messageContainer,
				isMyMessage ? styles.myMessageContainer : styles.theirMessageContainer
			]}>
				<View style={[
					styles.messageBubble,
					isMyMessage ? styles.myBubble : styles.theirBubble
				]}>
					<Text style={[
						styles.messageText,
						isMyMessage ? styles.myMessageText : styles.theirMessageText
					]}>
						{item.content}
					</Text>
				</View>
				<Text style={[
					styles.messageTime,
					isMyMessage ? styles.myMessageTime : styles.theirMessageTime
				]}>
					{formatTime(item.createdAt)}
				</Text>
			</View>
		);
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#00D4AA" />
				</View>
			</View>
		);
	}

	if (chat?.isActive === false) {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />

				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
						<Ionicons name="chevron-back" size={28} color="#FFFFFF" />
					</TouchableOpacity>
					<View style={styles.headerCenter}>
						<Text style={styles.headerTitle}>{strangerId}</Text>
					</View>
				</View>

				<View style={styles.releasedContainer}>
					<Ionicons name="lock-closed" size={48} color="#EF4444" style={styles.releasedIcon} />
					<Text style={styles.releasedTitle}>Connection Released</Text>
					<Text style={styles.releasedSubtitle}>
						This conversation has ended. The connection has been released.
					</Text>
				</View>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={0}
		>
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />

				{/* Header */}
				<View style={styles.header}>
					<TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
						<Ionicons name="chevron-back" size={28} color="#FFFFFF" />
					</TouchableOpacity>

					<View style={styles.headerCenter}>
						<Text style={styles.headerTitle}>{strangerId}</Text>
						<View style={styles.headerStatus}>
							<View style={styles.onlineDot} />
							<Text style={styles.statusText}>Online</Text>
						</View>
					</View>

					<TouchableOpacity style={styles.releaseButton} onPress={handleRelease} activeOpacity={0.7}>
						<Text style={styles.releaseText}>Release</Text>
						<Ionicons name="close" size={16} color="#EF4444" />
					</TouchableOpacity>
				</View>

				{/* Messages */}
				<FlatList
					ref={flatListRef}
					data={messages}
					renderItem={renderMessage}
					keyExtractor={(item) => item.id}
					style={styles.messageList}
					contentContainerStyle={styles.messageListContent}
					inverted={false}
					onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
				/>

				{/* Input */}
				<View style={styles.inputContainer}>
					<View style={styles.inputWrapper}>
						<TextInput
							style={styles.textInput}
							placeholder="Say something..."
							placeholderTextColor="rgba(255, 255, 255, 0.4)"
							value={inputText}
							onChangeText={setInputText}
							multiline
							maxLength={500}
						/>
					</View>
					<TouchableOpacity
						style={[
							styles.sendButton,
							(!inputText.trim() || isSending) && styles.sendButtonDisabled,
						]}
						onPress={handleSend}
						disabled={!inputText.trim() || isSending}
						activeOpacity={0.7}
					>
						{isSending ? (
							<ActivityIndicator size="small" color="#0A1628" />
						) : (
							<Ionicons name="send" size={20} color="#0A1628" />
						)}
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}
