

import React from 'react'
import { CreditCard } from '../interfaces';
import '../styles/BankPage.css';

const CreditCards: React.FC<{ creditCards: CreditCard[] }> = ({ creditCards }) => {
    return (
        <div className='bank-menu-cards'>
            <div className="bank-menu-cards-header">
                <h4>cartão</h4>
                <h4>vencimento</h4>
                <h4>valor (R$)</h4>
            </div>
            {creditCards?.length > 0 && creditCards.map((card, index) => (
                <div className="bank-menu-cards-content" key={index}>
                    <p>{card.card_number}</p>
                    <p>{card.bill_date}</p>
                    <p>{card.total_bill}</p>
                </div>
            ))}
        </div>
    );
}

export default CreditCards;
