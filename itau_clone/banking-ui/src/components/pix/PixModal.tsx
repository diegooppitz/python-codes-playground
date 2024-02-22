import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Alert, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./Pix.scss"

// Mock data
const contacts = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
];

interface PixModalProps {
    isOpen: boolean;
    onClose: () => void;
    userBalance: number | null;
}

const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, userBalance }) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBack = () => {
        setStep(1);
        setErrorMessage('');
    };

    const checkPixAmount = () => {
        if (Number(amount) <= Number(userBalance)) {
            setStep(2);
            setErrorMessage('');
        } else {
            setErrorMessage('Saldo insuficiente para realizar a transação.');
        }
    };

    const handleSelectContact = (id: number) => {
        setSelectedContactId(selectedContactId === id ? null : id);
    };

    const confirmPix = () => {
        console.log('PIX confirmado para o contato ID:', selectedContactId, 'com o valor:', amount);
        closeModal();
    };

    const closeModal = () => {
        setStep(1);
        setAmount('');
        setSelectedContactId(null);
        setErrorMessage('');
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{boxShadow: 24, p: 7 }} className="pix-modal-content">
                <IconButton
                    aria-label="close"
                    onClick={closeModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {step === 1 ? (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Enviar PIX
                        </Typography>
                        <Typography id="modal-modal-description" variant='body2' sx={{ mt: 1, mb: 3, color: '#0009' }}>
                            Use PIX para transferir valores instantaneamente.
                        </Typography>
                        <Typography sx={{ mt: 2 }}>Saldo disponível: R$ {Number(userBalance).toFixed(2)}</Typography>

                        {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

                        <TextField
                            label="Valor a enviar"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            sx={{ 
                                mt: 2,
                                '& input[type=number]': {
                                    '-moz-appearance': 'textfield', /* Firefox */
                                    '&::-webkit-outer-spin-button': {
                                        '-webkit-appearance': 'none',
                                        margin: 0,
                                    },
                                    '&::-webkit-inner-spin-button': {
                                        '-webkit-appearance': 'none',
                                        margin: 0,
                                    },
                                },
                             }}
                        />
                        <Button
                            variant="contained"
                            onClick={checkPixAmount}
                            sx={{ mt: 2 }}
                        >
                            Continuar
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Selecione o destinatário
                        </Typography>
                        <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                            {contacts.map((contact) => (
                                <ListItem 
                                    key={contact.id} 
                                    button 
                                    onClick={() => handleSelectContact(contact.id)}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={() => handleSelectContact(contact.id)}
                                            checked={selectedContactId === contact.id}
                                        />
                                    }
                                >
                                    <ListItemText primary={contact.name} />
                                </ListItem>
                            ))}
                        </List>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                onClick={handleBack}
                            >
                                Voltar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={confirmPix}
                                disabled={!selectedContactId}
                            >
                                Confirmar PIX
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default PixModal;
