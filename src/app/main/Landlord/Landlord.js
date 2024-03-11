import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
}));

function ExamplePage(props) {
    const { t } = useTranslation("examplePage");
  
    // Dummy data object
    const dummyData = [
        {
            propertyname: "Property 1",
            totalroom: 10,
            price: 100000,
            propertycapacity: 20,
            address1: "Address Line 1",
            address2: "Address Line 2",
            city: "City 1"
        },
        {
            propertyname: "Property 2",
            totalroom: 15,
            price: 150000,
            propertycapacity: 30,
            address1: "Address Line 3",
            address2: "Address Line 4",
            city: "City 2"
        }
    ];

    return (
        <Root
            header={
                <div className="p-24" style={{  paddingBottom: '10px'}}>
                    <h1 style={{ marginLeft: '25px', fontWeight: '900'}}>Landlord</h1>
                </div>
            }
            content={
                <Container maxWidth="lg">
                <TableContainer style={{  paddingBottom: '10px' , borderRadius:"8px"}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{background: '#51AB30'}}>
                            <TableRow >
                                <TableCell align="left">Property Name</TableCell>
                                <TableCell align="left">Total Rooms</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Property Capacity</TableCell>
                                <TableCell align="left">Address1</TableCell>
                                <TableCell align="left">Address2</TableCell>
                                <TableCell align="left">City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left" component="th" scope="row">
                                        {item.propertyname}
                                    </TableCell>
                                    <TableCell >{item.totalroom}</TableCell>
                                    <TableCell align="left">{item.price || '-'}</TableCell>
                                    <TableCell align="center">{item.propertycapacity}</TableCell>
                                    <TableCell align="left">{item.address1}</TableCell>
                                    <TableCell align="left">{item.address2}</TableCell>
                                    <TableCell align="left">{item.city}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Container>
            }
        />
    );
}

export default ExamplePage;
