

import React, { useEffect, useState } from 'react';
import Banking from './banking_products';
import BankHeader from './bank_header';

const Home = () => {
    const API_URL = 'http://127.0.0.1:8000/banking/'
    const [accountData, setAccountData] = useState({ balance: null, name: null, account_id: null, credit_cards: [] });

    const fetchData = async () => {
        const endpoint = `${API_URL}accounts/83227809/`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log("data", data)

            if (data) setAccountData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <BankHeader accountData={accountData} />
            <Banking accountData={accountData} />
        </>
    );
}

export default Home;
