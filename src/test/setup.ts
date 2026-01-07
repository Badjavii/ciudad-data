import mongoose from "mongoose";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function pause(message: string = "Presione Enter para continuar...") {
  const rl = readline.createInterface({ input, output });
  
  await rl.question(message);
  
  rl.close();
}

afterAll(async () => {
  await mongoose.connection.close();
});
