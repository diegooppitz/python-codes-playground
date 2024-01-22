import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CreditCards from '../components/CreditCards';
import { CreditCard } from '../interfaces';

describe('CreditCards Component', () => {
    const mockCreditCards: CreditCard[] = [
        { card_name: 'Card 1', card_number: "586000", bill_date: '10/10/2024', total_bill: '1000', account_number: '3050' }
    ];

    it('should correctly render credit cards', () => {
        render(<CreditCards creditCards={mockCreditCards} />);
        expect(screen.getByText('Card 1')).toBeInTheDocument();
        expect(screen.getByText('10/10/2024')).toBeInTheDocument();
        expect(screen.getByText('1000')).toBeInTheDocument();
    });
});