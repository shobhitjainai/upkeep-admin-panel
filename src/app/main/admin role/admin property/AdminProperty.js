import { useDispatch, useSelector } from "react-redux";
import {
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
import InfoIcon from '@mui/icons-material/Info';
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
  Grid,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from '@mui/utils'
import { handleSearchInput } from "app/store/admin/adminPropertySlice";
import { showMessage } from "app/store/fuse/messageSlice";

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
  const { adminProperties, loading, searchInput } = useSelector(
    (state) => state.admin.adminProperty
  );
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [updatepropertyId, setUpdatePropertyId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getadminProperties()).then((response) => {
      setSearch(response?.payload);
    });
  }, [searchInput]);
  useEffect(() => {
    dispatch(handleSearchInput(''))
  }, [])

  const handleDelete = (propertyId) => {
    dispatch(deleteProperty({ access_token, propertyId })).then((res) => {
      res.payload.success && dispatch(getadminProperties(access_token))
      dispatch(showMessage({ message: 'Property Deleted Successfully', variant: 'success' }));
    });
  };

  const handleUpdate = (editData) => {
    dispatch(updateProperty({ editData, updatepropertyId })).then((res) => {
      res.payload.success && dispatch(getadminProperties())
        && dispatch(showMessage({ message: 'Property Updated Successfully', variant: 'success' }));
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
      { id: 'propertycapacity', numeric: false, disablePadding: false, label: `${t("Property_capacity")} ` },
      { id: 'address1', numeric: false, disablePadding: false, label: `${t("Address")}` },
      { id: 'landlord', numeric: false, disablePadding: false, label: `${t("Landlord")}` },
      { id: 'tenant', numeric: false, disablePadding: false, label: `${t("Tenant")}` },
      { id: 'actions', numeric: false, disablePadding: false, label: `${t('Actions')}` },
    ];
    return (
      <TableHead>
        <TableRow className="bg-gray-200 transition-colors duration-200 ease-in-out">
          {headCells.map((headCell, index) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              padding={(index === 0 || index === 1) ? "5px" : (headCell.disablePadding ? "none" : "normal")}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {(index === 8 || index === 7 || index === 6) ? (
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
            onChange={(e) => dispatch(handleSearchInput(e.target.value))}
          />
        </div>
      }
      content={
        <>
          <Container
            maxWidth="xl"
            style={{ marginTop: "2%", marginLeft: "30px" }}
          >
            <TableContainer
              style={{ paddingBottom: "10px", borderRadius: "3px" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <EnhancedTableHead

                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={adminProperties.length}
                />
                {(FilteredData.length > 0 && !loading) && <TableBody>
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
                </TableBody>}
              </Table>
              {loading && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
                <Grid item><FuseLoading /></Grid>
              </Grid>}
              {(FilteredData.length <= 0 && !loading) && <Grid item container xs={12} spacing={2} sx={{ height: '500px' }} justifyContent={'center'} alignItems={'center'}>
                <Grid item>
                  <InfoIcon sx={{ color: '#56AB30', fontSize: 40 }} />
                </Grid>
                <Grid item>
                  <Typography fontSize={18} fontWeight={600}>You have No Property!!</Typography>
                </Grid>
              </Grid>}
              {FilteredData.length > 0 && <TablePagination
                className="flex justify-end"
                rowsPerPageOptions={rowsPerPage}
                count={adminProperties.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
              />}
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
                  property_name: editData ? editData.propertyname : "",
                  total_rooms: editData ? editData.totalroom : "",
                  price: editData ? editData.price : "",
                  property_capacity: editData
                    ? editData.propertycapacity
                    : "",
                  address1: editData ? editData.address1 : "",
                  address2: editData ? editData.address2 : "",
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
                    city: values.city
                  };
                  if (editData) {
                    handleUpdate(propertyData);
                  } else {
                    handleCreate(propertyData);
                    setSubmitting(false);
                  }
                }}
              >
                {(formik) => (
                  <Form>
                    <DialogTitle>
                      {editData ? t("Update_Property") : t("Create_Property")}
                    </DialogTitle>

                    <Divider variant="middle" />
                    <DialogContent>
                      <TextField
                        name='property_name'
                        varient='contained'
                        type='text'
                        label={t("Property_name")}
                        value={formik.values.property_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.property_name && Boolean(formik.errors.property_name)}
                        helperText={formik.touched.property_name && formik.errors.property_name}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='total_rooms'
                        varient='contained'
                        type='number'
                        label={t("Total_rooms")}
                        value={formik.values.total_rooms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.total_rooms && Boolean(formik.errors.total_rooms)}
                        helperText={formik.touched.total_rooms && formik.errors.total_rooms}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='price'
                        varient='contained'
                        type='number'
                        label={t("Price")}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='property_capacity'
                        varient='contained'
                        type='number'
                        label={t("Property_capacity")}
                        value={formik.values.property_capacity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.property_capacity && Boolean(formik.errors.property_capacity)}
                        helperText={formik.touched.property_capacity && formik.errors.property_capacity}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='address1'
                        varient='contained'
                        type='text'
                        label={t("Address1")}
                        value={formik.values.address1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address1 && Boolean(formik.errors.address1)}
                        helperText={formik.touched.address1 && formik.errors.address1}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='address2'
                        varient='contained'
                        type='text'
                        label={t("Address2")}
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.address2 && Boolean(formik.errors.address2)}
                        helperText={formik.touched.address2 && formik.errors.address2}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
                      <TextField
                        name='city'
                        varient='contained'
                        type='text'
                        label={t("City")}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        sx={{ paddingBottom: "15px" }}
                        fullWidth
                        required
                      />
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
                        disabled={formik.isSubmitting}
                      >
                        {editData ? t("Edit") : t("Create_property")}
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>
          </Container>

        </>
      }
    />
  );
}

export default propertyPage;
