import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const CardStatements = () => {
  const [hasData] = useState(false);

  const formatDate = (dateString: string): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const transactionsData = [
    {
      id: 1,
      date: "2024-03-07T13:07:27.385325Z",
      type: "sent",
      description: "mercearia do alemão",
      amount: "-100.00",
      account_number: "83227809"
    },
    {
      id: 3,
      date: "2024-03-07T13:07:46.833692Z",
      type: "sent",
      description: "Farmácia da esquina",
      amount: "-150.00",
      account_number: "83227809"
    },
  ];

  return (
    <div style={{ padding: '20px' }}> {/* Adiciona padding ao container principal */}
      <Typography variant="h4" sx={{ margin: '20px 0', textAlign: 'center' }}>Extrato do cartão: id</Typography>
      <TableContainer component={Paper} elevation={3} sx={{ marginTop: 4, marginBottom: 4, overflow: 'hidden' }}>
        {!hasData ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Local</TableCell>
                <TableCell align="right">Valor (R$)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsData.map((transaction, index) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? 'action.hover' : 'background.paper' }}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align="right" sx={{ color: transaction.amount.startsWith('-') ? 'error.main' : 'success.main' }}>
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>Não há dados para exibir.</div>
        )}
      </TableContainer>
    </div>
  );
}

export default CardStatements;
