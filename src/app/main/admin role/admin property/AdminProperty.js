import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  createProperty,
  getadminProperties,
  updateProperty,
  deleteProperty,
} from "app/store/admin/adminPropertySlice";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FuseLoading from "@fuse/core/FuseLoading";
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
  TableSortLabel,
  Box,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from '@mui/utils'
import { handleSearchInput } from "app/store/admin/adminPropertySlice";

const access_token = localStorage.getItem("jwt_access_token");

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
  const { adminProperties, loading , searchInput} = useSelector(
    (state) => state.admin.adminProperty
  );
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
  const { vertical, horizontal, opensnackbar } = snackbarstate;
  const [search, setSearch] = useState(adminProperties);

const FilteredData = adminProperties.filter(item =>
    item.propertyname.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.city
    .toLowerCase().includes(searchInput.toLowerCase()) ||
    item.address1.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.totalroom.toLowerCase().includes(searchInput.toLowerCase()) 
  )
const filterData = () => {
  return adminProperties.filter(item =>
    item.propertyname?.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.price?.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.propertycapacity?.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.totalroom?.toLowerCase().includes(searchInput.toLowerCase())
  );
}

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
    setUpdatePropertyId(data._id);
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
    dispatch(getadminProperties()).then((response) => {
      setSearch(response?.payload);
    });
  }, [searchInput]);

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty({ access_token, propertyId })).then((res) => {
      res.payload.success && dispatch(getadminProperties(access_token));
    });
  };

  const handleCreate = async (propertyData) => {
    try {
      await dispatch(createProperty({ access_token, propertyData }));
      dispatch(getadminProperties(access_token));
      setAddDialog(false);
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  const handleUpdate = (editData) => {
    dispatch(updateProperty({ editData, updatepropertyId })).then((res) => {
      console.log(res)
      
      res.payload.success && dispatch(getadminProperties());
    });
    setAddDialog(false);
  };

  const validationSchema = Yup.object().shape({
    property_name: Yup.string().min(3, t("Minimum")).required(t("Required")),
    total_rooms: Yup.number().integer(t("Integer")).required(t("Required")),
    price: Yup.number().positive(t("Positive")).required(t("Required")),
    property_capacity: Yup.number()
      .integer(t("Integer"))
      .required(t("Required")),
    address1: Yup.string().required(t("Required")),
    address2: Yup.string().required(t("Required")),
    city: Yup.string().required(t("Required")),
  });

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  
  // Function to handle request sort
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
  
    const createSortHandler = (property) => (event) => {
      onRequestSort(property);
    };
    const headCells = [
      { id: 'propertyUniqueName', numeric: false, disablePadding: true, label: `${t("Property_id")}` },
      { id: 'propertyname', numeric: false, disablePadding: false, label: `${t("Property_name")}` },
      { id: 'totalroom', numeric: false, disablePadding: false, label: `${t("Total_rooms")}` },
      { id: 'price', numeric: false, disablePadding: false, label: `${t("Price")}` },
      { id: 'propertycapacity', numeric: false, disablePadding: false, label: `${t("Property_capacity")} `},
      { id: 'address1', numeric: false, disablePadding: false, label:  `${t("Address")}` },
      { id: 'gender', numeric: false, disablePadding: false, label: `${t("Landlord")}` },
      { id: 'gender', numeric: false, disablePadding: false, label:  `${t("Tenant")}`},
      { id: 'gender', numeric: false, disablePadding: false, label: `${t('Actions')}` },
      // Add more columns as needed
    ];
    return (
      <TableHead>
      <TableRow className="bg-gray-200 transition-colors duration-200 ease-in-out">
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index === 0 ? "center" : "left"} 
            padding={(index === 0 || index === 1) ? "5px" : (headCell.disablePadding ? "none" : "normal")}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {( index === 8 || index === 7 || index === 6) ? (
              <span>{headCell.label}</span>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    
    
    );
  }

  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  


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
            {t("Property")}
          </h1>
          <TextField
           
            id="filled-search"
            label="Search field"
            type="search"
            variant="filled"
            color="success"
            onChange={(e) => dispatch( handleSearchInput(e.target.value))}
          />
        </div>
      }
      content={
        <>
          {loading ? (
            <FuseLoading />
          ) : (
            <Container
              maxWidth="xl"
              style={{ marginTop: "2%", marginLeft: "30px" }}
            >
              <TableContainer
                style={{ paddingBottom: "10px", borderRadius: "3px" }}
                component={Paper}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  {/* <TableHead>
                    <TableRow style={{ backgroundColor: "#51AB30" }}>
                      <TableCell align="center" sx={{ color: "#F2F5E9" }}>
                        {t("Property_id")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Property_name")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Total_rooms")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Price")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Property_capacity")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Address")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Landlord")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Tenant")}
                      </TableCell>
                      <TableCell align="left" sx={{ color: "#F2F5E9" }}>
                        {t("Actions")}
                      </TableCell>
                    </TableRow>
                  </TableHead> */}

<EnhancedTableHead

                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={adminProperties.length}
              />
                  <TableBody>
                    {stableSort(FilteredData, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((item, index) => (
                        <TableRow
                          key={index}
                          className="transition-colors duration-200 ease-in-out hover:bg-gray-100"
                          sx={{
                            "td, th, thead, trow": {
                              borderBottom: "0.5px solid lightgray",
                            },
                          }}
                        >
                          <TableCell className="py-3" align="left">
                            {item.propertyUniqueName}
                          </TableCell>
                          <TableCell
                            className="py-3"
                            align="left"
                            component="th"
                            scope="row"
                          >
                            {item.propertyname}
                          </TableCell>
                          <TableCell className="py-3" align="left">
                            {item.totalroom}
                          </TableCell>
                          <TableCell className="py-3" align="left">
                            {item.price || ""}
                          </TableCell>
                          <TableCell className="py-3" align="left">
                            {item.propertycapacity}
                          </TableCell>
                          <TableCell
                            className="py-3"
                            align="left"
                          >{`${item.address1}, ${item.city}`}</TableCell>

                          <TableCell className="py-3" align="left">
                            {item.landLord
                              ? item.landLord.username
                              : "Not Assign"}
                          </TableCell>

                          <TableCell className="py-3" align="left">
                            {item.tenant ? item.tenant.username : "Not Assign"}
                          </TableCell>
                          <TableCell
                            className="py-3 pl-0"
                            style={{ display: "flex" }}
                            align="left"
                          >
                            <IconButton
                              onClick={() => handleClickOpencreate(item)}
                              color="success"
                              aria-label="delete"
                              size="large"
                            >
                              <EditIcon
                                fontSize="inherit"
                                className="text-gray-500 "
                              />
                            </IconButton>

                            <IconButton
                              color="success"
                              aria-label="delete"
                              size="large"
                              onClick={() => handleClickOpen(item._id)}
                            >
                              <DeleteIcon
                                fontSize="inherit"
                                className="text-red "
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                <TablePagination
                  className="flex justify-end"
                  rowsPerPageOptions={rowsPerPage}
                  count={adminProperties.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={onChangePage}
                />
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
                // sx={{ height: "70%", top: "15%" }}
              >
                <Formik
                  initialValues={{
                    //   property_id: editData ? editData.property_id : "",
                    property_name: editData ? editData.propertyname : "",
                    total_rooms: editData ? editData.totalroom : "",
                    price: editData ? editData.price : "",
                    property_capacity: editData
                      ? editData.propertycapacity
                      : "",
                    address1: editData ? editData.address1 : "",
                    address2: editData ? editData.address2 : "",
                    // landlord: editData ? editData.landLord.username : "",
                    // tenant: editData ? editData.tenant.username : "",
                    city: editData ? editData.city : "",
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
                      // landlord: values.landlord,
                      // tenant: values.tenant,
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
                        {editData ? t("Update_Property") : t("Create_Property")}
                      </DialogTitle>

                      <Divider variant="middle" />
                      <DialogContent>
                       
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
                          // autoFocus
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
                        <ErrorMessage name="address" />
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

export default propertyPage;
