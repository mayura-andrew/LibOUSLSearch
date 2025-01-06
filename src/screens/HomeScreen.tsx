import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  Search,
  BookOpen,
  Archive,
  Database,
  MessageCircle,
  Mail,
  Phone,
  Bell,
} from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { RootStackParamList } from '../../types/navigation';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#f97316',
  secondary: '#fdba74',
  accent: '#fb923c',
  background: {
    light: '#fff7ed',
    white: '#ffffff',
    overlay: 'rgba(251, 146, 60, 0.85)',
  },
  text: {
    dark: '#1e293b',
    light: '#ffffff',
    muted: '#64748b',
  }
};

const mainFeatures = [
  {
    title: 'Book Search',
    icon: BookOpen,
    description: 'Explore our vast collection of books',
    route: 'Books' as const,
    color: COLORS.primary,
    bg: '#fff7ed',
  },
  {
    title: 'Research Repository',
    icon: Database,
    description: 'Access research papers and journals',
    route: 'Repository' as const,
    color: '#f97316',
    bg: '#ffedd5',
  },
  {
    title: 'Past Papers',
    icon: Archive,
    description: 'Browse previous examination papers',
    route: 'PastPapers' as const,
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    title: 'Ask Librarian',
    icon: MessageCircle,
    description: 'Get help from our librarians',
    route: 'AskLibrarian' as const,
    color: '#c2410c',
    bg: '#ffedd5',
  },
];

const quickStats = [
  {
    title: 'Books',
    count: '50K+',
    icon: BookOpen,
    bgColor: '#fff7ed',
    iconColor: COLORS.primary,
  },
  {
    title: 'Research Papers',
    count: '10K+',
    icon: Database,
    bgColor: '#ffedd5',
    iconColor: '#ea580c',
  },
  {
    title: 'Digital Resources',
    count: '5K+',
    icon: Archive,
    bgColor: '#fff7ed',
    iconColor: '#c2410c',
  }
];

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoggedIn } = React.useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      navigation.navigate('SearchResults', { query: searchQuery.trim() });
    }
  }, [searchQuery, navigation]);

  const handleFeatureNavigation = useCallback((route: keyof RootStackParamList) => {
    if (route === 'Profile' && !isLoggedIn) {
      navigation.navigate('Login', undefined);
      return;
    }
    switch (route) {
      case 'Books':
        navigation.navigate('Books', { query: '' });
        break;
      case 'SearchResults':
        navigation.navigate('SearchResults', { query: '' });
        break;
      case 'Profile':
      case 'Repository':
      case 'PastPapers':
      case 'AskLibrarian':
      case 'Home':
      case 'Login':
      case 'TabNavigator':
        navigation.navigate(route, undefined);
        break;
      default:
        const exhaustiveCheck: never = route;
        throw new Error(`Unhandled route: ${exhaustiveCheck}`);
    }
  }, [navigation, isLoggedIn]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../assets/lib.jpg')}
            style={styles.header}
            resizeMode="cover"
          >
            <View style={styles.headerOverlay}>
              <View style={styles.headerTop}>
                <View style={styles.headerContent}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.welcomeText}>
                      Welcome to{' '}
                      <Text style={styles.emphasizedText}>OUSL Library</Text>
                    </Text>
                  </View>
                  <View style={styles.taglineContainer}>
                    <Text style={styles.tagline}>Your Gateway to Knowledge</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                  <Bell color={COLORS.text.light} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          <Animated.View
            entering={FadeInUp.delay(300).springify()}
            style={styles.searchContainer}
          >
            <View style={styles.searchInner}>
              <Search color={COLORS.text.muted} size={20} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="What would you like to explore today?"
                style={styles.searchInput}
                placeholderTextColor={COLORS.text.muted}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </View>
          </Animated.View>
        </View>

        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <Animated.View
              key={index}
              entering={FadeInRight.delay(index * 100).springify()}
              style={[styles.statCard, { backgroundColor: stat.bgColor }]}
            >
              <stat.icon color={stat.iconColor} size={24} />
              <Text style={[styles.statCount, { color: stat.iconColor }]}>
                {stat.count}
              </Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </Animated.View>
          ))}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Library Services</Text>
          <View style={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(index * 100).springify()}
                style={[styles.featureCard, { backgroundColor: feature.bg }]}
              >
                <TouchableOpacity
                  onPress={() => handleFeatureNavigation(feature.route)}
                  style={styles.featureContent}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${feature.color}20` }]}>
                    <feature.icon color={feature.color} size={24} />
                  </View>
                  <Text style={[styles.featureTitle, { color: feature.color }]}>
                    {feature.title}
                  </Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <View style={styles.contactCards}>
            <TouchableOpacity style={styles.contactCard}>
              <View style={styles.contactIconContainer}>
                <Phone color={COLORS.primary} size={24} />
              </View>
              <Text style={styles.contactMethod}>Call Us</Text>
              <Text style={styles.contactDetail}>+94 112 881002</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactCard}>
              <View style={styles.contactIconContainer}>
                <Mail color={COLORS.primary} size={24} />
              </View>
              <Text style={styles.contactMethod}>Email Us</Text>
              <Text style={styles.contactDetail}>library@ou.ac.lk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  header: {
    height: 280,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  headerOverlay: {
    flex: 1,
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 48,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  titleContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 28,
    color: COLORS.text.light,
    fontWeight: '800',
  },
  emphasizedText: {
    color: COLORS.text.light,
    fontWeight: '900',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  taglineContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  tagline: {
    fontSize: 18,
    color: COLORS.text.light,
    fontWeight: '600',
  },
  promptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  searchPrompt: {
    fontSize: 14,
    color: COLORS.text.light,
    opacity: 0.9,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    bottom: -25,
    left: 24,
    right: 24,
    borderRadius: 16,
    backgroundColor: COLORS.background.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text.dark,
    height: 40,
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 40,
  },
  statCard: {
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: (width - 72) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statCount: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    color: COLORS.text.muted,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.dark,
    marginBottom: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 64) / 2,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  featureContent: {
    padding: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    color: COLORS.text.muted,
    lineHeight: 20,
  },
  contactSection: {
    padding: 24,
    backgroundColor: COLORS.background.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 8,
  },
  contactCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactCard: {
    backgroundColor: COLORS.background.light,
    padding: 24,
    borderRadius: 24,
    width: (width - 72) / 2,
    alignItems: 'center',
  },
  contactIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  contactMethod: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.dark,
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: COLORS.text.muted,
  },
});