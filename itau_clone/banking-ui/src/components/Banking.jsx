

import React, { useEffect } from 'react';

const HomeBanking = ({ accountData }) => {
    useEffect(() => {
        console.log("account data componnent", accountData)
    }, [])

    return (
        <div>
            <h1>Itau Banking</h1>
            <div>
                <p>Balance: {accountData.balance}</p>
                <p>Name: </p>
            </div>
        </div>
    );
}

export default HomeBanking;
