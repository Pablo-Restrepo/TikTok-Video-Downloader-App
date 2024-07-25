import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

const API_BASE_URL = 'https://ssstik.io/abc?url=dl';

export const getDownloadLink = async (url: string): Promise<string | null> => {
    const data = { id: url, locale: "es", tt: "UERKR1dk" };

    try {
        const response = await axios.post(API_BASE_URL, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "User-Agent": "Mozilla/5.0",
            },
            timeout: 60000,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        if (response.status === 200) {
            const html = response.data;
            const downloadLink = parseDownloadLink(html);
            return downloadLink;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
};

const parseDownloadLink = (html: string): string | null => {
    const regex = /<a[^>]+href="([^"]+)"[^>]*>Sin marca de agua<\/a>/i;
    const match = regex.exec(html);
    return match ? match[1] : null;
};

export const downloadVideo = async (url: string): Promise<boolean> => {
    let downloadLink = await getDownloadLink(url);

    if (downloadLink === null) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        downloadLink = await getDownloadLink(url);
    }

    if (downloadLink === null) {
        return false;
    }

    try {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission required', 'Storage permission is required to download videos.');
            return false;
        }

        const fileUri = `${FileSystem.documentDirectory}video.mp4`;
        const { uri } = await FileSystem.downloadAsync(downloadLink, fileUri);
        await MediaLibrary.createAssetAsync(uri);

        return true;
    } catch (error) {
        console.error(error);
    }

    return false;
};
