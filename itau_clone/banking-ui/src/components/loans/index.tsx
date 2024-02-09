import React, { useState } from 'react';
import { Button, Box, Card, Chip, Divider, Stack, Typography, TextField } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import "./Loans.scss"
import LoansModal from './LoansModal';

interface LoansInfoBannerProps {
  title: string;
}

interface LoansInfoProps {
  hireService: () => void;
  setSelectedAmount: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMonths: React.Dispatch<React.SetStateAction<number>>;
  selectedMonths: number;
}

const LoansInfoBanner: React.FC<LoansInfoBannerProps> = ({ title }) => {
  return (
    <div className='loans-info-banner'>
      <MonetizationOnIcon />
      <p>{title}</p>
    </div>
  );
};

const LoansInfo: React.FC<LoansInfoProps> = ({ hireService, setSelectedAmount, setSelectedMonths, selectedMonths }) => {
  type MonthSelection = 6 | 12 | 18;

  const handleSelectMonths = (months: MonthSelection) => {
    setSelectedMonths(months);
  };

  return (
    <Card className='loans-info' variant="outlined">
      <Box sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Valor disponível
          </Typography>
          <Typography gutterBottom variant="h6" component="div" color="green">
            R$ 4000
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          Crédito fácil e rápido! Condições especiais para você: juros competitivos e até 48 meses para pagar. Solicite agora seu empréstimo pessoal!
        </Typography>
      </Box>
      <Divider />

      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Box>
            <Typography gutterBottom variant="body2" sx={{ mb: 1 }}> Digite o valor total</Typography>

            <TextField className='loans-info-input' label="Digite o valor" variant="filled" onChange={(event) => setSelectedAmount(event.target.value)} />
          </Box>

          <Box>
            <Typography gutterBottom variant="body2" sx={{ mb: 1 }}>
              Selecione o número de parcelas
            </Typography>
            <Stack direction="row" spacing={1} >
              <Chip
                color={selectedMonths === 6 ? "primary" : "default"}
                label="6 meses"
                size="medium"
                onClick={() => handleSelectMonths(6)}
                clickable
              />
              <Chip
                color={selectedMonths === 12 ? "primary" : "default"}
                label="12 meses"
                size="medium"
                onClick={() => handleSelectMonths(12)}
                clickable
              />
              <Chip
                color={selectedMonths === 18 ? "primary" : "default"}
                label="18 meses"
                size="medium"
                onClick={() => handleSelectMonths(18)}
                clickable
              />
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ mt: 5 }}>
          <Button onClick={() => hireService()} className="loans-info-button" variant="contained">Contratar</Button>
        </Box>
      </Box>
    </Card>
  );
}

const Loans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(6);
  const [selectedAmount, setSelectedAmount] = useState('');

  const hireService = () => {
    setIsModalOpen(true);
  }

  console.log("selected amount", selectedAmount)

  return (
    <div className='loans'>
      <LoansInfoBanner title="Até 90 dias para começar a pagar! Confira disponibilidade. Sujeito à análise." />
      <LoansInfo hireService={hireService} setSelectedAmount={setSelectedAmount} setSelectedMonths={setSelectedMonths} selectedMonths={selectedMonths} />
      <LoansModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedAmount={selectedAmount} selectedMonths={selectedMonths} />
    </div>
  );
};

export default Loans;