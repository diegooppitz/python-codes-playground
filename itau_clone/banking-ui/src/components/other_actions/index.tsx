import React, { useState } from "react";
import PixModal from "../pix/PixModal";
import { AccountData } from '../../interfaces';

const OtherActions: React.FC<{ accountData: AccountData }> = ({ accountData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bank-menu-other-infos">
                <div className="menu-item">Pagamentos</div>
                <div className="menu-item" onClick={() => setIsModalOpen(true)}>Enviar Pix</div>
                <div className="menu-item">Open Finance</div>
            </div>
            <PixModal isOpen={isModalOpen} accountData={accountData} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default OtherActions;