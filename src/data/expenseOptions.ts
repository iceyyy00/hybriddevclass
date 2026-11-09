import type { IconName } from "./transactions";

export type ExpenseCategory = {
    name: string;
    label: string;
    icon: IconName;
    iconActive : IconName;
    color: string;
    wide?: boolean;
};

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { name: "Food", label: "Food", icon: "restaurant-outline", iconActive: "restaurant", color: "#4F5D45" },
  { name: "Transport", label: "Transport", icon: "car-outline", iconActive: "car", color: "#B2BDB0" },
  { name: "Shopping", label: "Shopping", icon: "bag-outline", iconActive: "bag", color: "#8E9B85" },
  { name: "Bills", label: "Bills", icon: "receipt-outline", iconActive: "receipt", color: "#7A8471" },
  { name: "Health", label: "Health", icon: "heart-outline", iconActive: "heart", color: "#C9B8A6" },
  { name: "Entertainment", label: "Fun", icon: "film-outline", iconActive: "film", color: "#9C8F7F" },
  { name: "Other", label: "Other", icon: "ellipsis-horizontal", iconActive: "ellipsis-horizontal", color: "#D4D0C8", wide: true },
];

export const PAYMENT_METHODS: { label: string; icon: IconName }[] = [
  { label: "Cash", icon: "cash-outline" },
  { label: "Debit card", icon: "card-outline" },
  { label: "Credit card", icon: "card-outline" },
  { label: "E-wallet", icon: "wallet-outline" },
];