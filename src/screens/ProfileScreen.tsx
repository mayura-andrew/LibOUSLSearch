import React from 'react';
import { View, ActivityIndicator, Platform, StatusBar, StyleSheet, Alert } from 'react-native';
import WebView from 'react-native-webview';
import { colors } from '../../designSystem';
import { AuthContext } from '../context/AuthContext';


export const ProfileScreen = () => {
    const { setIsLoggedIn } = React.useContext(AuthContext);
  
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'https://search.lib.ou.ac.lk/cgi-bin/koha/opac-user.pl' }}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => (
  <ActivityIndicator size="large" color={colors.primary.main} />        )}
          onError={() => {
            setIsLoggedIn(false);
            Alert.alert('Error', 'Session expired. Please login again.');
          }}
        />
      </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.paper,
    },
    webView: {
      flex: 1,
    },
    logo: {
      fontSize: 32,
      fontWeight: '700',
      color: colors.primary.main,
      marginBottom: 40,
      letterSpacing: 0.5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background.default,
      borderRadius: 16,
      paddingHorizontal: 20,
      marginBottom: 16,
      height: 60,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    input: {
      flex: 1,
      marginLeft: 12,
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    button: {
      backgroundColor: colors.primary.main,
      borderRadius: 16,
      height: 56,
      width: '100%',
      maxWidth: 400,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      shadowColor: colors.primary.main,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonDisabled: {
      backgroundColor: colors.text.disabled,
      shadowOpacity: 0,
      elevation: 0,
    },
    buttonText: {
      color: colors.background.default,
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    searchContainer: {
      width: '100%',
      maxWidth: 500,
      padding: 20,
    },
    searchInput: {
      backgroundColor: colors.background.default,
      borderRadius: 16,
      paddingHorizontal: 24,
      height: 60,
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 32,
      letterSpacing: 0.5,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary.light,
      backgroundColor: colors.background.default,
    },
    backButton: {
      padding: 10,
      borderRadius: 12,
      backgroundColor: colors.background.accent,
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary.main,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.default,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: '500',
      color: colors.text.primary,
    },
  });