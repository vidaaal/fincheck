import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  name: string;
  value: number;
  bankAccountId: string;
  categoryId: string;
  type: 'EXPENSE' | 'INCOME';
  date: string;
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', params)

  return data
}
