import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    Easing,
    FadeInDown,
    FadeOutUp,
} from "react-native-reanimated";

type Period = "morning" | "afternoon" | "evening" | "night";

// Urutan bahasa: Inggris, Indonesia, Jepang, Spanyol, Prancis, Korea, Jerman
const GREETINGS: Record<Period, string[]> = {
  morning: [
    "Good morning",
    "Selamat pagi",
    "おはようございます",
    "Buenos días",
    "Bonjour",
    "좋은 아침이에요",
    "Guten Morgen",
  ],
  afternoon: [
    "Good afternoon",
    "Selamat siang",
    "こんにちは",
    "Buenas tardes",
    "Bon après-midi",
    "좋은 오후예요",
    "Guten Tag",
  ],
  evening: [
    "Good evening",
    "Selamat malam",
    "こんばんは",
    "Buenas noches",
    "Bonsoir",
    "좋은 저녁이에요",
    "Guten Abend",
  ],
  night: [
    "Late night?",
    "Masih terjaga?",
    "夜更かしですか？",
    "¿Trasnochando?",
    "Encore debout ?",
    "아직 안 주무세요?",
    "Noch wach?",
  ],
};

const INTERVAL_MS = 4000;

function getPeriod(hour: number): Period {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 22) return "evening";
  return "night";
}

export default function RotatingGreeting() {
  const [index, setIndex] = useState(0);

  // Dihitung ulang tiap render, jadi sapaan ikut berubah kalau jam berganti
  const period = getPeriod(new Date().getHours());
  const list = GREETINGS[period];
  const greeting = list[index % list.length];

  const next = () => setIndex((i) => (i + 1) % list.length);

  // Setiap index berubah, timer lama dibuang dan timer baru dimulai
  useEffect(() => {
    const id = setTimeout(next, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index]);

  return (
    <Pressable
      onPress={next}
      accessibilityRole="button"
      accessibilityLabel="Change greeting language"
    >
      <View className="h-5 w-full overflow-hidden">
        <Animated.View
          key={greeting}
          style={{ position: "absolute", left: 0, top: 0 }}
          entering={FadeInDown.duration(450).easing(Easing.out(Easing.cubic))}
          exiting={FadeOutUp.duration(300)}
        >
          <Text className="font-jakarta text-body-sm text-secondary">
            {greeting}
          </Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}