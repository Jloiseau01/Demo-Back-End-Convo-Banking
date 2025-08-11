import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private client: OpenAI | null = null;
  private demo = process.env.DEMO_MODE === '1';

  constructor() {
    const key = process.env.OPENAI_API_KEY;
    if (key && !this.demo) {
      this.client = new OpenAI({ apiKey: key });
    }
  }

  async chat(message: string): Promise<string> {
    if (!this.client) {
      return `🤖 (Demo) You said: "${message}". In full mode, I would analyze your spending and suggest actions.`;
    }
    const res = await this.client.chat.completions.create({
      model: 'gpt-5',
      messages: [{ role: 'user', content: message }]
    });
    return res.choices[0].message?.content || '';
  }

  async insights(): Promise<{ message: string, action?: any }> {
    return {
      message: "📊 (Demo) You're $120 under budget. Consider moving $50 to your Vacation Fund.",
      action: { type: "transfer", fromAccountId: "1", toAccountId: "2", amount: 50 }
    };
  }
}
