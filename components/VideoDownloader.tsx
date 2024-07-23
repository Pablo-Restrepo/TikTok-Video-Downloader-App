import React, { useState } from 'react';
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { downloadVideo } from '@/api/downloadtiktokvid';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';

const VideoDownloader: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [downloadSuccess, setDownloadSuccess] = useState<boolean | null>(null);

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

    return (
        <View style={styles.container}>
            <ThemedInput
                value={url}
                editable={!loading}
                onChangeText={setUrl}
                placeholder="Enter the TikTok video URL"
                style={styles.input}
            />
            <Button title="Download Video" onPress={handleDownload} disabled={loading} />
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
        marginBottom: 16,
    },
    messageContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    textCenter: {
        textAlign: 'center',
    },
    button: {
        minWidth: 140,
    },
});

export default VideoDownloader;
