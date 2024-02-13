import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';

interface LoansModalProps {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
    selectedAmount: string;
    selectedMonths: number;
}

interface PaymentDate {
    month: string;
    normalDate: Date;
    formattedDate: string;
}

const LoansModal: React.FC<LoansModalProps> = ({ isModalOpen, setIsModalOpen, selectedAmount, selectedMonths }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentsDates, setPaymentsDates] = useState<PaymentDate[]>([]);
    const [loading, setLoading] = useState(true);

    const configPaymentsDates = () => {
        const monthsArray: number[] = Array.from({ length: 12 }, (_, i) => i);

        const firstPaymentDate = new Date();
        firstPaymentDate.setDate(firstPaymentDate.getDate() + 30);

        const newPaymentsDates: PaymentDate[] = monthsArray.map(monthOffset => {
            const newPaymentDate = new Date(firstPaymentDate.getFullYear(), firstPaymentDate.getMonth() + monthOffset, firstPaymentDate.getDate());
            const formattedDate = `${String(newPaymentDate.getDate()).padStart(2, '0')}/${String(newPaymentDate.getMonth() + 1).padStart(2, '0')}`;
            const monthName = newPaymentDate.toLocaleString('pt-BR', { month: 'long' });

            return {
                month: monthName,
                normalDate: newPaymentDate,
                formattedDate: formattedDate,
            };
        });

        setPaymentsDates(newPaymentsDates);
    };

    const configData = () => {

        setTotalAmount(Number(selectedAmount) * 1.1)

        configPaymentsDates()
    }

    useEffect(() => {
        if (selectedAmount) configData();
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
                                    {paymentDate.month}: {paymentDate.formattedDate}
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