import React from 'react';
import { Button, Table } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
import "./employee.css";

function Employee() {
    const [reimburseDesc, setReimburseDesc] = useState('');
    const [amount, setAmount] = useState(0);
    const [expenses, setExpenses] = useState(null);
    const [reimbursements, setReimbursements] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [key, setKey] = useState(" ");
    const [index, setIndex] = useState([]);

    const handleReimburseDescChange = (event) => {
        setReimburseDesc(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(parseInt(event.target.value));
    };

    const handleClick = (transaction) => {
        if (!selectedRows.includes(transaction)) {
            selectedRows.push(transaction);
            setAmount(amount + transaction.Amount);
            const newIndex = [...index]
            newIndex[transaction.id - 1] = 1;
            setIndex(newIndex);
            console.log(selectedRows);
        } else {
            let newarr = [...selectedRows];
            let indexTo = 0;
            for (let i = 0; i < selectedRows.length; i++) {
                if (selectedRows[i].id === transaction.id) {
                    indexTo = i;
                }
            }
            const newIndex = [...index]
            newIndex[transaction.id - 1] = 0;
            setIndex(newIndex);
            newarr.splice(indexTo, 1);
            setAmount(amount - transaction.Amount);
            setSelectedRows(newarr);
            console.log(selectedRows);
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
            setExpenses(Object.values(data))
            const arr = new Array(data.length).fill(0);
            setIndex(arr);
        })

    }

    async function fetch_reimbursements() {
        await fetch('http://localhost:3003/get_reimbursements', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setReimbursements(Object.values(data))
        })
    }

    useEffect(() => {
        fetch_transactions();
        fetch_reimbursements();
    }, [])

    function aggregateTotal() {
        let total = 0;

        for (let i = 0; i < selectedRows.length; i++) {
            total += selectedRows[i].Amount;
        }

        setAmount(total);
    }

    async function submitData() {
        await fetch('http://localhost:3003/add_reimbursement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            body: JSON.stringify(
                {
                    Description: reimburseDesc,
                    Amount: amount,
                    Progress: "Pending",
                }
            )
        }
        ).then(() => {
            setKey("Deploying on-chain! Public Key: 0x7c125C1d515b8945841b3d5144a060115C58725F");
            setAmount(0);
            setSelectedRows([]);
            const arr = new Array(expenses.length).fill(0);
            setIndex(arr);
        })
    }

    useEffect(() => {
        fetch_reimbursements();
    }, [amount])

    if (!expenses) {
        return (
            <div>
                <h4>Loading Transactions, Please Wait...</h4>
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='employeePage'>
                <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Return Home</Button>
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
                                    {expenses.map((expense) => (
                                        <TableRow
                                            key={expense.created_at}
                                            onClick={() => handleClick(expense)}
                                            style = {{backgroundColor: index[expense.id - 1] === 0 ? "#FFFFFF" : "#97FDD5"}}
                                        >
                                            <TableCell className="data">{expense.created_at ? expense.created_at : 'N/A'}</TableCell>
                                            <TableCell className="data">{expense.Payee}</TableCell>
                                            <TableCell className="data">{expense.Description}</TableCell>
                                            <TableCell className="data">{expense.Amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <br/>
                    <br/>
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
                        <Button variant="contained" color="primary" onClick={() => submitData()}>
                            Submit Request
                        </Button>
                        <p>{key}</p>
                        <br />
                        <br />
                        <h3>Current Reimbursements</h3>
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
                                        <TableRow key={reimbursement.created_at} className={reimbursement.progress === 'pending' ? 'row-pending' : reimbursement.progress === 'reimbursed' ? 'row-reimbursed' : ''}>
                                            <TableCell>{reimbursement.created_at}</TableCell>
                                            <TableCell>{reimbursement.Description}</TableCell>
                                            <TableCell>{reimbursement.Amount}</TableCell>
                                            <TableCell>{reimbursement.Progress}</TableCell>
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

