import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import RotatingGreeting from "../../components/rotatingGreeting";

type IconName = keyof typeof Ionicons.glyphMap;

const USER_NAME = "John Doe";
const INCOME = 12000000;
const EXPENSES = 8000000;
const BUDGET = 4000000;

const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];

const TRANSACTIONS: {
    id: string;
    icon: IconName;
    title: string;
    note: string;
    amount: number;
    
}[] = [
    { id: "1", icon: "restaurant-outline", title: "Food", note: "Lunch • Today", amount: 45000 },
    { id: "2", icon: "car-outline", title: "Transport", note: "Grab • Today", amount: 28000 },
    { id: "3", icon: "bag-outline", title: "Shopping", note: "Shoes • Yesterday", amount: 350000 },
]

const CATEGORIES = [
    { id: "food", name: "Food", amount: 1250000, percent: 65, color: "#4F5D45" },
    { id: "shopping", name: "Shopping", amount: 900000, percent: 45, color: "#8E9B85" },
    { id: "transport", name: "Transport", amount: 650000, percent: 32, color: "#B2BDB0" },
]

const formatRupiah = (n: number) => 
    "Rp " + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const softShadow = {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
};

const buttonShadow = {
    shadowColor: "#4F5D45",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
};

export default function Home() {

    const balance = INCOME - EXPENSES;
    const remaining = BUDGET - EXPENSES;
    const percentUsed = Math.round((EXPENSES / BUDGET) * 100);
    const monthName = MONTHS[new Date().getMonth()];

    return (
        <ScrollView 
            className="flex-1 bg-canvas" 
            contentContainerClassName="px-margin pt-2 pb-6 gap-7" 
        >
            <View className="flex-row items-center justify-between">
                <View>
                    <RotatingGreeting />
                    <Text className="font-jakarta-semibold text-headline-sm text-on-surface">
                        {USER_NAME}
                    </Text>
                </View>
                <Pressable accessibilityLabel="Profile"
                className= "w-10 h-10 rounded-full bg-surface items-center justify-center active:scale-95"
                style={softShadow}
                >
                    <Text className="font-jakarta-semibold text-headline-sm text-on-surface">
                        {USER_NAME[0]}
                    </Text>  
                </Pressable>
            </View>
            
            <View className="gap-5">
                <View>
                    <Text className="font-jakarta text-body-sm text-secondary">
                        Total balance
                    </Text>
                    <Text className="mt-0.5 font-jakarta-semibold text-headline-lg text-on-surface">
                        {formatRupiah(balance)}
                    </Text>
                </View>

                <View className="flex-row gap-4 pt-1">
                    <View className="flex-1">
                        <Text className="font-jakarta-medium text-label-sm text-secondary">
                            Income
                        </Text>
                        <Text className="mt-0.5font-jakarta-medium text-body-lg text-on-surface">
                            {formatRupiah(INCOME)}
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-jakarta-medium text-label-sm text-secondary">
                            Expenses
                        </Text>
                        <Text className="mt-0.5font-jakarta-medium text-body-lg text-on-surface">
                            {formatRupiah(EXPENSES)}
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable
                className="w-full h-[52px] rounded-xl bg-primary-container flex-row items-center justify-center gap-2 active:opacity-90 active:scale-[0.99]"
                style={buttonShadow}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                Add expense
                </Text>
            </Pressable>

            <View className="p-4 bg-surface rounded-xl gap-3" style={softShadow}>
                <View className="flex-row items-center justify-between">
                    <Text className="font-jakarta-semibold text-body-md text-on-surface">
                        {monthName} spending
                    </Text>
                    <Text className="font-jakarta text-body-sm text-secondary">
                        {formatRupiah(EXPENSES)} <Text className="text-placeholder">/</Text>{" "}
                        {formatRupiah(BUDGET)}
                    </Text>
                </View>

                <View className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <View
                        className="h-full rounded-full bg-primary-container"
                        style={{ width: `${percentUsed}%` }}
                    />
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="font-jakarta text-caption text-secondary">
                        {formatRupiah(remaining)} remaining
                    </Text>
                    <Text className="font-jakarta-medium text-caption text-primary-container">
                        {percentUsed}% used
                    </Text>
                </View>
            </View>

            <View className="gap-3">
                <View className="flex-row items-center justify-between">
                    <Text className="font-jakarta-semibold text-body-lg text-on-surface">
                        Recent transactions
                    </Text>
                    <Pressable className="active:opacity-75">
                        <Text className="font-jakarta-medium text-label-md text-primary-container">
                        View all
                        </Text>
                    </Pressable>
                </View>

                <View className="gap-1">
                    {TRANSACTIONS.map((t) => (
                    <View
                    key={t.id}
                    className="flex-row items-center justify-between py-2.5"
                    >
                        <View className="flex-row items-center gap-3.5">
                            <View className="w-10 h-10 rounded-xl bg-surface items-center justify-center">
                                <Ionicons name={t.icon} size={20} color="#4F5D45" />
                            </View>
                            <View>
                                <Text className="font-jakarta-medium text-body-md text-on-surface">
                                    {t.title}
                                </Text>
                                <Text className="font-jakarta text-caption text-secondary">
                                    {t.note}
                                </Text>
                            </View>
                        </View>
                        <Text className="font-jakarta-semibold text-body-md text-on-surface">
                            {`- ${formatRupiah(t.amount)}`}
                        </Text>
                    </View>
                    ))}
                </View>
            </View>

            <View className="gap-4">
                <Text className="font-jakarta-semibold text-body-lg text-on-surface">
                Spending by category
                </Text>

                <View className="gap-4">
                {CATEGORIES.map((c) => (
                    <View key={c.id} className="gap-1.5">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <View
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: c.color }}
                                />
                                    <Text className="font-jakarta-medium text-label-md text-on-surface">
                                        {c.name}
                                    </Text>
                            </View>
                            <Text className="font-jakarta-semibold text-body-sm text-on-surface">
                            {formatRupiah(c.amount)}
                            </Text>
                        </View>
                        <View className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <View
                            className="h-full rounded-full"
                            style={{ width: `${c.percent}%`, backgroundColor: c.color }}
                            />
                        </View>
                    </View>
                ))}
                </View>
            </View>
        </ScrollView>
    );

}

