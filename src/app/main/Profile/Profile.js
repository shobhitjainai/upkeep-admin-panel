import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import {
  CardActions,
  Card,
  CardContent,
  Typography,
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
  DialogTitle,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { showMessage } from "app/store/fuse/messageSlice";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function ProfilePage(props) {
  const { t } = useTranslation("profilePage");
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [updaterepairerId, setUpdaterepairerId] = useState(null);
  const [editProfile, setEditProfile] = useState(true);
  const [showOldPassword, setOldShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [updatePasswordDialog, setUpdatePasswordDialog] = useState(false)

  const { profile } = useSelector((state) => state.profile);

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
    setUpdatePasswordDialog(false)
  };

  // Calling the update profile API
  const handleUpdateProfile = (editData) => {
    dispatch(updateProfile({ editData, updaterepairerId })).then((res) => {
      console.log(res)
      if (res.payload.success) {
        res.payload.success && dispatch(getprofile());
        dispatch(showMessage({ message: res.payload.message, variant: 'success' }));

        setUpdatePasswordDialog(false);
        handleClose()
      } else {
        dispatch(showMessage({ message: res.payload.message, variant: 'error' }));
      }
    });

  };

  const handleUpdatePassword = () => {
    setEditProfile(false);
    setUpdatePasswordDialog(true);
  };

  const handleClickShowOldPassword = () => {
    setOldShowPassword(!showOldPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .positive(t("Positive"))
      .required(t("Required"))
      .test('len', t('PHONE_VALIDATION'), val => val && val.toString().length === 10),
    email: Yup.string().email('EMAIL_VALIDATION').required(t("Required")),

  });
  return (
    <Root
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
                email: editData ? editData.email : "",
                phoneNumber: editData ? editData.phoneNumber : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {

                const propertyData = {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                };

                const editPassword = {
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                };
                handleUpdateProfile(propertyData);
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

          {/* update password dialog */}
          <Dialog
            open={updatePasswordDialog}
            onClose={handleClose}
            sx={{ height: "70%", top: "15%", borderRadius: 0 }}
          >
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const editPassword = {
                  oldPassword: values.oldPassword,
                  newPassword: values.newPassword,
                };
                handleUpdateProfile(editPassword);

                setSubmitting(false);
              }}
            >
              {(formik) => {
                return <Form>
                  <DialogTitle>
                    {t("Change_Password")}
                  </DialogTitle>
                  <Divider variant="middle" />
                  <DialogContent sx={{ paddingBottom: '0px' }}>

                    <TextField
                      // autoFocus
                      required
                      id="oldPassword"
                      onChange={formik.handleChange}
                      label={t("OLD_PASSWORD")}
                      type={showOldPassword ? "text" : "password"}
                      sx={{ position: "relative", paddingBottom: "10px" }}
                      fullWidth
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      sx={{
                        position: "absolute",
                        right: "45px",
                        paddingTop: "18px",

                      }}
                      edge="end"
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    <TextField
                      // autoFocus
                      required
                      id="newPassword"

                      onChange={formik.handleChange}
                      label={t("NEW_PASSWORD")}
                      type={showNewPassword ? "text" : "password"}
                      sx={{ position: "relative", paddingBottom: "10px" }}
                      fullWidth
                    />
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowNewPassword}
                      sx={{
                        position: "absolute",
                        right: "45px",
                        paddingTop: "18px",
                      }}
                      edge="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>

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




export default ProfilePage;