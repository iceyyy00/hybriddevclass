import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import AmountInput from "../components/AmountInput";
import CategoryChip from "../components/CategoryChip";
import PickerField from "../components/PickerField";
import { useTransactions } from "../context/TransactionsContext";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "../data/expenseOptions";
import { formatLongDate, formatShortDate, formatTime } from "../utils/format";

const buildDateOptions = () => {
  const today = new Date();
  const daysAgo = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  };
  return [
    { label: "Today", date: daysAgo(0) },
    { label: "Yesterday", date: daysAgo(1) },
    { label: formatShortDate(daysAgo(2)), date: daysAgo(2) },
  ];
};

export default function AddExpense() {
  const router = useRouter();
  const goBack = () => router.canGoBack() ? router.back() : router.replace("/home" as Href);
  const { addTransaction } = useTransactions();
  const dateOptions = useMemo(() => buildDateOptions(), []);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].name);
  const [description, setDescription] = useState("");
  const [dateIndex, setDateIndex] = useState(0);
  const [paymentIndex, setPaymentIndex] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const value = parseInt(amount || "0", 10);
    if (value <= 0) {
      setAmountError(true);
      return;
    }

    const selectedCategory = EXPENSE_CATEGORIES.find((c) => c.name === category)!;
    const selectedDate = dateOptions[dateIndex];
    const payment = PAYMENT_METHODS[paymentIndex];
    const text = description.trim() || selectedCategory.name;

    addTransaction({
      category: selectedCategory.name,
      icon: selectedCategory.icon,
      title: text,
      description: text,
      amount: value,
      when: selectedDate.label,
      date: formatLongDate(selectedDate.date),
      time: formatTime(new Date()),
      paymentMethod: payment.label,
      paymentIcon: payment.icon,
      status: "Completed • Personal",
    });

    setSaved(true);
    setTimeout(() => router.back(), 1200);
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      {/* Header */}
      <View className="h-14 px-margin flex-row items-center gap-1">
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          className="w-11 h-11 -ml-2 items-center justify-center rounded-full active:bg-surface-container-high"
        >
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text className="font-jakarta-semibold text-title-brand text-on-surface">
          Add Expense
        </Text>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-margin pb-8 gap-6"
        >
          <AmountInput
            value={amount}
            onChange={(digits) => {
              setAmount(digits);
              if (parseInt(digits || "0", 10) > 0) setAmountError(false);
            }}
            error={amountError}
          />

          {/* Kategori */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="font-jakarta-medium text-label-md text-on-surface">
                Category
              </Text>
              <Text className="font-jakarta text-caption text-placeholder">
                Required
              </Text>
            </View>
            <View
              accessibilityRole="radiogroup"
              className="flex-row flex-wrap -mx-1"
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <CategoryChip
                  key={c.name}
                  label={c.label}
                  icon={c.icon}
                  iconActive={c.iconActive}
                  wide={c.wide}
                  selected={category === c.name}
                  onPress={() => setCategory(c.name)}
                />
              ))}
            </View>
          </View>

          {/* Deskripsi */}
          <View className="gap-1">
            <Text className="font-jakarta-medium text-label-md text-on-surface">
              Description
            </Text>
            <View className="h-[52px] bg-surface rounded-xl overflow-hidden">
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="What did you spend on?"
                placeholderTextColor="#A3A3A3"
                returnKeyType="done"
                className="w-full h-full px-4 font-jakarta text-body-lg text-on-surface"
              />
            </View>
          </View>

          {/* Tanggal dan metode bayar */}
          <View className="flex-row gap-3">
            <PickerField
              label="Date"
              value={dateOptions[dateIndex].label}
              icon="calendar-outline"
              onPress={() => setDateIndex((i) => (i + 1) % dateOptions.length)}
            />
            <PickerField
              label="Payment method"
              value={PAYMENT_METHODS[paymentIndex].label}
              icon={PAYMENT_METHODS[paymentIndex].icon}
              onPress={() =>
                setPaymentIndex((i) => (i + 1) % PAYMENT_METHODS.length)
              }
            />
          </View>

          {/* Simpan + toast */}
          <View className="pt-2 gap-2">
            <Pressable
              onPress={handleSave}
              disabled={saved}
              className={`h-[52px] w-full rounded-xl bg-primary-container items-center justify-center active:opacity-90 ${
                saved ? "opacity-80" : ""
              }`}
            >
              <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                Save expense
              </Text>
            </Pressable>

            {saved && (
              <Animated.View
                entering={FadeIn.duration(250)}
                exiting={FadeOut.duration(200)}
                style={{ alignSelf: "center" }}
              >
                <View className="flex-row items-center gap-2 py-2 px-4 rounded-full bg-surface-container-high">
                  <Ionicons name="checkmark-circle" size={18} color="#38452F" />
                  <Text className="font-jakarta-medium text-body-sm text-on-surface">
                    Expense added
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}