import RotatingGreeting from "@/components/RotatingGreeting";
import { EXPENSE_CATEGORIES } from "@/data/expenseOptions";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter, type Href } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTransactions } from "../../context/TransactionsContext";
import { BUDGET, INCOME, USER_NAME } from "../../data/summary";
import { formatRupiah } from "../../utils/format";


const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
];


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

    const router = useRouter();
    const { transactions } = useTransactions();

    const expenses = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0), [transactions]
    );

    const categories = useMemo(() => {
        const totals: Record<string, number> = {};
        transactions.forEach((t) => {
            totals[t.category] = (totals[t.category] ?? 0) + t.amount;
        });
        const max = Math.max(...Object.values(totals),1);
        return Object.entries(totals).map(([name,amount]) => ({
            id: name,
            name,
            amount,
            percent: Math.round((amount / max) * 100),
            color:
             EXPENSE_CATEGORIES.find((c) => c.name === name)?.color ?? "#B2BDB0",
        }))
        .sort((a,b) => b.amount - a.amount);
    }, [transactions]);
    

    const balance = INCOME - expenses;
    const remaining = BUDGET - expenses;
    const percentUsed = Math.round((expenses / BUDGET) * 100);
    const progressWidth = Math.min(percentUsed, 100);
    const monthName = MONTHS[new Date().getMonth()];

    return (
        <ScrollView 
            className="flex-1 bg-canvas" 
            contentContainerClassName="px-margin pt-2 pb-6 gap-7" 
        >
            <View className="flex-row items-center justify-between">
                <View className="flex-1">
                    <RotatingGreeting/>
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
                        <Text className="mt-0.5 font-jakarta-medium text-body-lg text-on-surface">
                            {formatRupiah(INCOME)}
                        </Text>
                    </View>
                    <View className="flex-1">
                        <Text className="font-jakarta-medium text-label-sm text-secondary">
                            Expenses
                        </Text>
                        <Text className="mt-0.5 font-jakarta-medium text-body-lg text-on-surface">
                            {formatRupiah(expenses)}
                        </Text>
                    </View>
                </View>
            </View>

            <Pressable
                onPress={() => router.push("/add-expense" as Href)}
                className="w-full h-[52px] rounded-xl bg-primary-container flex-row items-center justify-center gap-2 active:opacity-90 active:scale-[0.99]"
                style={buttonShadow}
            >
                <Ionicons name="add" size={20} color="#FFFFFF" />
                <Text className="font-jakarta-semibold text-label-lg text-on-primary">
                Add expense
                </Text>
            </Pressable>

            <View className="p-4 bg-surface rounded-xl gap-3" style={softShadow}>
                <View className="flex-row items-start justify-between gap-2">
                    <Text className="flex-1 font-jakarta-semibold text-body-md text-on-surface">
                        {monthName} spending
                    </Text>

                    <Text
                        className="flex-1 font-jakarta text-body-sm text-secondary text-right"
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.75}
                    >
                        {formatRupiah(expenses)} / {formatRupiah(BUDGET)}
                    </Text>
                </View>

                <View className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <View
                        className="h-full rounded-full bg-primary-container"
                        style={{ width: `${progressWidth}%` }}
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
                    {transactions.slice(0, 3).map((t) => (
                    <Pressable
                        key={t.id}
                        onPress={() => router.push(`/transactions/${t.id}` as Href)}
                        className="flex-row items-center justify-between py-2.5 active:opacity-70"
                    >
                        <View className="flex-1 flex-row items-center gap-3.5">
                        <View className="w-10 h-10 rounded-xl bg-surface items-center justify-center">
                            <Ionicons name={t.icon} size={20} color="#4F5D45" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-jakarta-medium text-body-md text-on-surface">
                            {t.category}
                            </Text>
                            <Text
                            numberOfLines={1}
                            className="font-jakarta text-caption text-secondary"
                            >
                            {`${t.title} • ${t.when}`}
                            </Text>
                        </View>
                        </View>
                        <Text className="ml-3 font-jakarta-semibold text-body-md text-on-surface">
                        {`- ${formatRupiah(t.amount)}`}
                        </Text>
                    </Pressable>
                    ))}
                </View>
            </View>

            <View className="gap-4">
                <Text className="font-jakarta-semibold text-body-lg text-on-surface">
                Spending by category
                </Text>

                <View className="gap-4">
                {categories.map((c) => (
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

