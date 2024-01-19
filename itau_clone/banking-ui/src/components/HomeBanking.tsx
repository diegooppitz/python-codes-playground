
import React from 'react'
import { AccountData } from '../interfaces';
import AccordionItem from './AccordionItem';
import '../styles/BankPage.css';
import CreditCards from './CreditCards';

const HomeBanking: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    return (
        <div className="bank-menu">
            <div className="bank-menu-infos">
                <h3>Olá { accountData.name }, está é a sua página inicial</h3>
                <AccordionItem title="Saldo">
                    <p>Saldo: R$ { accountData.balance }</p>
                </AccordionItem>
                <AccordionItem title="Cartões">
                    <CreditCards creditCards={accountData.credit_cards} />
                </AccordionItem>
                <AccordionItem title="Crédito">=
                    <p>Até 90 dias para começar a pagar! Confira disponibilidade. Sujeito à análise.</p>
                </AccordionItem>
            </div>
            <div className="bank-menu-other-infos">
                <div className="menu-item">Pagamentos</div>
                <div className="menu-item">Transferências</div>
                <div className="menu-item">Pix</div>
                <div className="menu-item">Open Finance</div>
            </div>
        </div>
    );
}

export default HomeBanking
