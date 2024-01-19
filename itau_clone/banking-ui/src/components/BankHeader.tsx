

import React from 'react'
import { AccountData } from '../interfaces';
import LogoImg from '../assets/logo.png';

const BankHeader: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    return (
        <header className="bank-header">
            <img className="bank-logo" src={LogoImg} />
            <span className="bank-user-info">c/c: { accountData.account_id}</span>
        </header>
    );
}

export default BankHeader;
