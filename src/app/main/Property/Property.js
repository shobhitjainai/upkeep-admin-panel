import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  createProperty,
  getPosts,
  updateProperty,
} from "app/store/propertySlice";
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
import { deleteProperty } from "../../store/propertySlice";
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
}));

function propertyPage(props) {
  const { t } = useTranslation("propertyPage");
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.property);
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
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk";
    dispatch(getPosts(token));
  }, []);

  const handleDelete = (propertyId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk"; // Replace with your actual token
    dispatch(deleteProperty({ token, propertyId })).then((res) => {
      res.payload.success && dispatch(getPosts(token));
    });
  };

  const handleCreate = async (propertyData) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk"; // Replace with your actual token
    // console.log("Request Payload:", propertyData)
    try {
      await dispatch(createProperty({ token, propertyData }));
      // After successful creation, refresh the property list
      dispatch(getPosts(token));
      setAddDialog(false);
    } catch (error) {
      // Handle error if needed
      console.error("Error creating property:", error);
    }
  };
  const handleUpdate = (editData) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2YzdmZWE0Nzc0Zjg2YmVmNjYxMzUiLCJyb2xlIjoiTGFuZGxvcmQiLCJpYXQiOjE3MDk3MDQ1MDF9.E2lhD_3FnZP-G4j97Aq-_sVpXBfx4PQKf2LuyvuLgAk"; // Replace with your actual token
    // console.log("Request Payload:", propertyData)
    dispatch(updateProperty({ token, editData, updatepropertyId })).then(
      (res) => {
        res.payload.status && dispatch(getPosts(token));
      }
    );
    // After successful creation, refresh the property list
    //   dispatch(getPosts(token));
    setAddDialog(false);
  };

  const validationSchema = Yup.object().shape({
    property_name: Yup.string()
      .min(3, t('Minimum'))
      .required(t('Required')),
    total_rooms: Yup.number()
      .integer(t('Integer')) // Add parentheses here
      .required(t('Required')),
    price: Yup.number()
      .positive(t('Positive'))
      .required(t('Required')),
    property_capacity: Yup.number()
      .integer(t('Integer')) // Add parentheses here
      .required(t('Required')),
    address1: Yup.string().required(t('Required')),
    address2: Yup.string().required(t('Required')),
    city: Yup.string().required(t('Required')), // Add comma here
    postcode: Yup.string().required(t('Required')),
    description: Yup.string().required(t('Required')),
    state: Yup.string().required(t('Required')),
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
         
            <h1 style={{ marginLeft: '30px', fontWeight: '900'}}>{t('Property')}</h1>
           
          <IconButton  onClick={() => handleClickOpencreate(item)} style={{  marginRight: "30px" }}
                          color="success"
                          aria-label="delete" size="large">
                   <AddCircleOutlineIcon color="success" fontSize="inherit" />
</IconButton>
        </div>
      }
      content={
        <>
          <Container maxWidth="lg" style={{  marginTop: '2%'}}>
            <TableContainer
              style={{ paddingBottom: "10px", borderRadius: "8px"}}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead style={{ background: "#51AB30" }}>
                  <TableRow>
                    <TableCell align="left">{t("Property_id")}</TableCell>
                    <TableCell align="left">{t("Property_name")}</TableCell>
                    <TableCell align="left">{t("Total_rooms")}</TableCell>
                    <TableCell align="left">{t("Price")}</TableCell>
                    <TableCell align="left">{t("Property_capacity")}</TableCell>
                    <TableCell align="left">{t("Address1")}</TableCell>
                    <TableCell align="left">{t("Address2")}</TableCell>
                    <TableCell align="left">{t("City")}</TableCell>
                    <TableCell align="left">{t("Actions")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(posts).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.propertyUniqueName}</TableCell>
                      <TableCell align="left" component="th" scope="row">
                        {item.propertyname}
                      </TableCell>
                      <TableCell>{item.totalroom}</TableCell>
                      <TableCell align="left">{item.price || ""}</TableCell>
                      <TableCell align="center">
                        {item.propertycapacity}
                      </TableCell>
                      <TableCell align="left">{item.address1}</TableCell>
                      <TableCell align="left">{item.address2}</TableCell>
                      <TableCell align="left">{item.city}</TableCell>
                      <TableCell style={{ display: "flex" }} align="center">
                        {/* <Button
                          variant="contained"
                          style={{
                            backgroundColor: "#51AB30",
                            marginRight: "8px",
                          }}
                          onClick={() => handleClickOpencreate(item)}
                        >
                         <BorderColorIcon/>
                        </Button> */}
                                  <IconButton  onClick={() => handleClickOpencreate(item)}
                          color="success"
                          aria-label="delete" size="large">
  <EditIcon fontSize="inherit" />
</IconButton>
                        {/* <Button
                          variant="contained"
                          style={{ backgroundColor: "#51AB30" }}
                          // onClick={() => handleDelete(item._id)}
                          onClick={() => handleClickOpen(item._id)}
                        > */}
                         <IconButton 
                          color="success"
                          aria-label="delete" size="large" onClick={() => handleClickOpen(item._id)}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
                        {/* </Button> */}
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

            <Dialog open={addDialog} onClose={handleClose} sx={{height:"70%", top: "15%" } }>
              <Formik
                initialValues={{
                  //   property_id: editData ? editData.property_id : "",
                  property_name: editData ? editData.propertyname : "",
                  total_rooms: editData ? editData.totalroom : "",
                  price: editData ? editData.price : "",
                  property_capacity: editData ? editData.propertycapacity : "",
                  address1: editData ? editData.address1 : "",
                  address2: editData ? editData.address2 : "",
                  postcode: editData ? editData.postcode : "",
                  description: editData ? editData.description : "",
                  city: editData ? editData.city : "",
                  state: editData ? editData.state : "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  // You can modify the structure of values if needed before sending

                  const propertyData = {
                    propertyname: values.property_name,
                    totalroom: values.total_rooms,
                    price: values.price,
                    propertycapacity: values.property_capacity,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    postcode: values.postcode,
                    description: values.description,
                    state: values.state,
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
                      {editData ? t('Update_Property') : t("Create_Property")}
                    </DialogTitle>

                    <Divider variant="middle" />
                    <DialogContent>
                      <DialogContentText >
                        {/* {editData ? t('Edit') : t('Create_property')} */}
                         {t('please_enter_details')}
                      </DialogContentText >

                      
                      {/* <Field
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                name="property_id"
                                                label="Property Id"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            /> */}
                      {/* <ErrorMessage name="name" /> */}
                      <Field
                        //   autoFocus
                        margin="dense"
                        id="name"
                        name="property_name"
                        label={t("Property_name")}
                        type="text"
                        fullWidth
                        as={TextField}
                        
                      />
                      <ErrorMessage name="property_name" />
                      <Field
                        margin="dense"
                        id="name"
                        name="total_rooms"
                        label={t("Total_rooms")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="total_rooms" />
                      <Field
                        //   autoFocus
                        margin="dense"
                        id="price"
                        name="price"
                        label={t("Price")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="price" />
                      <Field
                        // autoFocus
                        margin="dense"
                        id="property capacity"
                        name="property_capacity"
                        label={t("Property_capacity")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="property_capacity" />
                      <Field
                        //   autoFocus
                        margin="dense"
                        id="address1"
                        name="address1"
                        label={t("Address1")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="address1" />
                      <Field
                        autoFocus
                        margin="dense"
                        id="address2"
                        name="address2"
                        label={t("Address2")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="address2" />
                      <Field
                        margin="dense"
                        id="city"
                        name="city"
                        label={t("City")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="city" />
                      <Field
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        label={t("Postcode")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="postcode" />
                      <Field
                        margin="dense"
                        id="description"
                        name="description"
                        label={t("Description")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="description" />
                      <Field
                        margin="dense"
                        id="state"
                        name="state"
                        label={t("State")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="state" />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}
                      variant="contained"
                      color="success">{t('Cancel')}</Button>
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
                        {editData ? t('Edit') : t('Create_property')}
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
            message={t('Successful')}
            key={vertical + horizontal}
          />
        </>
      }
    />
  );
}

export default propertyPage;
