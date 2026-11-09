import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { TRANSACTIONS, type Transaction } from "../data/transactions";

type NewTransaction = Omit<Transaction, "id">;

type TransactionsContextValue = {
  transactions: Transaction[];
  addTransaction: (t: NewTransaction) => void;
  deleteTransaction: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  // Data awal diambil dari file data statis
  const [transactions, setTransactions] = useState<Transaction[]>(TRANSACTIONS);

  const addTransaction = useCallback((t: NewTransaction) => {
    setTransactions((prev) => [{ ...t, id: Date.now().toString() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ transactions, addTransaction, deleteTransaction }),
    [transactions, addTransaction, deleteTransaction]
  );

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error("useTransactions must be used inside TransactionsProvider");
  }
  return ctx;
}