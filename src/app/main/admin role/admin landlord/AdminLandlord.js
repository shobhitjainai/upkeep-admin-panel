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
  TablePagination,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FuseLoading from "@fuse/core/FuseLoading";

const access_token = localStorage.getItem("jwt_access_token");

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
  const { adminLandlords, loading } = useSelector((state) => state.admin.adminLandlord);
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [updatepropertyId, setUpdatePropertyId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbarstate, setsnackbarState] = useState({
    opensnackbar: false,
    vertical: "top",
    horizontal: "center",
  });

const [search, setSearch] = useState(adminLandlords);

const Filter = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  setSearch(adminLandlords.filter(item =>
    item.username.toLowerCase().includes(searchTerm) ||
    item.email.toLowerCase().includes(searchTerm) ||
    item.phoneNumber.toLowerCase().includes(searchTerm)
  ));
};

  const { vertical, horizontal, opensnackbar } = snackbarstate;

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

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
    } else {
      setEditData(null);
    }
    setAddDialog(true);
    setUpdatePropertyId(data ? data._id : null);
  };

  const handleClose = () => {
    setAddDialog(false);
    setEditData(null);
  };

  const onDelete = () => {
    handleDelete(selectedPropertyId);
    handleClicksnackbar();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getadminLandlords()).then((response) => {
      setSearch(response?.payload);
    });
  }, [dispatch]);

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty({ access_token, propertyId })).then((res) => {
      res.payload.success && dispatch(getadminLandlords(access_token));
    });
  };

  const handleCreate = async (propertyData) => {
    try {
      await dispatch(createProperty({ access_token, propertyData }));
      dispatch(getadminLandlords(access_token));
      setAddDialog(false);
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleUpdate = (propertyData) => {
    dispatch(updateProperty({ access_token, propertyData, updatepropertyId })).then((res) => {
      res.payload.success && dispatch(getadminLandlords(access_token));
    });
    setAddDialog(false);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, t("Minimum")).required(t("Required")),
    phoneNumber: Yup.number().positive(t("Positive")).required(t("Required")),
    gender: Yup.string().required(t("Required")),
    email: Yup.string().required(t("Required")),
  });

  return (
    <Root
      header={
        <div className="p-24" style={{ paddingBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ marginLeft: "30px", fontWeight: "900" }}>{t("Landlord")}</h1>
          <TextField
            sx={{ marginRight: "130px" }}
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            color="success"
            onChange={Filter}
          />
        </div>
      }
      content={
        <>
        
          {loading ? <FuseLoading /> : (
            <Container maxWidth="xl" style={{ marginTop: "2%", marginLeft: "30px" }}>
              <TableContainer
                sx={{ borderRadius: "2px", borderBottom: "", width: "90%" }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "#51AB30" }}>
                      <TableCell align="center" sx={{ color: "#F2F5E9" }}>{t("S_no")}</TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>{t("User_name")}</TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>{t("Email")}</TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>{t("social_Type")}</TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>{t("phoneNumber")}</TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>{t("gender")}</TableCell>
                      <TableCell align="center" sx={{ color: "#F2F5E9" }}>{t("profilePicture")}</TableCell>
                      <TableCell align="center" sx={{ color: "#F2F5E9" }}>{t("Actions")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {search.map((item, index) => (
                      <TableRow key={index} className="transition-colors duration-200 ease-in-out hover:bg-gray-100"
                        sx={{
                          "td, th, thead, trow": {
                            borderBottom: "0.5px solid lightgray",
                          },
                        }}
                      >
                        <TableCell className="py-3" align="center">{index + 1}</TableCell>
                        <TableCell className="py-3" align="left">{item.username || "null"}</TableCell>
                        <TableCell className="py-3" align="left">{item.email || "null"}</TableCell>
                        <TableCell className="py-3" align="left">{item.socialType || "null"}</TableCell>
                        <TableCell className="py-3" align="left">{item.phoneNumber || ""}</TableCell>
                        <TableCell className="py-3" align="left">{item.gender || "null"}</TableCell>
                        <TableCell className="py-3" align="center">
                          <IconButton
                            onClick={() => window.open(item.profilePicture || "null", "_blank")}
                            style={{
                              color: "green",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                          >
                            <PersonIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell className="py-3" style={{ display: "flex" }} align="center">
                          <IconButton
                            onClick={() => handleClickOpencreate(item)}
                            color="success"
                            aria-label="edit"
                            size="large"
                          >
                            <EditIcon fontSize="inherit" className="text-gray-500" />
                          </IconButton>
                          <IconButton
                            color="success"
                            aria-label="delete"
                            size="large"
                            onClick={() => handleClickOpen(item._id)}
                          >
                            <DeleteIcon fontSize="inherit" className="text-red" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  className="flex justify-end"
                  rowsPerPageOptions={rowsPerPage}
                  count={search.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onChangePage}
                />
              </TableContainer>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{t("Delete")}</DialogTitle>
                <DialogContent>
                  <DialogContentText>{t("Delete_Landlord_permission")}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>{t("Cancel")}</Button>
                  <Button onClick={onDelete} autoFocus>{t("Delete")}</Button>
                </DialogActions>
              </Dialog>
              <Dialog open={addDialog} onClose={handleClose}>
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
                      handleUpdate(propertyData);
                    } else {
                      handleCreate(propertyData);
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <DialogTitle>{t('UPDATE_LANDLORD')}</DialogTitle>
                      <Divider variant="middle" />
                      <DialogContent>
                        <Field
                          margin="dense"
                          id="username"
                          name="username"
                          label={t("NAME")}
                          type="text"
                          fullWidth
                          as={TextField}
                        />
                        <ErrorMessage name="username" />
                        <Field
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
                          margin="dense"
                          id="email"
                          name="email"
                          label={t("EMAIL")}
                          type="text"
                          fullWidth
                          as={TextField}
                        />
                        <ErrorMessage name="email" />
                        <Field
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
                        <Button onClick={handleClose} variant="contained" color="success">{t("Cancel")}</Button>
                        <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>{editData ? t("Edit") : t("Create_property")}</Button>
                      </DialogActions>
                    </Form>
                  )}
                </Formik>
              </Dialog>
            </Container>
          )}
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
