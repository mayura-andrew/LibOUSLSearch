// 1. Update SearchResults.tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { ActivityIndicator, Animated, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeft, Search } from 'lucide-react-native';
import React from 'react';
import { SlideInLeft } from 'react-native-reanimated';
import WebView from 'react-native-webview';
import { colors } from '../../designSystem';

// In SearchResults.tsx
type SearchResultsProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onBack: () => void;
} & NativeStackScreenProps<RootStackParamList, 'SearchResults'>;
export const SearchResults: React.FC<SearchResultsProps> = ({ navigation, route }) => {
  const [query, setQuery] = React.useState(route.params.query);
  const [loading, setLoading] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        entering={SlideInLeft.springify()}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={20} color={colors.primary.main} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.text.secondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search book resources..."
            style={styles.searchInput}
            placeholderTextColor={colors.text.secondary}
          />
        </View>
      </Animated.View>

      <WebView
        source={{
          uri: `https://search.lib.ou.ac.lk/cgi-bin/koha/opac-search.pl?q=${encodeURIComponent(query)}`,
        }}
        style={styles.webView}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text style={styles.loadingText}>Loading results...</Text>
          </View>
        )}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.main,
      backgroundColor: colors.background.paper,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary.main,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.default,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginLeft: 16,
    height: 40,
},
searchInput: {
  flex: 1,
  marginLeft: 8,
  fontSize: 14,
  color: colors.text.primary,
},
webView: {
  flex: 1,
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
