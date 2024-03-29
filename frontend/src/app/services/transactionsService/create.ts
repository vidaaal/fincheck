import { httpClient } from "../httpClient";

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'EXPENSE' | 'INCOME'
  date: string
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', params)

  return data
}