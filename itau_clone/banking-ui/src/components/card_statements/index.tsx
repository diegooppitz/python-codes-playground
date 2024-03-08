import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface Statement {
  id: number;
  date: string;
  type: string;
  description: string;
  amount: string;
  account_number?: string;
}

const CardStatements = () => {
  const [hasData] = useState(false);
  const [statements, setStatements] = useState<Statement[]>([]);
  let { cardNumber } = useParams();
  console.log("user id", cardNumber)

  const API_URL = 'http://127.0.0.1:8000/banking/'

  const formatDate = (dateString: string): string | null => {
    if (!dateString) return null;
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchData = () => {
    fetch(`${API_URL}credit-cards/statements/${cardNumber}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setStatements(data))
      .catch(error => console.error("There was a problem with your fetch operation:", error));
  }

  useEffect(() => {
    if (cardNumber) fetchData();
  }, [cardNumber])

  return (
    <div className='credit-card-statements'>
      <Typography variant="h4" sx={{ margin: '20px 0', textAlign: 'center' }}>Extrato do cartão: {cardNumber}</Typography>
        {!hasData ? (
          <TableContainer component={Paper} elevation={3} sx={{ marginTop: 1, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Local</TableCell>
                <TableCell align="right">Valor (R$)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statements.map((statement, index) => (
                <TableRow
                  key={statement.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: index % 2 === 0 ? 'action.hover' : 'background.paper' }}
                >
                  <TableCell component="th" scope="row">
                    {formatDate(statement.date)}
                  </TableCell>
                  <TableCell>{statement.description}</TableCell>
                  <TableCell align="right" sx={{ color: statement.amount.startsWith('-') ? 'error.main' : 'success.main' }}>
                    {statement.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        ) : (
          <div className='statements-no-data'>Não há dados para exibir.</div>
        )}
    </div>
  );
}

export default CardStatements;
