import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import {
  CardActions,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { getprofile, updateProfile } from "app/store/profileSlice";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ExamplePage(props) {
  const { t } = useTranslation("profilePage");
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [updaterepairerId, setUpdaterepairerId] = useState(null);
  const [editProfile, setEditProfile] = useState(true);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { profile } = useSelector((state) => state.profile);

  // Sample user profile data
  const userProfile = {
    username: "Ishu",
    email: "jainishu52@gmail.com",
    role: "Admin",
    profilePicture: null,
    phoneNumber: "9806999318",
    gender: "male",
  };

  useEffect(() => {
    dispatch(getprofile());
  }, []);

  // Open update profile dialog
  const handleClickOpenUpdate = (data = null) => {
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
    setAddDialog(true);
    setEditProfile(true);
    setUpdaterepairerId(data._id);
  };

  // Close dialog
  const handleClose = () => {
    setAddDialog(false);
    setEditData(null);
  };

  // Calling the update profile API
  const handleUpdateProfile = (editData) => {
    dispatch(updateProfile({ editData, updaterepairerId })).then((res) => {
      console.log(res);
      res.payload.success && dispatch(getprofile());
    });
    // After successful creation, refresh the property list

    setAddDialog(false);
    setEditProfile(true);
  };

  const handleUpdatePassword = () => {
    setEditProfile(false);
    setAddDialog(true);
  };

  const handleClickShowOldPassword = () => {
    setOldShowPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string().min(3, t("Minimum")).required(t("Required")),
    phoneNumber: Yup.number()
      .positive(t("Positive"))
      .required(t("Required"))
      .test('len', t('Phone Number should be in 10 digits'), val => val && val.toString().length === 10),
    email: Yup.string().email('You must enter a valid email').required(t("Required")),
    // typeOfRepairers: Yup.string().required(t("Required")),
  });

  return (
    <Root
      // header={
      //   <div className="p-24" style={{ paddingBottom: "10px" }}>
      //     <h1 style={{ fontWeight: "900" }}>{t("Profile")}</h1>
      //   </div>
      // }
      content={
        <Container>
          <Card
            style={{
              maxWidth: "400px",
              margin: "auto",
              marginTop: "20px",
              borderRadius: "0px",
            }}
          >
            <CardContent sx={{ paddingBottom: "10px" }}>
              <Grid item sm={12} display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={55} borderBottom={'1px solid gray'} marginBottom={2}>
                <Typography sx={{
                  color: '#041527',
                  fontWeight: 'bold',
                  fontSize: "22px"
                }}>{t('Profile')}</Typography>
              </Grid>
              <Avatar
                style={{ width: "150px", height: "150px", margin: "auto" }}
                src={profile.profilePicture}
              />

              <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
              >
                {profile.username}
              </Typography>

              <Divider variant="middle" className="mx-5" />

              <Grid className="flex w-full justify-center items-center mx-5 mt-10 gap-20">
                <Grid className="flex flex-col  items-start pb-5">
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("Email")}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("Role")}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("Phone")}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("Gender")}
                  </Typography>
                </Grid>
                <Grid className="flex  flex-col items-start pb-5">
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.email}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.role}
                  </Typography>

                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.phoneNumber}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    gutterBottom
                    sx={{ paddingBottom: "10px" }}
                  >
                    {profile.gender}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions
              style={{ justifyContent: "center", paddingBottom: "20px" }}
            >
              <Button
                color="success"
                variant="contained"
                size="small"
                sx={{ borderRadius: "2px" }}
                onClick={() => handleClickOpenUpdate(profile)}
              >
                {t("Edit_profile")}
              </Button>

              <Button
                color="success"
                variant="contained"
                size="small"
                sx={{ borderRadius: "2px" }}
                onClick={() => handleUpdatePassword(profile)}
              >
                {t("Change_Password")}
              </Button>
            </CardActions>
          </Card>

          {/* update profile dialog */}
          <Dialog
            open={addDialog}
            onClose={handleClose}
            sx={{ height: "70%", top: "15%", borderRadius: 0 }}
          >
            <Formik
              initialValues={{
                // username: editData ? editData.username : "",
                email: editData ? editData.email : "",
                phoneNumber: editData ? editData.phoneNumber : "",
                // gender: editData ? editData.gender : "",
                // oldPassword: editData ? editData.oldPassword : "",
                // newPassword: editData ? editData.newPassword : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // You can modify the structure of values if needed before sending

                const propertyData = {
                  //   username: values.username,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  
                };

                const editPassword = {
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,

                  // oldPassword: values.oldPassword,
                  // newPassword: values.newPassword,
                };
                if (editProfile) {
                  handleUpdateProfile(propertyData);
                } else if (editPassword) {
                  handleUpdateProfile(editPassword);
                }
                setSubmitting(false);
              }}
            >
              {(formik) => {
                return <Form>
                  <DialogTitle>
                    {editProfile ? t("Edit_profile") : t("Change_Password")}
                  </DialogTitle>
                  <Divider variant="middle" />
                  <DialogContent sx={{ paddingBottom: '0px' }}>
                    {editProfile ? (
                      <>
                        <TextField
                          required
                          disabled
                          id="filled-disabled"
                          label={t("USER_NAME")}
                          defaultValue={editData ? editData.username : ""}
                          variant="filled"
                          sx={{ paddingBottom: "15px" }}
                          fullWidth
                        />
                        <TextField
                          required
                          disabled
                          id="filled-disabled"
                          label={t("Role")}
                          defaultValue={editData ? editData.role : ""}
                          variant="filled"
                          sx={{ paddingBottom: "15px" }}
                          fullWidth
                        />
                        <TextField
                          name='email'
                          varient='contained'
                          type='email'
                          label={t("Email")}
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email}
                          sx={{ paddingBottom: "15px" }}
                          fullWidth
                          required
                        />
                        <TextField
                          name='phoneNumber'
                          varient='contained'
                          type='number'
                          label={t("CONTACT")}
                          value={formik.values.phoneNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                          sx={{ paddingBottom: "15px" }}
                          fullWidth
                          required
                        />
                      </>
                    ) : (
                      <>
                        <Field
                          // autoFocus
                          margin="dense"
                          id="oldPassword"
                          name="oldPassword"
                          label={t("OLD_PASSWORD")}
                          type={showOldPassword ? "text" : "password"}
                          sx={{ position: "relative", paddingBottom: "10px" }}
                          
                          fullWidth
                          as={TextField}
                        />
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                          sx={{
                            position: "absolute",
                            right: "45px",
                            paddingTop: "22px",
                          }}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>

                        <Field
                          // autoFocus
                          margin="dense"
                          id="newPassword"
                          name="newPassword"
                          label={t("NEW_PASSWORD")}
                          type={showNewPassword ? "text" : "password"}
                          fullWidth
                          
                          as={TextField}
                        />
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          sx={{
                            position: "absolute",
                            right: "45px",
                            paddingTop: "22px",
                          }}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions sx={{ paddingBottom: '10px' }}>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      color="success"
                      sx={{ borderRadius: '2px' }}
                    >
                      {t("CANCEL")}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      sx={{ borderRadius: '2px' }}
                      disabled={formik?.isSubmitting} >
                      {t("Edit")}
                    </Button>
                  </DialogActions>
                </Form>
              }
              }
            </Formik>
          </Dialog>
          
        </Container>
      }
    />
  );
}

export default ExamplePage;
