

import React from 'react'
import { AccountData } from '../interfaces';

const BalanceDetail: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    return (
        <div className='bank-menu-balance'>
            <div className='bank-menu-balance-item'>
                <p>saldo em conta corrente:</p>
                <span>R$ {accountData.balance}</span>
            </div>
            <div className="bank-menu-balance-item">
                <p>Cheque especial disponível:</p>
                <span>R$ 1000.00</span>
            </div>
        </div>
    );
}

export default BalanceDetail;
