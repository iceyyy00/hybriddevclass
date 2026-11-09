import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, Text, View } from "react-native";
import type { IconName } from "../data/transactions";

type Props = {
  label: string;
  icon: IconName;
  iconActive: IconName;
  selected: boolean;
  onPress: () => void;
  wide?: boolean;
};

export default function CategoryChip({
  label,
  icon,
  iconActive,
  selected,
  onPress,
  wide = false,
}: Props) {
  return (
    <View className={wide ? "w-1/2 p-1" : "w-1/4 p-1"}>
      <Pressable
        onPress={onPress}
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        className={`h-14 rounded-xl items-center justify-center ${
          wide ? "flex-row gap-2" : "gap-1"
        } ${
          selected
            ? "bg-primary-container"
            : "bg-surface active:bg-surface-container-low"
        }`}
      >
        <Ionicons
          name={selected ? iconActive : icon}
          size={19}
          color={selected ? "#FFFFFF" : "#5E5E5E"}
        />
        <Text
          className={`text-label-sm ${
            selected
              ? "font-jakarta-medium text-on-primary"
              : "font-jakarta text-secondary"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
}