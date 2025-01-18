import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

const App = () => {
  // Currency data
  const currencies = {
    USD: "United States Dollar",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    JPY: "Japanese Yen",
    CNY: "Chinese Yuan Renminbi",
    INR: "Indian Rupee",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    CHF: "Swiss Franc",
    SGD: "Singapore Dollar",
    KRW: "South Korean Won",
    BRL: "Brazilian Real",
    MXN: "Mexican Peso",
    NZD: "New Zealand Dollar",
    HKD: "Hong Kong Dollar",
    AED: "UAE Dirham",
    SAR: "Saudi Riyal",
    ZAR: "South African Rand",
    RUB: "Russian Ruble",
    TRY: "Turkish Lira",
    THB: "Thai Baht",
    MYR: "Malaysian Ringgit",
    IDR: "Indonesian Rupiah",
    PHP: "Philippine Peso",
    PLN: "Polish Złoty"
  };

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  // Mock exchange rate function
  const mockExchangeRate = async (from, to) => {
    const rates = {
      USD: 1.00, EUR: 0.85, GBP: 0.73, JPY: 110.0, CNY: 6.45,
      INR: 74.5, CAD: 1.25, AUD: 1.35, CHF: 0.92, SGD: 1.35,
      KRW: 1150, BRL: 5.20, MXN: 20.0, NZD: 1.45, HKD: 7.78,
      AED: 3.67, SAR: 3.75, ZAR: 14.8, RUB: 73.5, TRY: 8.65,
      THB: 33.2, MYR: 4.20, IDR: 14400, PHP: 50.5, PLN: 3.90
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        const rate = rates[to] / rates[from];
        resolve(rate);
      }, 500);
    });
  };

  const handleLogout = () => {
    window.location.href = '/';
  };

  const convertCurrency = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const rate = await mockExchangeRate(fromCurrency, toCurrency);
      const convertedAmount = (amount * rate).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
      
      setHistory(prev => [
        { from: fromCurrency, to: toCurrency, amount, result: convertedAmount },
        ...prev.slice(0, 4)
      ]);
    } catch (error) {
      alert('Error converting currency');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CurrencyPro</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Converter Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Currency Converter
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-white mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      From
                    </label>
                    <select
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                      {Object.entries(currencies).map(([code, name]) => (
                        <option key={code} value={code}>
                          {code} - {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      To
                    </label>
                    <select
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      className="bg-white mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                      {Object.entries(currencies).map(([code, name]) => (
                        <option key={code} value={code}>
                          {code} - {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={convertCurrency}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Convert
                </button>

                {result && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-lg font-semibold text-blue-700">{result}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Conversions
              </h3>
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-md"
                  >
                    <p className="text-sm text-gray-600">
                      {item.amount} {item.from} = {item.result} {item.to}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Popular Exchange Rates
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  USD/EUR
                </div>
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  EUR/GBP
                </div>
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  GBP/JPY
                </div>
                <div className="p-3 bg-gray-50 rounded-md text-center">
                  USD/INR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;