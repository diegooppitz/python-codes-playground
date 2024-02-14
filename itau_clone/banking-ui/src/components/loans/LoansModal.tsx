import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';

interface LoansModalProps {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
    selectedAmount: string;
    numberOfInstallments: number;
}

interface PaymentDate {
    month?: string;
    normalDate: Date;
    formattedDate: string;
    installmentAmount: number;
}

const LoansModal: React.FC<LoansModalProps> = ({ isModalOpen, setIsModalOpen, selectedAmount, numberOfInstallments }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentsDates, setPaymentsDates] = useState<PaymentDate[]>([]);
    const [loading, setLoading] = useState(true);

    const calculateLoanWithInterest = (): number => {
        const interestRate = 0.06; // 6% per month
        const newTotalAmount = Number(selectedAmount) * Math.pow((1 + interestRate), numberOfInstallments);
        const installmentAmount = newTotalAmount / numberOfInstallments;

        const formattedTotalAmount = Number(newTotalAmount.toFixed(2));
        const formattedInstallmentAmount = Number(installmentAmount.toFixed(2));

        setTotalAmount(formattedTotalAmount);

        return formattedInstallmentAmount;
    };

    const calculatePaymentSchedule = () => {
        const installmentAmount = calculateLoanWithInterest();

        const firstPaymentDate = new Date();
        firstPaymentDate.setDate(firstPaymentDate.getDate() + 30);
        const paymentDates: PaymentDate[] = Array.from({ length: numberOfInstallments }, (_, i) => {
            const paymentDate = new Date(firstPaymentDate.getFullYear(), firstPaymentDate.getMonth() + i, firstPaymentDate.getDate());
            const formattedDate = `${String(paymentDate.getDate()).padStart(2, '0')}/${String(paymentDate.getMonth() + 1).padStart(2, '0')}/${paymentDate.getFullYear()}`;
            const monthName = paymentDate.toLocaleString('pt-BR', { month: 'long' });

            return {
                monthName,
                normalDate: paymentDate,
                formattedDate,
                installmentAmount,
            };
        });

        setPaymentsDates(paymentDates);
    };

    useEffect(() => {
        if (selectedAmount) calculatePaymentSchedule();
    }, [selectedAmount])

    useEffect(() => {
        if (totalAmount > 0) setLoading(false);
    }, [totalAmount])

    return (
        <>
            {!loading && (
                <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box className="loans-modal-content">
                        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                            Solicitação de Empréstimo
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Valor total: R$ {totalAmount}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            {paymentsDates.map((paymentDate, index) => (
                                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                    Parcela {index + 1} - {paymentDate.formattedDate}: R$ {paymentDate.installmentAmount}
                                </Typography>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setIsModalOpen(false)} sx={{ mr: 1, color: "error.main" }}>Cancelar</Button>
                            <Button variant="contained">Confirmar</Button>
                        </Box>
                    </Box>
                </Modal>

            )}
        </>
    )
}

export default LoansModal;