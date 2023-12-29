

import React, { useEffect, useState } from 'react';
import HomeBanking from './Banking';

const Home = () => {
    const [accountData, setAccountData] = useState({ balance: null, name: null, id: null });

    const fetchData = async () => {
        const endpoint = "http://localhost:8000/banking/bank-account/";
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
        <div>
            <HomeBanking accountData={accountData} />
        </div>
    );
}

export default Home;
