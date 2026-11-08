import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type Transaction = {
  id: string;
  category: string;
  icon: IconName;
  title: string;
  description: string;
  amount: number;
  when: string; // label singkat di Home: "Today" / "Yesterday"
  date: string;
  time: string;
  paymentMethod: string;
  paymentIcon: IconName;
  status: string;
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    category: "Food",
    icon: "restaurant-outline",
    title: "Lunch",
    description: "Lunch with friends",
    amount: 45000,
    when: "Today",
    date: "October 20, 2026",
    time: "12:30 PM",
    paymentMethod: "Cash",
    paymentIcon: "cash-outline",
    status: "Completed • Personal",
  },
  {
    id: "2",
    category: "Transport",
    icon: "car-outline",
    title: "Grab",
    description: "Grab ride to campus",
    amount: 28000,
    when: "Today",
    date: "October 20, 2026",
    time: "08:15 AM",
    paymentMethod: "E-wallet",
    paymentIcon: "wallet-outline",
    status: "Completed • Personal",
  },
  {
    id: "3",
    category: "Shopping",
    icon: "bag-outline",
    title: "Shoes",
    description: "New running shoes",
    amount: 350000,
    when: "Yesterday",
    date: "October 19, 2026",
    time: "04:45 PM",
    paymentMethod: "Debit card",
    paymentIcon: "card-outline",
    status: "Completed • Personal",
  },
];