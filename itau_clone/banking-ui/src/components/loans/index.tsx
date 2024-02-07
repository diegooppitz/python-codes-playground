import React, { useState } from 'react';
import { Button, Box, Card, Chip, Divider, Stack, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import "./Loans.scss"

interface LoansItemProps {
    title: string;
}

const LoansInfoBanner: React.FC<LoansItemProps> = ({ title }) => {
    return (
        <div className='loans-info-banner'>
            <MonetizationOnIcon />
            <p>{title}</p>
        </div>
    );
};

const LoansInfo = () => {
    type MonthSelection = 6 | 12 | 18;
    const [selectedMonths, setSelectedMonths] = useState(6);

    const handleSelectMonths = (months: MonthSelection) => {
        setSelectedMonths(months);
    };

    const hireService = () => {
        
    }

    return (
      <Card className='loans-info' variant="outlined">
        <Box sx={{ p: 2 }}>
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
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Selecione o número de parcelas
          </Typography>
          <Stack direction="row" spacing={1}>
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
                <Button onClick={() => hireService()} className="loans-info-button" variant="contained">Contratar</Button>
        </Box>
      </Card>
    );
  }

const Loans: React.FC = () => {
    return (
        <div className='loans'>
            <LoansInfoBanner title="Até 90 dias para começar a pagar! Confira disponibilidade. Sujeito à análise." />
            <LoansInfo />
        </div>
    );
};

export default Loans;