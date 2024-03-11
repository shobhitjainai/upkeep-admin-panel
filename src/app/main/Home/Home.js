import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Container from '@mui/material/Container';
import { useState } from 'react';
import Chart from 'react-apexcharts';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
}));

export default function ExamplePage(props) {
    const { t } = useTranslation("examplePage");

    const [state] = useState({
        options: {
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['No. of Properties', 'No. of Tenant', 'No. of Landlord', 'No. of Complaints']
            },
            colors: ['#51AB30']
        },
        series: [
            {
                data: [30, 40, 25, 50]
            }
        ]
    });

    return (
        <Root
            header={
                <div className="p-24" style={{  paddingBottom: '10px'}}>
                    <h1 style={{  fontWeight: '900'}}>Home</h1>
                </div>
            }
            content={
                <div className="column" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', paddingLeft: "320px" }}>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="500"
                    />
                </div>
            }
        />
    );
}
