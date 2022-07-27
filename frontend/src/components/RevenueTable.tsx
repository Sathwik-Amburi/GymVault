import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'grey',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    email: string,
    subscriptionFor: string,
    subscriptionType: string,
    // optionals: string,
    price: number,
    ticketSecret: string,
    purchaseDate: string,
    expirationData: string
) {
    return { name, email, subscriptionFor, subscriptionType, price, ticketSecret, purchaseDate, expirationData };
}

const rows = [
    createData('Mohamed Ghanem', "mohamedyehia@gmail.com", 'Gym', 'DAY_PASS', 55, '12345', '05-05-2021', '04-05-2022'),
    createData('Mohamed Ghanem', "mohamedyehia@gmail.com", 'Gym', 'DAY_PASS', 55, '12345', '05-05-2021', '04-05-2022'),
    createData('Mohamed Ghanem', "mohamedyehia@gmail.com", 'Gym', 'DAY_PASS', 55, '12345', '05-05-2021', '04-05-2022'),
    createData('Mohamed Ghanem', "mohamedyehia@gmail.com", 'Gym', 'DAY_PASS', 55, '12345', '05-05-2021', '04-05-2022'),
    createData('Mohamed Ghanem', "mohamedyehia@gmail.com", 'Gym', 'DAY_PASS', 55, '12345', '05-05-2021', '04-05-2022'),
];

export default function RevenueTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Customer</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>

                        <StyledTableCell align="left">Subscription</StyledTableCell>
                        <StyledTableCell align="left">Type&nbsp;</StyledTableCell>

                        <StyledTableCell align="left">Price&nbsp;</StyledTableCell>

                        <StyledTableCell align="left">Ticket Secret</StyledTableCell>
                        <StyledTableCell align="left">Purchase Date&nbsp;</StyledTableCell>
                        <StyledTableCell align="left">Expiration Date&nbsp;</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.subscriptionFor}</StyledTableCell>
                            <StyledTableCell align="left">{row.subscriptionType}</StyledTableCell>

                            <StyledTableCell align="left">{row.price}</StyledTableCell>

                            <StyledTableCell align="left">{row.ticketSecret}</StyledTableCell>
                            <StyledTableCell align="left">{row.purchaseDate}</StyledTableCell>
                            <StyledTableCell align="left">{row.expirationData}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
