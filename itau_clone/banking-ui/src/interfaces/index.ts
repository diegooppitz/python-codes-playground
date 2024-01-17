export interface CreditCard {
  account_number: string;
  card_number: string;
  bill_date: string;
  month_bill: string;
  total_bill: string;
}
export interface AccountData {
    balance: number | null;
    name: string | null;
    account_id: number | null;
    credit_cards: CreditCard[] | [];
  }