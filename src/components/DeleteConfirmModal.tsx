import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = {
  visible: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({
  visible,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center p-margin">
        <Pressable
          accessibilityLabel="Close dialog"
          onPress={onCancel}
          className="absolute inset-0 bg-inverse-surface/40"
        />

        <Animated.View
          entering={FadeInDown.duration(220)}
          style={{ width: "100%", maxWidth: 340 }}
        >
          <View
            className="bg-surface rounded-xl p-6 items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.15,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <View className="w-12 h-12 rounded-full bg-error-container items-center justify-center mb-3">
              <Ionicons name="trash-outline" size={24} color="#B91C1C" />
            </View>

            <Text className="font-jakarta-semibold text-headline-sm text-on-surface text-center mb-1">
              Delete transaction?
            </Text>
            <Text className="font-jakarta text-body-sm text-secondary text-center mb-6">
              This transaction will be removed from your expense records. This
              action cannot be undone.
            </Text>

            <View className="w-full gap-1">
              <Pressable
                onPress={onConfirm}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-error items-center justify-center active:opacity-90"
              >
                <Text className="font-jakarta-medium text-label-md text-on-error">
                  {loading ? "Deleting..." : "Delete"}
                </Text>
              </Pressable>

              <Pressable
                onPress={onCancel}
                disabled={loading}
                className="w-full h-12 items-center justify-center"
              >
                <Text className="font-jakarta-medium text-label-md text-secondary">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}