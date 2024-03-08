

import React, { useEffect, useState } from 'react'
import { AccountData, BalanceDetailTransactions } from '../../interfaces';
import "./BalanceDetail.scss"

const BalanceDetail: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    const [transactionsData, setTransactionsData] = useState<BalanceDetailTransactions[]>([]);
    const [hasData, setHasData] = useState(false);
    const API_URL = 'http://127.0.0.1:8000/banking/'
    const accountId = accountData?.account_id;

    const fetchData = async () => {
        if (!accountId) return;
        const endpoint = `${API_URL}accounts/${accountId}/balance_detail/`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setTransactionsData(data)

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const formatDate = (dateString: string): string | null => {
        if (!dateString) return null;
        const date = new Date(dateString);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }

    const rowType = (rowType: string) => {
        return rowType === 'sent' ? 'transaction-negative' : 'transaction-plus';
    }

    useEffect(() => {
        if (transactionsData?.length) setHasData(true);
    }, [transactionsData])

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {hasData && (
                <div className='balance-statements-details'>
                    <div className='statements-detail'>
                        <div className="statements-header">
                            <div className='statements-title'>Data</div>
                            <div className='statements-title'>Descrição</div>
                            <div className='statements-title'>Valor (R$)</div>
                        </div>

                        {transactionsData && transactionsData.map((transaction, index) => (
                            <div className={`statements-body ${index % 2 === 0 ? 'even-row' : ''}`} key={index}>
                                <div className="statements-text">{formatDate(transaction.date)}</div>
                                <div className="statements-text">{transaction.description}</div>
                                <div className={`statements-text ${rowType(transaction.type)}`}>{transaction.amount}</div>
                            </div>
                        ))}
                    </div>
                    <div className='balance-detail'>
                        <div className='balance-container'>
                            <p>saldo em conta:</p>
                            <span>R$ {accountData.balance}</span>
                        </div>
                        <div className="balance-container">
                            <p>Cheque especial:</p>
                            <span>R$ 1000.00</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BalanceDetail;
