import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, BackHandler } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function OfflineScreen({ onRetry }) {
  useEffect(() => {
    if (Platform.OS === 'android') {
      const timer = setTimeout(() => BackHandler.exitApp(), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        {Platform.OS === 'android'
          ? 'The app will close automatically.'
          : 'Please connect to the internet.'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});