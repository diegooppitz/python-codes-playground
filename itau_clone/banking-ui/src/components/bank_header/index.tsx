

import React from 'react'
import { AccountData } from '../../interfaces';
import LogoImg from '../../assets/logo.png';
import './BankHeader.scss';

const BankHeader: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    return (
        <header className="bank-header">
            <a href='/'><img className="bank-logo" alt="Itau Logo" src={LogoImg} /></a>
            <span className="bank-user-info">c/c: { accountData.account_id}</span>
        </header>
    );
}

export default BankHeader;
