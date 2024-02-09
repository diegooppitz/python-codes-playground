import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface LoansModalProps {
    setIsModalOpen: (value: boolean) => void;
    isModalOpen: boolean;
    selectedAmount: string;
    selectedMonths: number;
}

const LoansModal: React.FC<LoansModalProps> = ({ isModalOpen, setIsModalOpen, selectedAmount, selectedMonths }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(true);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        console.log("aqui", Number(selectedAmount) * 1.1)
        if (selectedAmount) setTotalAmount(selectedAmount => Number(selectedAmount) * 1.1)
    }, [selectedAmount])

    useEffect(() => {
        if (totalAmount > 0) setLoading(false);
    }, [totalAmount])

    return (
        <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                {!loading && (
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ pb: 5 }}>
                            Conclua a solicitação de empréstimo
                        </Typography>

                        <Typography id="modal-modal-title" variant="h4" component="h4" sx={{ pb: 5 }}>
                            Valor total: {totalAmount}
                        </Typography>

                        <Button className="loans-info-button" variant="contained" sx={{ float: 'right' }}>Confirmar</Button>
                    </Box>
                )}
            </Box>
        </Modal>
    )
}

export default LoansModal;