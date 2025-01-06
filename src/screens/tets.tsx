import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet,
  Modal,
  ScrollView,
  Linking
} from 'react-native';
import { RootStackParamList } from '../../types/navigation';
import { User, LogOut, Info, MapPin, Mail, Phone } from 'lucide-react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../../designSystem';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

type LoginScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const { setIsLoggedIn } = React.useContext(AuthContext);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [showWebView, setShowWebView] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);
    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // ... existing getLoginHtml and handleWebViewNavigationStateChange functions ...

    const handleLogin = () => {
        if (!userId || !password) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }
        setLoading(true);
        setShowWebView(true);
    };

    const handleRegistrationSubmit = () => {
        const { name, email, phone, address } = registrationData;
        if (!name || !email || !phone || !address) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        
        // Here you would typically send this data to your backend
        Alert.alert(
            'Registration Submitted',
            'Please visit the library physically with your ID to complete registration. Your registration details have been recorded.',
            [
                {
                    text: 'View Library Location',
                    onPress: () => {
                        Linking.openURL('https://maps.google.com/?q=OUSL+Library');
                    }
                },
                {
                    text: 'OK',
                    onPress: () => setShowRegistration(false)
                }
            ]
        );
    };

    const RegistrationModal = () => (
        <Modal
            visible={showRegistration}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowRegistration(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>New User Registration</Text>
                    <Text style={styles.modalSubtitle}>
                        Complete this form and visit the library with your ID to activate your account
                    </Text>
                    
                    <ScrollView style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <User color={colors.text.secondary} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Full Name"
                                value={registrationData.name}
                                onChangeText={(text) => setRegistrationData({...registrationData, name: text})}
                                placeholderTextColor={colors.text.secondary}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Mail color={colors.text.secondary} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={registrationData.email}
                                onChangeText={(text) => setRegistrationData({...registrationData, email: text})}
                                keyboardType="email-address"
                                placeholderTextColor={colors.text.secondary}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Phone color={colors.text.secondary} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                value={registrationData.phone}
                                onChangeText={(text) => setRegistrationData({...registrationData, phone: text})}
                                keyboardType="phone-pad"
                                placeholderTextColor={colors.text.secondary}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <MapPin color={colors.text.secondary} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Address"
                                value={registrationData.address}
                                onChangeText={(text) => setRegistrationData({...registrationData, address: text})}
                                multiline
                                numberOfLines={3}
                                placeholderTextColor={colors.text.secondary}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleRegistrationSubmit}
                        >
                            <Text style={styles.buttonText}>Submit Registration</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => setShowRegistration(false)}
                        >
                            <Text style={styles.secondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

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
                <Text style={styles.welcomeText}>Welcome back!</Text>
                
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
                    style={[styles.button, (!userId || !password) && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={!userId || !password}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>New User?</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => setShowRegistration(true)}
                >
                    <Text style={styles.registerButtonText}>Register Now</Text>
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Info size={16} color={colors.text.secondary} />
                    <Text style={styles.infoText}>
                        New users must visit the library with ID after registration
                    </Text>
                </View>
            </View>

            <RegistrationModal />
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background.paper,
    },
    welcomeText: {
        fontSize: 20,
        color: colors.text.secondary,
        marginBottom: 32,
        fontWeight: '500',
    },
    webView: {
        flex: 1,
    },
    logo: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.primary.main,
        marginBottom: 16,
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
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        marginVertical: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.text.disabled,
    },
    dividerText: {
        marginHorizontal: 16,
        color: colors.text.secondary,
        fontSize: 14,
    },
    registerButton: {
        backgroundColor: colors.background.default,
        borderRadius: 16,
        height: 56,
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.primary.main,
    },
    registerButtonText: {
        color: colors.primary.main,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        padding: 16,
        backgroundColor: colors.background.default,
        borderRadius: 12,
        maxWidth: 400,
    },
    infoText: {
        marginLeft: 8,
        color: colors.text.secondary,
        fontSize: 14,
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.background.paper,
        borderRadius: 24,
        padding: 24,
        width: '90%',
        maxWidth: 500,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text.primary,
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 14,
        color: colors.text.secondary,
        marginBottom: 24,
    },
    formContainer: {
        flex: 1,
    },
    secondaryButton: {
        height: 56,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    secondaryButtonText: {
        color: colors.text.secondary,
        fontSize: 16,
        fontWeight: '600',
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