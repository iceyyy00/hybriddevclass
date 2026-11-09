import { useEffect, useRef, useState, type ComponentRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { formatNumber } from "../utils/format";

type Props = {
  value: string; // hanya digit, mis. "125000"
  onChange: (digits: string) => void;
  error?: boolean;
};

export default function AmountInput({ value, onChange, error = false }: Props) {
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);
  const [focused, setFocused] = useState(false);
  const blink = useSharedValue(1);

  useEffect(() => {
    // buat kursor kedip-kedip
    blink.value = withRepeat(withTiming(0, { duration: 600 }), -1, true);
    
    const id = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(id);
  }, []);

  const cursorStyle = useAnimatedStyle(() => ({ opacity: blink.value }));
  const amount = parseInt(value || "0", 10);

  return (
    <View className="items-center pt-3 pb-1">
      <Text className="font-jakarta-medium text-label-sm text-secondary mb-1">
        Amount
      </Text>

      <View className="w-full">
        <Pressable
          onPress={() => inputRef.current?.focus()}
          accessibilityRole="button"
          accessibilityLabel="Edit amount"
          className="w-full"
        >
          <View className="flex-row items-baseline justify-center gap-1.5 py-1">
            <Text className="font-jakarta-medium text-headline-md text-secondary">
              Rp
            </Text>
            <Text className="font-jakarta-semibold text-headline-lg text-on-surface">
              {formatNumber(amount)}
            </Text>
            {focused && (
              <Animated.View
                style={[
                  { width: 2, height: 28, marginLeft: 2, alignSelf: "center", backgroundColor: "#4F5D45" },
                  cursorStyle,
                ]}
              />
            )}
          </View>
        </Pressable>

        {/* Input asli: transparan, menutupi seluruh area angka */}
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={(t) => onChange(t.replace(/\D/g, "").slice(0, 10))}
          keyboardType="number-pad"
          returnKeyType="done"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel="Amount in Rupiah"
          caretHidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
          }}
        />
      </View>

      {error && (
        <Text className="mt-1 font-jakarta text-caption text-error text-center">
          Enter a valid amount
        </Text>
      )}
    </View>
  );
}