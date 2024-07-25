import React, { useState } from 'react';
import { SafeAreaView, View, ActivityIndicator, StyleSheet } from 'react-native';
import { downloadVideo } from '@/api/downloadtiktokvideos';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';

const App = () => {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const isValidTikTokUrl = (url: string): boolean => {
    const regex = /^(https:\/\/(?:www\.|vm\.)?tiktok\.com\/)/;
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
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <ThemedText type="title" style={styles.text}>TikTok Video Downloader</ThemedText>
        <ThemedText type="subtitle" style={styles.text}>Without Watermark</ThemedText>
      </View>
      <View style={styles.container}>
        <ThemedInput
          value={url}
          editable={!loading}
          onChangeText={handleUrlChange}
          placeholder="Enter the TikTok video URL"
          style={[styles.input, styles.text]}
        />
        {inputError && <ThemedText type="error" style={[styles.errorText, styles.text]}>{inputError}</ThemedText>}
        <ThemedTouchableOpacity
          style={[isButtonDisabled && styles.buttonDisabled, styles.button]}
          onPress={handleDownload}
          disabled={isButtonDisabled}
        >
          <ThemedText type="button" style={[styles.textCenter, styles.text]}>Download Video</ThemedText>
        </ThemedTouchableOpacity>
        <View style={styles.messageContainer}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            error ? (
              <ThemedText type="error" style={[styles.textCenter, styles.text]}>Failed to download video.</ThemedText>
            ) : (
              downloadSuccess !== null && (
                <ThemedText type="success" style={[styles.textCenter, styles.text]}>
                  {downloadSuccess ? 'Video downloaded successfully.' : 'Video download failed.'}
                </ThemedText>
              )
            )
          )}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <ExternalLink href="https://github.com/Pablo-Restrepo/TikTok-Video-Downloader-App">
          <ThemedText type="link" style={[styles.textCenter, styles.text]}>GitHub Repository</ThemedText>
        </ExternalLink>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
  },
  text: {
    fontFamily: 'Inter',
  },
  headerContainer: {
    alignSelf: 'flex-start',
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    minWidth: 140,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footerContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default App;
