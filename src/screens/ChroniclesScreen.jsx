import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StatusBar,
	ActivityIndicator,
	TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { styles, ICON_COLORS, ICON_EMOJIS } from '../styles/ChroniclesScreen.styles';
import { auth, db } from '../config/firebase';

export default function ChroniclesScreen({ navigation }) {
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			setIsLoading(false);
			return;
		}

		// Real-time listener for chats
		const chatsQuery = query(
			collection(db, 'chats'),
			where('participants', 'array-contains', currentUser.uid),
			where('isActive', '==', true),
			orderBy('lastMessageAt', 'desc')
		);

		const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
			const chatList = [];
			snapshot.forEach((doc) => {
				chatList.push({
					id: doc.id,
					...doc.data(),
				});
			});
			setChats(chatList);
			setIsLoading(false);
		}, (error) => {
			console.error('Error listening to chats:', error);
			setIsLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const formatRelativeTime = (timestamp) => {
		if (!timestamp) return '';
		const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
		const now = new Date();
		const diffMs = now - date;
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMins < 1) return 'now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
	};

	const getIconStyle = (chatId) => {
		// Generate consistent color based on chat ID
		const hash = chatId.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
		const colorIndex = hash % ICON_COLORS.length;
		const emojiIndex = hash % ICON_EMOJIS.length;
		return {
			color: ICON_COLORS[colorIndex],
			emoji: ICON_EMOJIS[emojiIndex],
		};
	};

	const getTruncatedTitle = (content) => {
		if (!content) return 'New conversation';
		const maxLength = 25;
		const truncated = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;
		return `Re: ${truncated}`;
	};

	const handleChatPress = (chat) => {
		navigation.navigate('Chat', {
			chatId: chat.id,
			bottleContent: chat.bottleContent,
		});
	};

	const filteredChats = chats.filter(chat => {
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return (
			chat.bottleContent?.toLowerCase().includes(query) ||
			chat.lastMessage?.toLowerCase().includes(query)
		);
	});

	const renderChatItem = ({ item }) => {
		const iconStyle = getIconStyle(item.id);
		const currentUserId = auth.currentUser?.uid;
		const hasUnread = (item.unreadCount?.[currentUserId] || 0) > 0;

		return (
			<TouchableOpacity
				style={styles.chatItem}
				onPress={() => handleChatPress(item)}
				activeOpacity={0.7}
			>
				<View style={[styles.chatIcon, { backgroundColor: iconStyle.color }]}>
					<Text style={{ fontSize: 24 }}>{iconStyle.emoji}</Text>
				</View>
				<View style={styles.chatContent}>
					<View style={styles.chatHeader}>
						<Text
							style={[
								styles.chatTitle,
								hasUnread && { fontWeight: '700' }
							]}
							numberOfLines={1}
						>
							{getTruncatedTitle(item.bottleContent)}
						</Text>
						<Text style={styles.chatTime}>
							{formatRelativeTime(item.lastMessageAt)}
						</Text>
					</View>
					<View style={styles.chatPreviewRow}>
						<Text
							style={[
								styles.chatPreview,
								hasUnread && { fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)' }
							]}
							numberOfLines={1}
						>
							{item.lastMessage || 'No messages yet'}
						</Text>
						{hasUnread && (
							<View style={styles.unreadBadge}>
								<Text style={styles.unreadBadgeText}>
									{item.unreadCount[currentUserId] > 9 ? '9+' : item.unreadCount[currentUserId]}
								</Text>
							</View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.header}>
					<View style={styles.headerTop}>
						<Text style={styles.headerTitle}>Chronicles</Text>
					</View>
				</View>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#00D4AA" />
					<Text style={styles.loadingText}>Loading conversations...</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />

			{/* Header */}
			<View style={styles.header}>
				<View style={styles.headerTop}>
					<Text style={styles.headerTitle}>Chronicles</Text>
					<TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
						<Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
					</TouchableOpacity>
				</View>

				{/* Search Bar */}
				<View style={styles.searchContainer}>
					<Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.4)" style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search conversations..."
						placeholderTextColor="rgba(255, 255, 255, 0.4)"
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>
			</View>

			{/* Chat List or Empty State */}
			{filteredChats.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Ionicons
						name="chatbubbles-outline"
						size={80}
						color="#00D4AA"
						style={styles.emptyIcon}
					/>
					<Text style={styles.emptyTitle}>No chronicles yet</Text>
					<Text style={styles.emptySubtitle}>
						When you keep a bottle, your conversation will appear here.
					</Text>
				</View>
			) : (
				<FlatList
					data={filteredChats}
					renderItem={renderChatItem}
					keyExtractor={(item) => item.id}
					style={styles.chatList}
					contentContainerStyle={styles.chatListContent}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
}
