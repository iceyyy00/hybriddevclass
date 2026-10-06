import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from "react-native-svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function App() {

  // set variable
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [focused, setFocused] = useState<"email" | "password" | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
 const handleLogin = () => {
    const emailInvalid = !EMAIL_REGEX.test(email.trim());
    const passwordInvalid = password.length === 0;
    setEmailError(emailInvalid);
    setPasswordError(passwordInvalid);
    if (emailInvalid || passwordInvalid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsLoggedIn(true);
    }, 1200);
  }; 

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword("");
  };

  const inputClass = (field: "email" | "password", hasError: boolean) =>
    hasError
      ? "border-[1.5px] border-error"
      : focused === field
      ? "border-[1.5px] border-primary-container"
      : "border border-border";


    if (isLoggedIn) {
    return (
      <SafeAreaView className="flex-1 bg-canvas">
        <View className="flex-1 items-center justify-center px-margin">
          <Text className="font-jakarta-semibold text-headline-lg text-on-surface text-center">
            Welcome, {email}!
          </Text>
          <Text className="mt-2 mb-8 font-jakarta text-body-md text-secondary text-center">
            You have successfully logged in.
          </Text>

          <Pressable
            onPress={handleLogout}
            className="w-full max-w-[390px] h-[52px] rounded-xl bg-primary-container items-center justify-center active:bg-primary"
          >
            <Text className="font-jakarta-semibold text-label-lg text-on-primary">
              Logout
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

 
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-margin pb-8"
        >
          <View className="w-full max-w-[390px] self-center">
            
              <View className="flex-row items-center gap-2.5 pt-2">
                <Image source={require("../../assets/images/icon.png")} className="w-8 h-8 rounded-lg" />
                <Text className="font-jakarta-semibold text-tittle-brand text-on-surface">
                  Moneo
                </Text>
              </View>

              <View className="mt-8">
                <Text className="font-jakarta-semibold text-headline-lg text-on-surface">
                  Welcome Back!
                </Text>
                <Text className="mt-2 font-jakarta text-body-md text-secondary">
                  Keep track of your spending and stay in control of your money.
                </Text>
              </View>

              
              <View className="mt-8">
                <Text className="font-jakarta-medium text-label-sm text-on-surface mb-2">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={(t) => {setEmail(t); setEmailError(false)}}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  placeholder="you@example.com"
                  placeholderTextColor="#A3A3A3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className={'w-full h-[52px] px-4 rounded-xl bg-surface text-on-surface font-jakarta text-body-lg ${inputClass("email", emailError)}'}/>
                {emailError && (
                  <Text className="mt-1 font-jakarta text-label-sm text-error">
                    Please enter a valid email address.
                  </Text>
                )}
              </View>

              <Text className="mt-4 font-jakarta-medium text-label-sm text-on-surface mb-2">
                Password
              </Text>
              <View className="w-full justify-center">
                <TextInput
                  value={password}
                  onChangeText={(t) => { setPassword(t); setPasswordError(false); }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your password"
                  placeholderTextColor="#A3A3A3"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="current-password"
                  className={`w-full h-[52px] pl-4 pr-12 rounded-xl bg-surface text-on-surface font-jakarta text-body-lg ${inputClass("password", passwordError)}`}
                />
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  accessibilityLabel="Toggle password visibility"
                  className="absolute right-0 top-0 h-[52px] w-12 items-center justify-center"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#5E5E5E"
                  />
                </Pressable>
              </View>
              {passwordError && (
                <Text className="mt-1.5 font-jakarta text-caption text-error">
                  Enter your password.
                </Text>
              )}

            
              <Pressable className="self-end mt-2 py-1">
                <Text className="font-jakarta-medium text-label-md text-primary-container">
                  Forgot Password?
                </Text>
              </Pressable>

          
              <Pressable
                onPress={handleLogin}
                disabled={loading}
                className="mt-6 w-full h-[52px] rounded-xl bg-primary-container items-center justify-center active:bg-primary">
                {loading ? (
                  <ActivityIndicator color="#FFFFFF"/>
                ) : (
                  <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                    Login
                  </Text>
                )}
              </Pressable>

              <View className="mt-6 flex-row items-center gap-3">
                <View className="flex-1 h-px bg-border" />
                <Text className="font-jakarta text-caption text-secondary">or continue with</Text>
                <View className="flex-1 h-px bg-border" />
              </View>


              <View className="mt-5 gap-3">
                <Pressable className="w-full h-[52px] px-4 rounded-xl bg-surface border border-border items-center justify-center active:bg-surface-container-low">
                  <View className="absolute left-4">
                    <Svg width={18} height={18} viewBox="0 0 24 24">
                      <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </Svg>
                  </View>
                  <Text className="font-jakarta-medium text-label-md text-on-surface">
                    Continue with Google
                  </Text>
                </Pressable>

                <Pressable className="w-full h-[52px] px-4 rounded-xl bg-surface border border-border items-center justify-center active:bg-surface-container-low">
                  <View className="absolute left-4">
                    <Ionicons name="logo-apple" size={20} color="#1C1B1B" />
                  </View>
                  <Text className="font-jakarta-medium text-label-md text-on-surface">
                    Continue with Apple
                  </Text>
                </Pressable>
              </View>

              
              <Text className="mt-8 text-center font-jakarta text-body-md text-secondary">
                Don't have an account?{" "}
                <Text className="font-jakarta-medium text-label-md text-primary-container">
                  Sign up
                </Text>
              </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}