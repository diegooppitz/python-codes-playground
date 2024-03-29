export interface AccountData {
  balance: number | null;
  name: string | null;
  account_id: number | null;
  credit_cards: CreditCard[] | [];
}

export interface CreditCard {
  account_number: string;
  card_number: string;
  card_name: string;
  bill_date: string;
  total_bill: string;
  month_bill?: string;
}
export interface BalanceDetailTransactions {
  id: number;
  date: string;
  type: string;
  description: string;
  amount: string;
  account_number: string;
}