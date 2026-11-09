import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import DetailRow from "../../components/DetailRow";
import { useTransactions } from "../../context/TransactionsContext";
import { formatRupiah } from "../../utils/format";

const softShadow = {
  shadowColor: "#171717",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 1,
};

export default function TransactionDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const { transactions, deleteTransaction } = useTransactions();
  const found = transactions.find((t) => t.id === id);
  const lastKnown = useRef(found);
  if(found) lastKnown.current = found;
  const transaction = found ?? lastKnown.current;

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-canvas items-center justify-center px-margin">
        <Text className="font-jakarta-medium text-body-lg text-secondary mb-4">
          Transaction not found
        </Text>
        <Pressable onPress={() => router.back()} className="active:opacity-75">
          <Text className="font-jakarta-medium text-label-md text-primary-container">
            Go back
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleEdit = () => {
    // Belum ada halaman edit, jadi hanya meniru efek "Opening..." seperti di HTML
    setEditing(true);
    setTimeout(() => setEditing(false), 600);
  };

  const handleConfirmDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      deleteTransaction(transaction.id);
      setDeleting(false);
      setDeleteVisible(false);
      router.back();
    }, 400);
  };

  const rows = [
    { label: "Category", value: transaction.category, icon: transaction.icon },
    { label: "Description", value: transaction.description, multiline: true },
    { label: "Date", value: transaction.date },
    { label: "Time", value: transaction.time },
    {
      label: "Payment method",
      value: transaction.paymentMethod,
      icon: transaction.paymentIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      {/* Header */}
      <View className="h-16 px-margin flex-row items-center gap-1">
        <Pressable
          onPress={() => router.back()}
          accessibilityLabel="Go back"
          className="w-11 h-11 -ml-2 items-center justify-center rounded-full active:bg-surface-container-high"
        >
          <Ionicons name="arrow-back" size={24} color="#1C1B1B" />
        </Pressable>
        <Text className="font-jakarta-semibold text-headline-sm text-on-surface">
          Transaction Details
        </Text>
      </View>

      <ScrollView contentContainerClassName="px-margin pt-3 pb-6">
        {/* Hero */}
        <View className="w-full items-center mt-2 mb-8">
          <View
            className="flex-row items-center gap-1 px-3 py-1 rounded-full bg-surface mb-3"
            style={softShadow}
          >
            <Ionicons name={transaction.icon} size={16} color="#4F5D45" />
            <Text className="font-jakarta-medium text-label-sm text-secondary">
              {transaction.category}
            </Text>
          </View>

          <Text className="font-jakarta-semibold text-headline-lg text-on-surface mb-1">
            {`-${formatRupiah(transaction.amount)}`}
          </Text>
          <Text className="font-jakarta text-body-md text-secondary">
            {transaction.title}
          </Text>

          <View className="mt-3 flex-row items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container">
            <View className="w-1.5 h-1.5 rounded-full bg-primary-container" />
            <Text className="font-jakarta text-caption text-on-surface-variant">
              {transaction.status}
            </Text>
          </View>
        </View>

        {/* Kartu informasi */}
        <View
          className="w-full bg-surface rounded-xl p-margin gap-4"
          style={softShadow}
        >
          {rows.map((row, i) => (
            <View key={row.label} className="gap-4">
              {i > 0 && <View className="h-px w-full bg-surface-container-high" />}
              <DetailRow
                label={row.label}
                value={row.value}
                icon={row.icon}
                multiline={row.multiline}
              />
            </View>
          ))}
        </View>

        {/* Catatan struk */}
        <View className="w-full mt-3 px-1 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="receipt-outline" size={16} color="#A3A3A3" />
            <Text className="font-jakarta text-caption text-placeholder">
              Receipt not attached
            </Text>
          </View>
          <Pressable className="active:opacity-75">
            <Text className="font-jakarta-medium text-caption text-primary">
              Add receipt
            </Text>
          </Pressable>
        </View>

        {/* Tombol aksi */}
        <View className="w-full gap-3 mt-10 mb-4">
          <Pressable
            onPress={handleEdit}
            disabled={editing}
            className="w-full h-[52px] rounded-xl bg-primary-container flex-row items-center justify-center gap-2 active:bg-primary"
            style={softShadow}
          >
            {editing ? (
              <>
                <ActivityIndicator color="#FFFFFF" />
                <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                  Opening...
                </Text>
              </>
            ) : (
              <>
                <Ionicons name="create-outline" size={20} color="#FFFFFF" />
                <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                  Edit transaction
                </Text>
              </>
            )}
          </Pressable>

          <Pressable
            onPress={() => setDeleteVisible(true)}
            className="w-full h-11 rounded-lg flex-row items-center justify-center gap-1.5 active:bg-error-container/40"
          >
            <Ionicons name="trash-outline" size={18} color="#B91C1C" />
            <Text className="font-jakarta-medium text-label-md text-error">
              Delete transaction
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <DeleteConfirmModal
        visible={deleteVisible}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteVisible(false)}
      />
    </SafeAreaView>
  );
}