import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../constants';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});