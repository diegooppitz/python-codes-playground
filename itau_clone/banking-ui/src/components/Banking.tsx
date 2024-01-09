
import React, { useEffect } from 'react'
import { AccountData } from '../interfaces';



const HomeBanking: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    useEffect(() => {
        console.log("account data componnent", accountData)
    }, [])

    return (
        <div>
            <h1>Itau Banking</h1>
            <div>
                <p>Balance: {accountData.balance}</p>
                <p>Name: {accountData.name}</p>
            </div>
        </div>
    );
}

export default HomeBanking;
