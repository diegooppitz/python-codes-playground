

import React from 'react'
import { AccountData } from '../../interfaces';
import "./BalanceDetail.scss"

const BalanceDetail: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    const transactionsData = [{ date: '01/02', description: 'PIX TRANSF john', amount: 200 }, { date: '30/01', description: 'PIX TRANSF jeff', amount: 360 }, { date: '30/01', description: 'PIX TRANSF will', amount: 480 }]

    return (
        <div className='balance-statements-details'>
            <div className='statements-detail'>
                <div className="statements-header">
                    <div className='statements-title'>Data</div>
                    <div className='statements-title'>Descrição</div>
                    <div className='statements-title'>Valor (R$)</div>
                </div>

                {transactionsData && transactionsData.map((transaction, index) => (
                    <div className={`statements-body ${index % 2 === 0 ? 'even-row' : ''}`} key={index}>
                        <div className="statements-text">{transaction.date}</div>
                        <div className="statements-text">{transaction.description}</div>
                        <div className="statements-text">{transaction.amount}</div>
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
    );
}

export default BalanceDetail;
