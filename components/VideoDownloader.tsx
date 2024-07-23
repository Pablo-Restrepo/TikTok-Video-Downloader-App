import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { downloadVideo } from '@/api/downloadtiktokvid';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';

const VideoDownloader: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [downloadSuccess, setDownloadSuccess] = useState<boolean | null>(null);
    const [inputError, setInputError] = useState<string | null>(null);

    const isValidTikTokUrl = (url: string): boolean => {
        const regex = /^https:\/\/www\.tiktok\.com\/@[\w-]+\/video\/\d+$/;
        return regex.test(url);
    };

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        setDownloadSuccess(null);
        try {
            const success = await downloadVideo(url);
            setDownloadSuccess(success);
            if (!success) {
                setError('Unable to download video.');
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUrlChange = (text: string) => {
        setUrl(text);
        if (text.trim() === '') {
            setInputError('The input is empty.');
        } else if (!isValidTikTokUrl(text)) {
            setInputError('The link is not a valid TikTok URL.');
        } else {
            setInputError(null);
        }
    };

    const isButtonDisabled = loading || url.trim() === '' || !isValidTikTokUrl(url);

    return (
        <View style={styles.container}>
            <ThemedInput
                value={url}
                editable={!loading}
                onChangeText={handleUrlChange}
                placeholder="Enter the TikTok video URL"
                style={styles.input}
            />
            {inputError && <ThemedText type="error" style={styles.errorText}>{inputError}</ThemedText>}
            <TouchableOpacity
                style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
                onPress={handleDownload}
                disabled={isButtonDisabled}
            >
                <ThemedText type="button" style={styles.textCenter}>Download Video</ThemedText>
            </TouchableOpacity>
            <View style={styles.messageContainer}>
                {loading ? (
                    <ActivityIndicator />
                ) : (
                    error ? (
                        <ThemedText type="error" style={styles.textCenter}>Failed to download video.</ThemedText>
                    ) : (
                        downloadSuccess !== null && (
                            <ThemedText type="success" style={styles.textCenter}>
                                {downloadSuccess ? 'Video downloaded successfully.' : 'Video download failed.'}
                            </ThemedText>
                        )
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: '100%',
    },
    input: {
        marginBottom: 10,
        fontFamily: 'Inter',
    },
    errorText: {
        marginBottom: 10,
        color: 'red',
        textAlign: 'center',
        fontFamily: 'Inter',
    },
    messageContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    textCenter: {
        textAlign: 'center',
        fontFamily: 'Inter',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        minWidth: 140,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
});

export default VideoDownloader;
