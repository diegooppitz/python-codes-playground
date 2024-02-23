import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Alert, Checkbox, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./Pix.scss"
import { AccountData } from '../../interfaces';

interface PixModalProps {
    isOpen: boolean;
    onClose: () => void;
    accountData: AccountData,
}

const PixModal: React.FC<PixModalProps> = ({ isOpen, onClose, accountData }) => {
    const [accountsData, setAccountsData] = useState<AccountData[]>([]);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [pixMessage, setPixMessage] = useState('');
    const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

    const API_URL = 'http://127.0.0.1:8000/banking/'

    const closeModal = () => {
        setAmount('');
        setErrorMessage('');
        setPixMessage('');
        setSelectedContactId(null);
        setStep(1);
        onClose();
    };

    const handleBack = () => {
        setStep(1);
        setErrorMessage('');
    };

    const getAccounts = async () => {
        try {
            const response = await fetch(`${API_URL}accounts/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Accounts request failed.');
            }

            const data: AccountData[] = await response.json();
            const filteredData = data.filter(account => account.account_id !== accountData.account_id);


            setAccountsData(filteredData);
        } catch (error) {
            console.log("accounts - error:", error)
        }
    }

    const checkPixAmount = () => {
        if (Number(amount) <= Number(accountData.balance) && Number(amount) > 0) {
            setStep(2);
            setErrorMessage('');
        } else if (Number(amount) <= Number(accountData.balance) && Number(amount) <= 0) {
            setErrorMessage('Valor inválido.');
        } else {
            setErrorMessage('Saldo insuficiente para realizar a transação.');
        }
    };

    const handleSelectContact = (id: number) => {
        setSelectedContactId(selectedContactId === id ? null : id);
    };

    const confirmPix = async () => {
        await handlePix();
        setOpenSuccessMessage(true)
        closeModal();
    };

    const handlePix = async () => {
        if (!selectedContactId) return;

        const recipientAccount = accountsData.find(contact => contact.account_id === selectedContactId)?.account_id;
        if (!recipientAccount) {
            setErrorMessage('Destinatário não encontrado.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}pix/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sender_account_id: accountData.account_id,
                    recipient_account_id: 86055763,
                    amount: amount,
                }),
            });

            if (!response.ok) {
                throw new Error('Falha na transferência PIX.');
            }

            const data = await response.json();
            console.log("pix realizado com sucesso - data:", data)
            setPixMessage('Transferência PIX realizada com sucesso.');
        } catch (error) {
            setErrorMessage('Ocorreu um erro durante a transferência PIX.');
        }
    };


    useEffect(() => {
        if (accountData?.account_id) getAccounts();
    }, [accountData])

    return (
        <>
            <Modal
                open={isOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ boxShadow: 24, p: 7 }} className="pix-modal-content">
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
                            <Typography sx={{ mt: 2 }}>Saldo disponível: R$ {Number(accountData.balance).toFixed(2)}</Typography>

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
                                {accountsData.map((contact) => (
                                    <ListItem
                                        key={contact.account_id}
                                        button
                                        onClick={() => contact.account_id !== null ? handleSelectContact(contact.account_id) : undefined}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={() => contact.account_id !== null ? handleSelectContact(contact.account_id) : undefined}
                                                checked={selectedContactId === contact.account_id}
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
            <Snackbar open={openSuccessMessage} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ width: 'auto', padding: '5px 10px', display: 'flex', alignItems: 'center' }} onClose={() => setOpenSuccessMessage(false)}>
                <Alert onClose={() => setOpenSuccessMessage(false)} severity="success" sx={{ width: '100%' }}>
                    Pix realizado com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
};

export default PixModal;
