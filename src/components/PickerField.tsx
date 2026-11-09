import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";
import type { IconName } from "../data/transactions";

type Props = {
  label: string;
  value: string;
  icon: IconName;
  onPress: () => void;
};

export default function PickerField({ label, value, icon, onPress }: Props) {
  return (
    <View className="flex-1 gap-1">
      <Text className="font-jakarta-medium text-label-md text-on-surface">
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
        className="h-[52px] px-4 rounded-xl bg-surface flex-row items-center justify-between active:bg-surface-container-low"
      >
        <View className="flex-1 flex-row items-center gap-2">
          <Ionicons name={icon} size={18} color="#5E5E5E" />
          <Text
            numberOfLines={1}
            className="flex-1 font-jakarta text-body-md text-on-surface"
          >
            {value}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={18} color="#5E5E5E" />
      </Pressable>
    </View>
  );
}