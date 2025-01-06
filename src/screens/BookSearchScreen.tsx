import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import WebView from 'react-native-webview';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';
import {
  Search,
  ArrowLeft,
  Book,
  BookOpen,
  Library,
  History,
  TrendingUp,
} from 'lucide-react-native';
import { colors } from '../../designSystem';
import { SearchResults } from '../components/SearchResults';

const { width } = Dimensions.get('window');

const recentSearches = [
  'Digital Library Management',
  'Machine Learning',
  'Software Engineering',
];

const popularSearches = [
  { title: 'Artificial Intelligence', count: '2.5k searches' },
  { title: 'Data Science', count: '1.8k searches' },
  { title: 'Web Development', count: '1.2k searches' },
];

const categories = [
  { title: 'Books', icon: Book, color: '#4338ca', bg: '#e0e7ff' },
  { title: 'Journals', icon: BookOpen, color: '#15803d', bg: '#dcfce7' },
  { title: 'Research', icon: Library, color: '#9333ea', bg: '#f3e8ff' },
];

export const BookSearchScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <SearchResults
        query={query}
        onQueryChange={setQuery}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          entering={FadeInDown.springify()}
          style={styles.content}
        >
          <Text style={styles.title}>Discover Knowledge</Text>
          <Text style={styles.subtitle}>Search across millions of resources</Text>
          
          <Animated.View 
            entering={FadeInDown.delay(100).springify()}
            style={styles.searchContainer}
          >
            <View style={styles.searchBar}>
              <Search size={24} color={colors.text.secondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search books, journals, articles..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                placeholderTextColor={colors.text.secondary}
              />
            </View>
            <TouchableOpacity
              style={[styles.searchButton, !query.trim() && styles.buttonDisabled]}
              onPress={handleSearch}
              disabled={!query.trim()}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Categories */}
          <Animated.View 
            entering={FadeInUp.delay(200).springify()}
            style={styles.categoriesSection}
          >
            <Text style={styles.sectionTitle}>Search By Category</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.categoryCard, { backgroundColor: category.bg }]}
                >
                  <category.icon color={category.color} size={24} />
                  <Text style={[styles.categoryText, { color: category.color }]}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {/* Recent Searches */}
          <Animated.View 
            entering={FadeInUp.delay(300).springify()}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <History size={20} color={colors.text.primary} />
                <Text style={styles.sectionTitle}>Recent Searches</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => setQuery(search)}
              >
                <Search size={16} color={colors.text.secondary} />
                <Text style={styles.recentSearchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          {/* Popular Searches */}
          <Animated.View 
            entering={FadeInUp.delay(400).springify()}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <TrendingUp size={20} color={colors.text.primary} />
                <Text style={styles.sectionTitle}>Popular Searches</Text>
              </View>
            </View>
            {popularSearches.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularSearchItem}
                onPress={() => setQuery(item.title)}
              >
                <View>
                  <Text style={styles.popularSearchTitle}>{item.title}</Text>
                  <Text style={styles.popularSearchCount}>{item.count}</Text>
                </View>
                <Search size={16} color={colors.text.secondary} />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 32,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  searchButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
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
  categoriesSection: {
    marginBottom: 32,
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  categoryCard: {
    width: (width - 64) / 3,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginLeft: 8,
  },
  clearText: {
    fontSize: 14,
    color: colors.primary.main,
    fontWeight: '600',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.main,
  },
  recentSearchText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  popularSearchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  popularSearchTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  popularSearchCount: {
    fontSize: 14,
    color: colors.text.secondary,
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
  searchBarSmall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.default,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginLeft: 16,
    height: 40,
  },
  searchInputSmall: {
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
