// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import WebView from 'react-native-webview';
import type { WebViewNavigation } from 'react-native-webview';
import { User, Search, LogOut } from 'lucide-react-native';
import { colors } from './designSystem';

type RootStackParamList = {
  Search: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const LoginScreen = () => {
  const { setIsLoggedIn } = React.useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLoginHtml = (userId: string, password: string) => `
    <html>
      <body>
        <form id="loginForm" action="https://search.lib.ou.ac.lk/cgi-bin/koha/opac-user.pl" method="post">
          <input type="hidden" name="koha_login_context" value="opac">
          <input type="hidden" name="userid" value="${userId}">
          <input type="hidden" name="password" value="${password}">
        </form>
        <script>
          document.getElementById('loginForm').submit();
        </script>
      </body>
    </html>
  `;

  const handleLogin = () => {
    if (!userId || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    setLoading(true);
    setShowWebView(true);
  };

  const handleWebViewNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;

    if (url.includes('/opac-user.pl') && !url.includes('?failed=1')) {
      setLoading(false);
      setShowWebView(false);
      setIsLoggedIn(true);
    } else if (url.includes('?failed=1')) {
      setLoading(false);
      setShowWebView(false);
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  if (showWebView) {
    return (
      <View style={styles.container}>
        <WebView
          source={{ html: getLoginHtml(userId, password) }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          incognito={true}
          onError={() => {
            setLoading(false);
            Alert.alert('Error', 'Connection failed. Please try again.');
          }}
        />
        {loading && (
          <View style={styles.loadingContainer}>
<ActivityIndicator size="large" color={colors.primary.main} />
<Text style={styles.loadingText}>Logging in...</Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>OUSL Library</Text>
        <View style={styles.inputContainer}>
          <User color={colors.text.secondary} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Login ID"
            value={userId}
            onChangeText={setUserId}
            autoCapitalize="none"
            autoComplete="username"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
        <View style={styles.inputContainer}>
          <LogOut color={colors.text.secondary} size={20} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            placeholderTextColor={colors.text.secondary}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, !userId || !password && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!userId || !password}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {return;}
    setLoading(true);
    setShowResults(true);
  };

  if (showResults) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowResults(false)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{
            uri: `https://search.lib.ou.ac.lk/cgi-bin/koha/opac-search.pl?q=${encodeURIComponent(query)}`,
          }}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => (
<ActivityIndicator size="large" color={colors.primary.main} />
          )}
          onLoad={() => setLoading(false)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Library Search</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search books, journals..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            placeholderTextColor={colors.text.secondary}
          />
          <TouchableOpacity
            style={[styles.button, !query.trim() && styles.buttonDisabled]}
            onPress={handleSearch}
            disabled={!query.trim()}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProfileScreen = () => {
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

const TabNavigator = () => {
  const { isLoggedIn } = React.useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Search':
              return <Search color={color} size={size} />;
            case 'Profile':
              return <User color={color} size={size} />;
            case 'Login':
              return <LogOut color={color} size={size} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      {isLoggedIn ? (
        <Tab.Screen name="Profile" component={ProfileScreen} />
      ) : (
        <Tab.Screen name="Login" component={LoginScreen} />
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
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

export default App;
