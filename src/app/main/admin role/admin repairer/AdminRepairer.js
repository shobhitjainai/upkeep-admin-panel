import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  createProperty,
  getadminRepairers,
  updateProperty,
  deleteProperty,
} from "app/store/admin/adminRepairerSlice";
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
  TableSortLabel ,
  Box,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FuseLoading from "@fuse/core/FuseLoading";
import { visuallyHidden } from '@mui/utils'
import { handleSearchInput } from "app/store/admin/adminRepairerSlice";



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
  const { t } = useTranslation("adminrole");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { adminRepairers, loading,searchInput } = useSelector(
    (state) => state.admin.adminRepairer
  );
  const [addDialog, setAddDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedrepairerId, setSelectedrepairerId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [updaterepairerId, setUpdaterepairerId] = useState(null);

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

  const loadUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();
    console.log(result);
    setUsers(result);
  };
  const [search, setSearch] = useState(adminRepairers);

  const FilteredData = adminRepairers.filter(item =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    item.email
    .toLowerCase().includes(searchInput.toLowerCase()) ||
    item.contactNo.toLowerCase().includes(searchInput.toLowerCase()) 
    
  )

  // const Filter = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();
  //   setSearch(adminRepairers.filter(item =>
  //     item.name.toLowerCase().includes(searchTerm) ||
  //     item.email.toLowerCase().includes(searchTerm) ||
  //     item.typeOfRepairers.some(type => type.toLowerCase().includes(searchTerm))
  //   ));
  // };
  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  // Delete dialog open
  const handleClickOpen = (repairerId) => {
    setOpen(true);
    setSelectedrepairerId(repairerId);
  };

  // Open update dialog
  const handleClickOpenUpdate = (data = null) => {
    if (data) {
      setEditData(data);
    } else {
      setEditData(null);
    }
    setAddDialog(true);
    setUpdaterepairerId(data._id);
  };

  // Close dialog
  const handleClose = () => {
    setAddDialog(false);
    setEditData(null);
  };

  // On clicking dialog delete button
  const onDelete = () => {
    handleDelete(selectedrepairerId);
    handleClicksnackbar();
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getadminRepairers()).then((response) => {
      setSearch(response?.payload);
    });
  }, [searchInput]);

  // Calling the delete repairer API
  const handleDelete = (repairerId) => {
    dispatch(deleteProperty({ repairerId })).then((res) => {
      res.payload.success && dispatch(getadminRepairers());
    });
  };

  // Calling the update repairer API
  const handleUpdate = (editData) => {
    dispatch(updateProperty({ editData, updaterepairerId })).then((res) => {
      console.log(res);
      res.payload.success && dispatch(getadminRepairers(access_token));
    });
    // After successful creation, refresh the property list

    setAddDialog(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, t("Minimum")).required(t("Required")),
    contactNo: Yup.number().positive(t("Positive")).required(t("Required")),
    email: Yup.string().required(t("Required")),
    // typeOfRepairers: Yup.string().required(t("Required")),
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
        {(index === 0 || index === 5 ) ? (
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
  const headCells = [
    { id: 'SNo', numeric: false, disablePadding: true, label: `${t("S_no")}` },
    { id: 'name', numeric: false, disablePadding: true, label: `${t("Name")}` },
    { id: 'email', numeric: false, disablePadding: false, label: `${t("Email")}` },
    { id: 'contactNo', numeric: false, disablePadding: false, label: `${t("Contact_no")}` },
    { id: 'typeOfRepairers', numeric: false, disablePadding: false, label: `${t("typeOfRepairers")}` },
    { id: 'Actions', numeric: false, disablePadding: false, label: `${t("Actions")}` },
    
    // Add more columns as needed
  ];
  
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
            {t("Repairer")}
          </h1>
          <TextField
            sx={{ marginRight: "150px" }}
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
          {  loading? <FuseLoading/> : (

          <Container maxWidth="xl" style={{ marginTop: "2%", marginLeft:"25px" }}>
            
          

            {/* repairer */}

            <TableContainer
              component={Paper}
              sx={{ borderRadius: "2px", borderBottom: "", width: "90%" }}
            >
              <Table sx={{ minWidth: 650 }}>
                {/* <TableHead>
                  <TableRow
                    style={{ backgroundColor: "#51AB30" }}
                    
                  >
                    <TableCell align="center" sx={{color: "#F2F5E9" }}>{t("S_no")}</TableCell>
                    <TableCell align="left" sx={{color: "#F2F5E9" }}>{t("Name")}</TableCell>
                    <TableCell align="left" sx={{color: "#F2F5E9" }}>{t("Email")}</TableCell>
                    <TableCell align="left" sx={{color: "#F2F5E9" }}>{t("Contact_no")}</TableCell>
                    <TableCell align="left" sx={{color: "#F2F5E9" }}>{t("typeOfRepairers")}</TableCell>
                    <TableCell align="left" sx={{color: "#F2F5E9" }}>{t("Actions")}</TableCell>
                  </TableRow>
                </TableHead> */}

              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={adminRepairers.length}
                // className="bg-green"
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
                        <TableCell className="py-3" align="center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="py-3" align="left">
                          {item.name}
                        </TableCell>
                        <TableCell className="py-3" align="left">
                          {item.email || "null"}
                        </TableCell>
                        <TableCell className="py-3" align="left">
                          {item.contactNo}
                        </TableCell>
                        <TableCell className="py-3" align="left">
                          {item.typeOfRepairers.join() || ""}
                        </TableCell>

                        <TableCell
                          className="p-3"
                          align="left"
                          style={{
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "left",
                          }}
                        >
                          <IconButton
                            onClick={() => handleClickOpenUpdate(item)}
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
                              className="text-red"
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
                count={adminRepairers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
              />
            </TableContainer>

            {/* Delete dialog */}
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>{t("Delete")}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {t("Delete_Repairer_permission")}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)}>{t("Cancel")}</Button>
                <Button onClick={onDelete} autoFocus>
                  {t("Delete")}
                </Button>
              </DialogActions>
            </Dialog>

            {/* Update dialog */}
            <Dialog
              open={addDialog}
              onClose={handleClose}
              sx={{ height: "70%", top: "15%" }}
            >
              <Formik
                initialValues={{
                  name: editData ? editData.name : "",
                  email: editData ? editData.email : "",
                  contactNo: editData ? editData.contactNo : "",
                  typeOfRepairers: editData ? editData.typeOfRepairers : "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  // You can modify the structure of values if needed before sending

                  const propertyData = {
                    name: values.name,
                    email: values.email,
                    contactNo: values.contactNo,
                    typeOfRepairers: values.typeOfRepairers,
                  };

                  console.log(propertyData);
                  handleUpdate(propertyData);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <DialogTitle>{t("UPDATE_REPAIRER")}</DialogTitle>
                    <Divider variant="middle" />
                    <DialogContent>
                      <DialogContentText>
                        {t("please_enter_details")}
                      </DialogContentText>

                      <Field
                        //   autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label={t("NAME")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="name" />

                      <Field
                        //   autoFocus
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
                        // autoFocus
                        margin="dense"
                        id="contactNo"
                        name="contactNo"
                        label={t("CONTACT")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="contactNo" />

                      <Field
                        // autoFocus
                        margin="dense"
                        id="typeOfRepairers"
                        name="typeOfRepairers"
                        label={t("TYPEOFREPAIRER")}
                        type="text"
                        fullWidth
                        as={TextField}
                      />
                      <ErrorMessage name="typeOfRepairers" />
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
                        {t("Edit")}
                      </Button>
                    </DialogActions>
                  </Form>
                )}
              </Formik>
            </Dialog>
          

          <Snackbar
            sx={{ marginTop: "60px" }}
            anchorOrigin={{ vertical, horizontal }}
            open={opensnackbar}
            onClose={handleClosesnackbar}
            autoHideDuration={2000}
            message={t("Successful")}
            key={vertical + horizontal}
          />
          </Container>
          )}
        </>
      }
    />
  );
}

export default propertyPage;
