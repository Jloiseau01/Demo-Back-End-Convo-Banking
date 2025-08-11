import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AccountsService {
  private demo = process.env.DEMO_MODE === '1';

  async getAccounts(userId: string) {
    if (this.demo || !process.env.FINXACT_CLIENT_ID) {
      return [
        { id: '1', type: 'Checking', balance: 2350.42 },
        { id: '2', type: 'Savings (Vacation Fund)', balance: 1800.00 },
        { id: '3', type: 'Credit Card', balance: -420.77 }
      ];
    }
    const token = await this.getToken();
    const res = await axios.get(`${process.env.FINXACT_API_URL}/accounts?customerId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.accounts;
  }

  async getTransactions(accountId: string) {
    if (this.demo || !process.env.FINXACT_CLIENT_ID) {
      return [
        { id: 't1', date: '2025-08-01', description: 'Groceries - FreshMart', amount: 62.13, category: 'Groceries' },
        { id: 't2', date: '2025-08-02', description: 'Coffee - BeanThere', amount: 4.50, category: 'Dining' },
        { id: 't3', date: '2025-08-03', description: 'Gas - QuickFuel', amount: 38.22, category: 'Transport' }
      ];
    }
    const token = await this.getToken();
    const res = await axios.get(`${process.env.FINXACT_API_URL}/accounts/${accountId}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.transactions;
  }

  private token: string | null = null;
  private async getToken() {
    if (this.token) return this.token;
    const res = await axios.post(`${process.env.FINXACT_API_URL}/oauth2/token`, 'grant_type=client_credentials', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: {
        username: process.env.FINXACT_CLIENT_ID || '',
        password: process.env.FINXACT_CLIENT_SECRET || ''
      }
    });
    this.token = res.data.access_token;
    return this.token;
  }
}
