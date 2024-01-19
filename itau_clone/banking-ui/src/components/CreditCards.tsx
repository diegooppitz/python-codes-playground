

import React from 'react'
import { CreditCard } from '../interfaces';

const CreditCards: React.FC<{ creditCards: CreditCard[] }> = ({ creditCards }) => {
    return (
        <div className='bank-menu-cards'>
            {creditCards?.length > 0 && creditCards.map((card, index) => (
                <div className="bank-menu-cards-row" key={index}>
                    <div className="bank-menu-cards-cell"><h4>Cartão</h4><p>{card.card_name}</p></div>
                    <div className="bank-menu-cards-cell"><h4>Vencimento</h4><p>{card.bill_date}</p></div>
                    <div className="bank-menu-cards-cell"><h4>Valor (R$)</h4><p>{card.total_bill}</p></div>
                    <div className="bank-menu-cards-cell"><h4>Fatura</h4><p>Aberta</p></div>
                </div>
            ))}
        </div>
    );
}

export default CreditCards;
