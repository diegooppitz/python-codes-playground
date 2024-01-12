
import React, { useEffect, useState } from 'react'
import { AccountData } from '../interfaces';
import AccordionItem from './AccordionItem';
import '../styles/BankPage.css';



// const HomeBanking: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
//     useEffect(() => {
//         console.log("account data componnent", accountData)
//     }, [])

//     return (
//         <div>
//             <h1>Itau Banking</h1>
//             <div>
//                 <p>Balance: {accountData.balance}</p>
//                 <p>Name: {accountData.name}</p>
//             </div>
//         </div>
//     );
// }

// export default HomeBanking;

const HomeBanking: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    return (
        <div className="bank-main">
            <div className="bank-menu-infos">
                <h3>Olá { accountData.name }, está é a sua página inicial</h3>
                <AccordionItem title="Saldo">
                    <p>Saldo: R$ { accountData.balance }</p>
                </AccordionItem>
                <AccordionItem title="Cartões">
                    
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
