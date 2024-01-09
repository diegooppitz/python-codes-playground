
import React, { useEffect, useState } from 'react'
import { AccountData } from '../interfaces';
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
            <div className="bank-ad">
                <p>COLOQUE A SUA FATURA NO DÉBITO AUTOMÁTICO.</p>
                <button className="btn-register">cadastre-se</button>
            </div>
            <div className="bank-menu">
                <div className="menu-item">Saldo e Extrato da Conta</div>
                <div className="menu-item">Cartões</div>
                <div className="menu-item">Crédito</div>
                <div className="menu-item">Pagamentos</div>
                <div className="menu-item">Transferências</div>
                <div className="menu-item">Pix</div>
                <div className="menu-item">Open Finance</div>
            </div>
            <div className="bank-documents">
                <div className="documents-item">Extrato mensal consolidado</div>
                <div className="documents-item">Informe de rendimentos</div>
                <div className="documents-item">pasta de documentos</div>
            </div>
        </div>
    );
}

export default HomeBanking
