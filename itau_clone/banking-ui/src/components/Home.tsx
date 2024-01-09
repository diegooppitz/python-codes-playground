

import React, { useEffect, useState } from 'react';
import HomeBanking from './Banking';
import BankHeader from './BankHeader';

const Home = () => {
    const [accountData, setAccountData] = useState({ balance: null, name: null, id: null });

    const fetchData = async () => {
        const endpoint = "http://127.0.0.1:8000/banking/accounts/3223242/";
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
        <div>
            <BankHeader />
            <HomeBanking accountData={accountData} />
        </div>
    );
}

export default Home;
