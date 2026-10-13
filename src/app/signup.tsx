import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path } from "react-native-svg";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "name" | "email" | "password" | "confirm";

const inputBase = "w-full h-[52px] rounded-xl bg-surface text-on-surface font-jakarta text-body-lg";

export default function SignupScreen() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [focused, setFocused] = useState<Field | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const nameInvalid = name.trim().length === 0;
    const emailInvalid = !EMAIL_REGEX.test(email.trim());
    const passwordInvalid = password.length < 8;
    const mismatch =
        (confirmPassword.length > 0 || submitted) && password !== confirmPassword;

    const handleSignup = () => {
        setSubmitted(true);
        if (nameInvalid || emailInvalid || passwordInvalid || password !== confirmPassword) {
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace("/"); // akun "terdaftar", kembali ke halaman login
        }, 1200);
    };

    const inputClass = (field: Field, hasError: boolean) =>
        hasError
            ? "border-[1.5px] border-error"
            : focused === field
                ? "border-[1.5px] border-primary"
                : "border border-border";


    return (
        <SafeAreaView className="flex-1 bg-canvas">
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerClassName="px-margin pb-8">
                    <View className="w-full">

                        <View className="flex-row items-center gap-2 pt-2 mb-8">
                            <View className="w-8 h-8 rounded-lg bg-surface items-center justify-center">
                                <Svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#38452F"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <Circle cx={12} cy={12} r={8} />
                                    <Path d="M9 12h6" />
                                    <Path d="M12 9v6" />
                                </Svg>
                            </View>
                            <Text className="font-jakarta-semibold text-headline-sm text-on-surface">
                                Moneo
                            </Text>
                        </View>

                        <View className="mb-8">
                            <Text className="font-jakarta-semibold text-headline-lg text-on-surface mb-2">
                                Create your account
                            </Text>
                            <Text className="font-jakarta text-body-lg text-secondary">
                                Start tracking your spending and take control of your money.
                            </Text>
                        </View>

                        <View className="gap-4">
                            <View className="gap-2">
                                <Text className="font-jakarta-medium text-label-md text-on-surface">
                                    Name
                                </Text>
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    onFocus={() => setFocused("name")}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Your name"
                                    placeholderTextColor="#A3A3A3"
                                    autoComplete="name"
                                    className={`${inputBase} px-4 ${inputClass("name", submitted && nameInvalid)}`}
                                />
                                {submitted && nameInvalid && (
                                    <Text className="font-jakarta text-caption text-error pl-1">
                                        Enter your name.
                                    </Text>
                                )}
                            </View>

                        <View className="gap-2">
                            <Text className="font-jakarta-medium text-label-md text-on-surface">
                                Email
                            </Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setFocused("email")}
                                onBlur={() => setFocused(null)}
                                placeholder="you@example.com"
                                placeholderTextColor="#A3A3A3"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoComplete="email"
                                className={`${inputBase} px-4 ${inputClass("email", submitted && emailInvalid)}`}
                            />
                            {submitted && emailInvalid && (
                                <Text className="font-jakarta text-caption text-error pl-1">
                                    Enter a valid email address.
                                </Text>
                            )}
                        </View>

                        <View className="gap-2">
                            <Text className="font-jakarta-medium text-label-md text-on-surface">
                                Password
                            </Text>
                            <View className="w-full justify-center">
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setFocused("password")}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Create a password"
                                    placeholderTextColor="#A3A3A3"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    className={`${inputBase} pl-4 pr-12 ${inputClass("password", submitted && passwordInvalid)}`}
                                />
                                <Pressable
                                    onPress={() => setShowPassword((v) => !v)}
                                    accessibilityLabel="Toggle password visibility"
                                    className="absolute right-0 top-0 h-[52px] w-12 items-center justify-center">
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#5e5e5e"
                                    />
                                </Pressable>
                            </View>
                            <Text
                                className={`font-jakarta text-caption pl-1 ${submitted && passwordInvalid ? "text-error" : "text-secondary"
                                    }`}
                            >
                                Use at least 8 characters
                            </Text>
                        </View>

                        <View className="gap-2">
                            <Text className="font-jakarta-medium text-label-md text-on-surface">
                                Confirm password
                            </Text>
                            <View className="w-full justify-center">
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onFocus={() => setFocused("confirm")}
                                    onBlur={() => setFocused(null)}
                                    placeholder="Re-enter your password"
                                    placeholderTextColor="#A3A3A3"
                                    secureTextEntry={!showConfirm}
                                    autoCapitalize="none"
                                    autoComplete="new-password"
                                    className={`${inputBase} pl-4 pr-12 ${inputClass("confirm", mismatch)}`}
                                />
                                <Pressable
                                    onPress={() => setShowConfirm((v) => !v)}
                                    accessibilityLabel="Toggle confirm password visibility"
                                    className="absolute right-0 top-0 h-[52px] w-12 items-center justify-center"
                                >
                                    <Ionicons
                                        name={showConfirm ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#5E5E5E"
                                    />
                                </Pressable>
                            </View>
                            {mismatch && (
                                <View className="flex-row items-center gap-1 pl-1">
                                    <Ionicons name="alert-circle" size={14} color="#B91C1C" />
                                    <Text className="font-jakarta text-caption text-error">
                                        Passwords don't match
                                    </Text>
                                </View>
                            )}

                        </View>
                        <View className="pt-2">
                            <Pressable
                                onPress={handleSignup}
                                disabled={loading}
                                className="w-full h-[52px] rounded-xl bg-primary-container items-center justify-center active:opacity-90"
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                                        Create account
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {/* Divider */}
                    <View className="flex-row items-center py-6">
                        <View className="flex-1 h-px bg-surface-container-highest" />
                        <Text className="mx-4 font-jakarta text-caption text-secondary">
                            or continue with
                        </Text>
                        <View className="flex-1 h-px bg-surface-container-highest" />
                    </View>

                    {/* Social */}
                    <View className="gap-3">
                        <Pressable className="w-full h-[52px] px-4 rounded-xl bg-surface border border-border items-center justify-center active:bg-surface-container-low">
                            <View className="absolute left-4">
                                <Svg width={20} height={20} viewBox="0 0 24 24">
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

                    {/* Footer */}
                    <Text className="mt-8 mb-2 text-center font-jakarta text-body-md text-secondary">
                        Already have an account?{" "}
                        <Text
                            onPress={() => router.replace("/")}
                            className="font-jakarta-medium text-label-md text-primary"
                        >
                            Log in
                        </Text>
                    </Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView >
    );

}