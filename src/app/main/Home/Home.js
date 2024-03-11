import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
    const { t } = useTranslation("homePage");

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
                    <h1 style={{  fontWeight: '900'}}> {t('Home')}</h1>
                </div>
            }
            content={
                <>                <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
                <div className="column" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', paddingLeft: "320px" }}>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="500"
                    />
                </div>
                </>

            }

        />
    );
}
