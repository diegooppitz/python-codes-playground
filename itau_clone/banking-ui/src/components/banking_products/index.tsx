
import React from 'react'
import { AccountData } from '../../interfaces';
import Accordion from '../accordion/';
import CreditCards from '../credit_cards/';
import BalanceDetail from '../balance_detail/';
import './BankingProducts.scss';
import Loans from '../loans';
import OtherActions from '../other_actions';

const BankingProducts: React.FC<{ accountData: AccountData }> = ({ accountData }) => {


    return (
        <div className="bank-menu">
            <div className="bank-menu-infos">
                <h3>Olá {accountData.name}, está é a sua página inicial</h3>
                <Accordion title="Saldo" data-testid="balance-section">
                    <BalanceDetail accountData={accountData} />
                </Accordion>
                <Accordion title="Cartões">
                    <CreditCards creditCards={accountData.credit_cards} />
                </Accordion>
                <Accordion title="Crédito">
                    <Loans />
                </Accordion>
            </div>

            <OtherActions accountData={accountData} />
        </div>
    );
}

export default BankingProducts
