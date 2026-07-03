export interface Transaction {
  id: number;
  customer: string;
  amount: string;
  method: string;
  status: "success" | "failed";
  date: string;
  reference: string;
}
