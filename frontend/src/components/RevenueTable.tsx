import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { toCleanSubscriptionTypeFormat } from '../api/utils/formatters';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'grey',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 13,
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
    price: number,
    optionalsNames: string,
    ticketSecret: string,
    purchaseDate: string,
    expirationDate: string
) {
    return { name, email, subscriptionFor, subscriptionType, price, optionalsNames, ticketSecret, purchaseDate, expirationDate };
}

export default function RevenueTable(props: any) {

    let [rows, setRows] = useState([])

    useEffect(() => {
        let subs = props.subscriptions
        let aux : any = []
        subs.forEach((sub: any) => {
            let name = sub.userId.firstName + ' ' + sub.userId.lastName
            let email = sub.userId.email
            let subscriptionFor = sub.courseId ? sub.courseId.name : 'Gym'
            let subscriptionType = sub.type
            let price = sub.price
            let optionalsNames:any = [] 
            sub.optionals.forEach((optional : any) => optionalsNames.push(optional.name))
            let ticketSecret = sub.ticketSecret
            let purchaseDate = moment(sub.purchaseDate).format('DD/MM/YYYY')
            let expirationDate = moment(sub.expireDate).format('DD/MM/YYYY')
            aux.push(createData(name, email, subscriptionFor, subscriptionType, price, optionalsNames.toString(), ticketSecret, purchaseDate, expirationDate))
        });
        setRows(aux)
        console.log(subs)
    }, [])

    return (<>
        <Typography variant="h4" style={{fontWeight: "bold"}} gutterBottom>
            Customer Subscriptions Check
        </Typography>
        <hr />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Customer</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>

                        <StyledTableCell align="left">Subscription</StyledTableCell>
                        <StyledTableCell align="left">Type&nbsp;</StyledTableCell>

                        <StyledTableCell align="left">Price&nbsp;(€)</StyledTableCell>
                        <StyledTableCell align="left">Optionals</StyledTableCell>


                        <StyledTableCell align="left">Ticket Secret</StyledTableCell>
                        <StyledTableCell align="left">Purchase Date&nbsp;</StyledTableCell>
                        <StyledTableCell align="left">Expiration Date&nbsp;</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row : any) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.subscriptionFor}</StyledTableCell>
                            <StyledTableCell align="left">{toCleanSubscriptionTypeFormat(row.subscriptionType)}</StyledTableCell>

                            <StyledTableCell align="left">{row.price}</StyledTableCell>
                            <StyledTableCell align="left">{row.optionalsNames ? row.optionalsNames: 'none'}</StyledTableCell>


                            <StyledTableCell align="left">{row.ticketSecret}</StyledTableCell>
                            <StyledTableCell align="left">{row.purchaseDate}</StyledTableCell>
                            <StyledTableCell align="left">{row.expirationDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}
