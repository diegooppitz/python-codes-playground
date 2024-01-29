import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CreditCards from '../components/CreditCards';
import { CreditCard } from '../interfaces';
import BalanceDetail from '../components/BalanceDetail';


describe('HomeBanking Component', () => {
    const mockAccountData = {
        name: 'João',
        account_id: 12345678,
        balance: 500.00,
        credit_cards: [],
    };

    it('should render correct title and balance details', () => {
        render(<BalanceDetail accountData={mockAccountData} />);

        const balanceText = screen.getByText('saldo em conta corrente:');
        expect(balanceText).toBeInTheDocument();

        const balanceValue = screen.getByText('R$ 500');
        expect(balanceValue).toBeInTheDocument();

        const overdraftText = screen.getByText('Cheque especial disponível:');
        expect(overdraftText).toBeInTheDocument();

        const overdraftValue = screen.getByText('R$ 1000.00');
        expect(overdraftValue).toBeInTheDocument();
    });

    // Outros testes conforme necessário
});

describe('CreditCards Component', () => {
    const mockCreditCards: CreditCard[] = [
        { card_name: 'Card 1', card_number: "12345678", bill_date: '15', total_bill: '1000', account_number: '3050' }
    ];

    it('should correctly render credit cards', () => {
        render(<CreditCards creditCards={mockCreditCards} />);
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        expect(screen.getByText('Dia 15')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });
});