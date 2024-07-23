// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import VideoDownloader from '@/components/VideoDownloader';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <VideoDownloader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
