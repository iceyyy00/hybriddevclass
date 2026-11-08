import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import type { IconName } from "../data/transactions";

type Props = {
  label: string;
  value: string;
  icon?: IconName;
  multiline?: boolean;
};

export default function DetailRow({ label, value, icon, multiline = false }: Props) {
  return (
    <View
      className={`flex-row justify-between gap-3 ${
        multiline ? "items-start" : "items-center"
      }`}
    >
      <Text
        className={`font-jakarta-medium text-label-sm text-placeholder ${
          multiline ? "pt-0.5" : ""
        }`}
      >
        {label}
      </Text>

      <View className="flex-row items-center gap-1.5 shrink">
        {icon && <Ionicons name={icon} size={18} color="#444840" />}
        <Text
          className={
            multiline
              ? "font-jakarta text-body-md text-on-surface text-right max-w-[200px]"
              : "font-jakarta-medium text-body-md text-on-surface"
          }
        >
          {value}
        </Text>
      </View>
    </View>
  );
}