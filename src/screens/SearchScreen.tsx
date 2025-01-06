import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Search,
  Book,
  Archive,
  Database,
  FileText,
  BookOpen,
  Library,
  Filter,
} from 'lucide-react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';


const searchCategories = [
  {
    id: 'books',
    title: 'Books',
    icon: Book,
    color: '#4338CA',
    description: 'Search through our collection of books',
  },
  {
    id: 'papers',
    title: 'Past Papers',
    icon: Archive,
    color: '#059669',
    description: 'Find previous examination papers',
  },
  {
    id: 'journals',
    title: 'Journals',
    icon: FileText,
    color: '#DC2626',
    description: 'Access academic journals and articles',
  },
  {
    id: 'repository',
    title: 'Repository',
    icon: Database,
    color: '#D97706',
    description: 'Browse digital repository items',
  },
  {
    id: 'ebooks',
    title: 'E-Books',
    icon: BookOpen,
    color: '#7C3AED',
    description: 'Explore digital book collection',
  },
  {
    id: 'resources',
    title: 'Resources',
    icon: Library,
    color: '#2563EB',
    description: 'Find learning materials and resources',
  },
];

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Library</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#1F2937" size={20} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Animated.View 
        entering={FadeInDown.delay(200).springify()}
        style={styles.searchContainer}
      >
        <Search color="#6B7280" size={20} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="What are you looking for?"
          style={styles.searchInput}
          placeholderTextColor="#6B7280"
        />
      </Animated.View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Search Categories</Text>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {searchCategories.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInRight.delay(index * 100).springify()}
            style={styles.categoryWrapper}
          >
            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
                <category.icon color={category.color} size={24} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 24,
    marginBottom: 16,
  },
  categoriesContainer: {
    padding: 24,
  },
  categoryWrapper: {
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#4338CA',
    borderWidth: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
