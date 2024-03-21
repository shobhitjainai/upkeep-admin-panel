import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  createProperty,
  getadminLandlords,
  updateProperty,
  deleteProperty,
} from "app/store/admin/adminLandlordSlice";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const access_token = localStorage.getItem("jwt_access_token");

console.log(access_token)
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function adminLandlordPage(props) {
  const { t } = useTranslation("propertyPage");
  const dispatch = useDispatch();
  // const { adminLandlords, loading } = useSelector((state) => state.property.adminlandlord);
  const {adminLandlords,loading }= useSelector((state) => state.admin.adminLandlord);
  console.log(adminLandlords)
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [updatepropertyId, setUpdatePropertyId] = useState(null);

  const [snackbarstate, setsnackbarState] = useState({
    opensnackbar: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, opensnackbar } = snackbarstate;

  const handleClicksnackbar = (newState) => () => {
    setsnackbarState({ ...newState, opensnackbar: true });
  };

  const handleClosesnackbar = () => {
    setsnackbarState({ ...snackbarstate, opensnackbar: false });
  };

  const handleClickOpen = (propertyId) => {
    setOpen(true);
    setSelectedPropertyId(propertyId);
  };
  const handleClickOpencreate = (data = null) => {
    if (data) {
      setEditData(data);
      console.log(data);
      console.log(editData);
    } else {
      setEditData(null);
    }
    setAddDialog(true);
    setUpdatePropertyId(data._id);
  };
  const handleClose = () => {
    setAddDialog(false);
    // handleClicksnackbar({ vertical: 'top', horizontal: 'center' });
    setEditData(null);
  };
  const onDelete = () => {
    handleDelete(selectedPropertyId);
    handleClicksnackbar();

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getadminLandlords(access_token));
  }, []);

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty({ access_token, propertyId })).then((res) => {
      res.payload.success && dispatch(getadminLandlords(access_token));
    });
  };

  const handleCreate = async (propertyData) => {
    // console.log("Request Payload:", propertyData)
    try {
      await dispatch(createProperty({ access_token, propertyData }));
      // After successful creation, refresh the property list
      dispatch(getadminLandlords(access_token));
      setAddDialog(false);
    } catch (error) {
      // Handle error if needed
      console.error("Error creating property:", error);
    }
  };
  const handleUpdate = (editData) => {
    // console.log("Request Payload:", propertyData)
    dispatch(updateProperty({ access_token, editData, updatepropertyId })).then(
      (res) => {
        res.payload.success && dispatch(getadminLandlords(access_token));
      }
    );
    // After successful creation, refresh the property list
    //   dispatch(getadminLandlords(access_token));
    setAddDialog(false);
  };
  // console.log(adminLandlords,'data is')
  const validationSchema = Yup.object().shape({
    // property_name: Yup.string().min(3, t("Minimum")).required(t("Required")),
    // total_rooms: Yup.number()
    //   .integer(t("Integer")) // Add parentheses here
    //   .required(t("Required")),
    // price: Yup.number().positive(t("Positive")).required(t("Required")),
    // property_capacity: Yup.number()
    //   .integer(t("Integer")) // Add parentheses here
    //   .required(t("Required")),
    // address1: Yup.string().required(t("Required")),
    // address2: Yup.string().required(t("Required")),
    // city: Yup.string().required(t("Required")), // Add comma here
    // postcode: Yup.string().required(t("Required")),
    // description: Yup.string().required(t("Required")),
    // state: Yup.string().required(t("Required")),
  });

  return (
    <Root
      header={
        <div
          className="p-24"
          style={{
            paddingBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginLeft: "30px", fontWeight: "900" }}>
            {t("Landlords")}
          </h1>

{/*           
          <IconButton
            onClick={() => handleClickOpencreate(item)}
            style={{ marginRight: "30px" }}
            color="success"
            aria-label="delete"
            size="large"
          >
            <AddCircleOutlineIcon color="success" fontSize="inherit" />
          </IconButton> */}
        </div>
      }
      content={
        <>
          <Container maxWidth="lg" style={{ marginTop: "2%" }}>
            <TableContainer
              style={{ paddingBottom: "10px", borderRadius: "5px" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: "#51AB30" }}>
                  <TableRow>
                    <TableCell align="center">{t("S_no")}</TableCell>
                    <TableCell align="center">{t("User_name")}</TableCell>
                    <TableCell align="center">{t("email")}</TableCell>
                    <TableCell align="center">{t("social_Type")}</TableCell>
                    <TableCell align="center">{t("phoneNumber")}</TableCell>
                    <TableCell align="center">{t("gender")}</TableCell>
                    <TableCell align="center">{t("profilePicture")}</TableCell>
                    <TableCell align="center">{t("Actions")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminLandlords?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {item.username || "null"}
                      </TableCell>
                      <TableCell align="center">
                        {item.email || "null"}
                      </TableCell>
                      {/* <TableCell align="left" component="th" scope="row">
                        {item.status}
                      </TableCell> */}
                      <TableCell align="center">
                        {item.socialType || "null"}
                      </TableCell>
                      <TableCell align="center">
                        {item.phoneNumber || ""}
                      </TableCell>
                      <TableCell align="center">
                        {item.gender || "null"}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() =>
                            window.open(item.profilePicture || "null", "_blank")
                          }
                          style={{
                            color: "green",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell style={{ display: "flex" }} align="center">
                        <IconButton
                          onClick={() => handleClickOpencreate(item)}
                          color="success"
                          aria-label="delete"
                          size="large"
                        >
                          <EditIcon fontSize="inherit" />
                        </IconButton>

                        <IconButton
                          color="success"
                          aria-label="delete"
                          size="large"
                          onClick={() => handleClickOpen(item._id)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>{t("Delete")}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {t("Delete_dialog_permission")}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>{t("Cancel")}</Button>
                <Button onClick={onDelete} autoFocus>
                  {t("Delete")}
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={addDialog}
              onClose={handleClose}
              sx={{ height: "70%", top: "15%" }}
            >
              <Formik
                initialValues={{  
                  username: editData ? editData.username : "",
                  socialType: editData ? editData.socialType : "",
                  phoneNumber: editData ? editData.phoneNumber : "",
                  gender: editData ? editData.gender : "",
                  email: editData ? editData.email : "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
              

                  const propertyData = {
                    username: values.username,
                    socialType: values.socialType,
                    phoneNumber: values.phoneNumber,
                    gender: values.gender,
                    email: values.email,
      
                  };
                  if (editData) {
                    // await dispatch(updateUser({ ...editData, ...values }));
                    handleUpdate(propertyData);
                  } else {
                    handleCreate(propertyData);
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <DialogTitle>
                     {t("Update_Landlord") }
                    </DialogTitle>

                    <Divider variant="middle" />
                    <DialogContent>
                      <DialogContentText>
                      TO, { t('Update_Landlord') }
                        {t("please_enter_details")}
                      </DialogContentText>
                      <Field
                        //   autoFocus
                        margin="dense"
                        id="username"
                        name="username"
                        label={t("username")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="username" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="socialType"
                        name="socialType"
                        label={t("socialType")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                       <ErrorMessage name="socialType" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label={t("email")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="email" />
                     
                      <Field
                        //   autoFocus
                        margin="dense"
                        id="phoneNumber"
                        name="phoneNumber"
                        label={t("phoneNumber")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="phoneNumber" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="gender"
                        name="gender"
                        label={t("gender")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="gender" />
                      
                    </DialogContent>

                    <DialogActions>
                      <Button
                        onClick={handleClose}
                        variant="contained"
                        color="success"
                      >
                        {t("Cancel")}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={isSubmitting}
                        onClick={handleClicksnackbar({
                          vertical: "top",
                          horizontal: "center",
                        })}
                      >
                        {editData ? t("Edit") : t("Create_property")}
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>
            
          </Container>

          <Snackbar
            sx={{ marginTop: "60px" }}
            anchorOrigin={{ vertical, horizontal }}
            open={opensnackbar}
            onClose={handleClosesnackbar}
            autoHideDuration={2000}
            message={t("Successful")}
            key={vertical + horizontal}
          />
        </>
      }
    />
  );
}

export default adminLandlordPage;