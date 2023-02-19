import React from 'react';
import { Button, Table } from '@mui/material';
import { useEffect, useState } from 'react';

import {
    Box,
    TextField,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./index.css";
// import "./employee.css";

function Employee() {
    const [reimburseDesc, setReimburseDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [reimbursements, setReimbursements] = useState([]);

    const [selectedRows, setSelectedRows] = useState([]);

    const handleReimburseDescChange = (event) => {
        setReimburseDesc(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(parseInt(event.target.value));
    };

    const handleClick = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows(selectedRows.filter((i) => i !== index));
        } else {
            setSelectedRows([...selectedRows, index]);
        }
    };

    const navigate = useNavigate();
    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#0997AB',
            },
            neutral: {
                main: '#000000',
                contrastText: '#ff8a00',
            },
        },
    });

    async function fetch_transactions() {
        await fetch('http://localhost:3003/get_transactions', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setExpenses(data)
        })
    }

    useEffect(() => {
        fetch_transactions();
        console.log(expenses[0].id)
    }, [])

    // create json object when the button is clicked
    function saveGreenCells() {
        const greenCells = [];

        // Get all table rows
        const tableRows = document.querySelectorAll('data');

        // Iterate over the rows and check if any of the cells are green
        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const cells = row.getElementsByTagName('td');

            for (let j = 0; j < cells.length; j++) {
                const cell = cells[j];

                if (cell.style.backgroundColor === 'green') {
                    // Save the cell value to the array
                    greenCells.push(cell.textContent);
                }
            }
        }
        console.log(greenCells);
    }

    fetch_transactions();

    return (
        <ThemeProvider theme={theme}>
            <div className='employeePage'>
                <h2>Thank you for choosing Aegis Finance!</h2>
                <h5>Choose your expenses to reimburse:</h5>

                <div className="charts" >
                    <div className="column" >
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="TableCellheader">Date</TableCell>
                                        <TableCell className="TableCell-header">Company</TableCell>
                                        <TableCell className="TableCell-header">Item</TableCell>
                                        <TableCell className="TableCell-header">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(Object.values(expenses)).map((expense) => {
                                        <TableRow
                                            key={expense.created_at}
                                            onClick={() => handleClick(expense.id)}
                                            className={selectedRows.includes(expense.id) ? 'selected-row' : ''}
                                        >
                                            <TableCell className="data">{expense.created_at}</TableCell>
                                            <TableCell className="data">{expense.Payee}</TableCell>
                                            <TableCell className="data">{expense.Description}</TableCell>
                                            <TableCell className="data">{expense.Amount}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="column" >
                        <Box marginBottom={2}>
                            <TextField
                                label="Reimburse description"
                                value={reimburseDesc}
                                onChange={handleReimburseDescChange}
                                fullWidth
                            />
                        </Box>
                        <Box marginBottom={2}>
                            <TextField
                                label="Amount"
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                fullWidth
                            />
                        </Box>
                        <Button variant="contained" color="primary" onClick={saveGreenCells}>
                            Generate JSON
                        </Button>

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="TableCell-header">Date</TableCell>
                                        <TableCell className="TableCell-header">Item name</TableCell>
                                        <TableCell className="TableCell-header">Amount</TableCell>
                                        <TableCell className="TableCell-header">Progress</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reimbursements.map((reimbursement) => (
                                        <TableRow key={reimbursement.date} className={reimbursement.progress === 'pending' ? 'row-pending' : reimbursement.progress === 'reimbursed' ? 'row-reimbursed' : ''}>
                                            <TableCell>{reimbursement.date}</TableCell>
                                            <TableCell>{reimbursement.item}</TableCell>
                                            <TableCell>{reimbursement.amount}</TableCell>
                                            <TableCell>{reimbursement.progress}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}


export default Employee;

