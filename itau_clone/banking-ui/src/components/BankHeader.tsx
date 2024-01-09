

import React, { useEffect, useState } from 'react';
import '../styles/BankPage.css';

const BankHeader = () => {
    return (
        <header className="bank-header">
            {/* <img className="bank-logo" /> */}
            <span className="bank-user-info">ag: 1617 c/c: 34042-5</span>
        </header>
    );
}

export default BankHeader;
