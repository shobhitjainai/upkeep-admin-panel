import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React from "react";
import { useState } from 'react';
import Chart from 'react-apexcharts';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { CardActions, Card, CardMedia, CardContent, Typography, CardActionArea, Button, Avatar } from '@mui/material';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.divider,
    },
}));

function ExamplePage(props) {
    const { t } = useTranslation("profilePage");

    // Sample user profile data
    const userProfile = {
        "username": "Ishu",
        "email": "jainishu52@gmail.com",
        "role": "Landlord",
        "profilePicture": null,
        "phoneNumber": "9806999318",
        "gender": "male",
    };

    return (
        <Root
            header={
                <div className="p-24" style={{ paddingBottom: '10px' }}>
                    <h1 style={{ fontWeight: '900' }}>{t('Profile')}</h1>
                </div>
            }
            content={
                <Container>
                    <Card style={{ maxWidth: '400px', margin: 'auto', marginTop: "20px"}}>

                        <CardContent>
                        <Avatar style={{ width: '150px', height: '150px', margin: 'auto' }} src="assets/images/avatars/male-04.jpg" />
                        {/* <div className='flex'>
                            <div></div>
                            <div></div>
                        </div> */}
                            <Typography variant="h4" component="h2" align="center" gutterBottom sx={{paddingBottom: "10px"}}>
                             {userProfile.username}
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom sx={{paddingBottom: "10px"}}>
                                {t('Email')} : <b>{userProfile.email}</b>
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom sx={{paddingBottom: "10px"}}>
                              {t('Role')} : <b>{userProfile.role}</b>
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom sx={{paddingBottom: "10px"}}>
                                {t('Phone')} : <b>{userProfile.phoneNumber}</b>
                            </Typography>
                            <Typography variant="body1" align="center" gutterBottom sx={{paddingBottom: "10px"}}>
                               {t('Gender')} : <b>{userProfile.gender}</b>
                            </Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent: 'center' }}>
                            <Button color='success' variant="contained" size="small">{t('Edit_profile')}</Button>
                        </CardActions>
                    </Card>
                </Container>
            }
        />
    );
}

export default ExamplePage;
