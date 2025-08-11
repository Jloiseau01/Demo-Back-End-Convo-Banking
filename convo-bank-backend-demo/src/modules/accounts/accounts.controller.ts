import { Controller, Get, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accounts: AccountsService) {}

  @Get()
  async list(@Query('userId') userId: string) {
    return await this.accounts.getAccounts(userId || 'demo');
  }

  @Get('transactions')
  async tx(@Query('accountId') accountId: string) {
    return await this.accounts.getTransactions(accountId || '1');
  }
}
