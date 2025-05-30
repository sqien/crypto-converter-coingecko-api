import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { CryptoChart } from '@/components/cryptoChart';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import './App.css';

function App() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('bitcoin');
  const [toCurrency, setToCurrency] = useState('ethereum');
  const [result, setResult] = useState<number | null>(null);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <main className="h-screen max-h-[600px] flex items-center justify-center">
          <div className="w-full rounded-xl mx-3">
            <CryptoChart coinId={fromCurrency} currency="usd" />
          </div>
          <div className="w-max">
            <div className="shadow p-6 rounded-xl w-full max-w-md space-y-3 bg-zinc-800">
              <h1 className="text-2xl font-bold ">Crypto Converter</h1>

              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Input amount"
                className="w-full p-2 border rounded"
              />

              <div className="flex gap-2">
                <Select
                  value={fromCurrency}
                  onValueChange={(value) => setFromCurrency(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="text-white" placeholder="Bitcoin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="tether">Tether USD</SelectItem>
                  </SelectContent>
                </Select>
                <span className="self-center">&gt;</span>
                <Select
                  value={toCurrency}
                  onValueChange={(value) => setToCurrency(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="text-white" placeholder="Bitcoin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="tether">Tether USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={async () => {
                  const res = await fetch(
                    'https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd'
                  );
                  const data = await res.json();

                  const fromRate = data[fromCurrency].usd;
                  const toRate = data[toCurrency].usd;
                  const usdAmount = parseFloat(amount) * fromRate;
                  const converted = usdAmount / toRate;

                  setResult(Number(converted.toFixed(6)));
                }}
                className="w-full cursor-pointer"
                variant="outline"
              >
                Convert
              </Button>
              {result !== null && (
                <div className="text-lg font-semibold">
                  Result: {result} - {toCurrency}
                </div>
              )}
            </div>
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
