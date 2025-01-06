import React from 'react';
import { Platform, StyleSheet, View, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, User } from 'lucide-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
} from 'react-native-reanimated';
import { AuthContext } from '../context/AuthContext';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Login: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();



const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabButton = ({
  icon: Icon,
  isFocused,
  label,
  onPress
}: {
  icon: typeof Home;
  isFocused: boolean;
  label: string;
  onPress: () => void;
}) => {
  const scaleAnimation = useAnimatedStyle(() => ({
    transform: [{
      scale: withSpring(isFocused ? 1.2 : 1, {
        damping: 15,
        stiffness: 200,
      }),
    }],
  }));

  const containerAnimation = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isFocused ? 'rgba(249, 115, 22, 0.15)' : 'transparent',
      { duration: 200 }
    ),
  }));

  const labelAnimation = useAnimatedStyle(() => ({
    opacity: withTiming(isFocused ? 1 : 0.7, { duration: 200 }),
    transform: [{
      translateY: withSpring(isFocused ? -4 : 0, {
        damping: 15,
        stiffness: 200,
      }),
    }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.tabButton, containerAnimation]}
    >
      <Animated.View style={[styles.iconContainer, scaleAnimation]}>
        <Icon
          color={isFocused ? colors.primary.main : colors.text.secondary}
          size={24}
          strokeWidth={isFocused ? 2.5 : 1.5}
        />
      </Animated.View>
      <Animated.Text 
        style={[
          styles.label, 
          labelAnimation,
          { color: isFocused ? colors.primary.main : colors.text.secondary }
        ]}
      >
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
};


const colors = {
  primary: {
    main: '#f97316', // Orange-500
    light: '#fdba74', // Orange-300
  },
  text: {
    primary: '#1e293b', // Slate-800
    secondary: '#64748b', // Slate-500
  },
  background: {
    default: '#ffffff',
    paper: '#fff7ed', // Orange-50
  },
};

export const TabNavigator = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarButton: (props) => {
          const isFocused = props.accessibilityState?.selected || false;
          const icons = {
            Home,
            Search,
            Profile: User,
          };
          const Icon = icons[route.name as keyof typeof icons];
          
          return (
            <TabButton
              icon={Icon}
              isFocused={isFocused}
              label={route.name}
              onPress={() => {
                if (route.name === 'Profile' && !isLoggedIn) {
                  navigation.navigate('Login');
                } else {
                  props.onPress();
                }
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 16,
    right: 16,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 4,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
