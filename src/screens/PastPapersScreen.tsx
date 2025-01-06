import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '../../designSystem';

export const PastPapersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Past Papers</Text>
        {/* Add your past papers UI components here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.background.paper,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.text.primary,
        marginBottom: 32,
        letterSpacing: 0.5,
      },
      section: {
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 16,
      },
      card: {
        backgroundColor: colors.background.default,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      },
});

