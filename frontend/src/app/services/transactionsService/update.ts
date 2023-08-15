import { httpClient } from "../httpClient";

export interface UpdateTransactionParams {
  id: string;
  name: string;
  value: number;
  bankAccountId: string;
  categoryId: string;
  type: 'EXPENSE' | 'INCOME';
  date: string;
}

export async function update({
  id,
  ...params
}: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params)

  return data
}
