import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardStatements from './components/card_statements';
import BankHeader from './components/bank_header';
import BankingProducts from './components/banking_products';

function App() {
  const API_URL = 'http://127.0.0.1:8000/banking/'
  const [accountData, setAccountData] = useState({ balance: null, name: null, account_id: null, credit_cards: [] });

  const fetchData = async () => {
    const endpoint = `${API_URL}accounts/83227809/`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data) setAccountData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BrowserRouter>
      <BankHeader accountData={accountData} />
      <Routes>
        <Route path="/" element={<BankingProducts accountData={accountData} />} />
        <Route path="/card-statements/:cardNumber" element={<CardStatements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;