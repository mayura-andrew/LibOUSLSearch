import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MessageSquare, User, Mail, BookOpen, Hash, Send, ArrowLeft } from 'lucide-react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

// Updated color system to match HomeScreen
const COLORS = {
  primary: '#f97316',
  secondary: '#fdba74',
  accent: '#fb923c',
  background: {
    light: '#fff7ed',
    white: '#ffffff',
    paper: '#ffedd5',
  },
  text: {
    dark: '#1e293b',
    light: '#ffffff',
    muted: '#64748b',
  },
  error: '#EF4444'
};

type AskLibrarianProps = {
  navigation: NativeStackNavigationProp<any>;
};

type FormData = {
  name: string;
  email: string;
  regNumber: string;
  subject: string;
  message: string;
};

export const AskLibrarianScreen = ({ navigation }: AskLibrarianProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    regNumber: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Validation logic remains the same
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the errors in the form');
      return;
    }

    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert(
        'Success',
        'Your message has been sent successfully. A librarian will respond to your query soon.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ 
    icon: Icon, 
    placeholder, 
    value, 
    onChangeText, 
    error, 
    multiline = false,
    keyboardType = 'default',
  }: {
    icon: any;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    error?: string;
    multiline?: boolean;
    keyboardType?: 'default' | 'email-address';
  }) => (
    <View style={styles.inputWrapper}>
      <View style={[
        styles.inputContainer,
        multiline && styles.multilineContainer,
        error && styles.inputError
      ]}>
        <Icon color={COLORS.text.muted} size={20} style={styles.inputIcon} />
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          keyboardType={keyboardType}
          placeholderTextColor={COLORS.text.muted}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={COLORS.text.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ask a Librarian</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoCard}>
            <MessageSquare size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Get help from our librarians with your research questions, finding resources, or using library services.
            </Text>
          </View>

          <InputField
            icon={User}
            placeholder="Your Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
          />

          <InputField
            icon={Mail}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            keyboardType="email-address"
          />

          <InputField
            icon={Hash}
            placeholder="Registration Number"
            value={formData.regNumber}
            onChangeText={(text) => setFormData({ ...formData, regNumber: text })}
            error={errors.regNumber}
          />

          <InputField
            icon={BookOpen}
            placeholder="Subject"
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
            error={errors.subject}
          />

          <InputField
            icon={MessageSquare}
            placeholder="Your Message"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            error={errors.message}
            multiline
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.text.light} />
            ) : (
              <>
                <Send size={20} color={COLORS.text.light} />
                <Text style={styles.submitButtonText}>Send Message</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background.paper,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.dark,
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.text.muted,
    lineHeight: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  multilineContainer: {
    height: 120,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.dark,
  },
  multilineInput: {
    height: '100%',
    textAlignVertical: 'top',
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 16,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.text.light,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
});
