

import React, { useEffect, useState } from 'react';

const Home = () => {
    const [accontData, setAccountData] = useState('');
    const fetchData = () => {
        const endpoint = "http://localhost:8000/api/bank-accounts/";
        fetch(endpoint)
            .then(({ data }) => {
                console.log("data", data);
                setAccountData(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <h1>Itau Home</h1>
            <div>{accontData}</div>
        </div>
    );
}

export default Home;
