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
} from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
    const { adminRepairers, loading } = useSelector(
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
        dispatch(getadminRepairers(access_token));
    }, []);

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
        // property_name: Yup.string().min(3, t("Minimum")).required(t("Required")),
        // total_rooms: Yup.number()
        // .integer(t("Integer")) // Add parentheses here
        // .required(t("Required")),
        // price: Yup.number().positive(t("Positive")).required(t("Required")),
        // property_capacity: Yup.number()
        // .integer(t("Integer")) // Add parentheses here
        // .required(t("Required")),
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
                        {t("Repairer")}
                    </h1>

                </div>
            }
            content={
                <>
                    <Container maxWidth="lg" style={{ marginTop: "2%" }}>
                        <TableContainer
                            style={{ paddingBottom: "10px", borderRadius: "8px" }}
                            component={Paper}
                        >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead style={{ background: "#51AB30" }}>
                                    <TableRow>
                                        <TableCell align="center">{t("S_no")}</TableCell>
                                        <TableCell align="center">{t("Name")}</TableCell>
                                        <TableCell align="center">{t("Email")}</TableCell>
                                        <TableCell align="center">{t("Contact_no")}</TableCell>
                                        <TableCell align="center">{t("typeOfRepairers")}</TableCell>

                                        <TableCell align="center">{t("Actions")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {adminRepairers?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{item.name}</TableCell>
                                            <TableCell align="center" component="th" scope="row">
                                                {item.email || "null"}
                                            </TableCell>
                                            <TableCell align="center">{item.contactNo}</TableCell>
                                            <TableCell align="center">
                                                {item.typeOfRepairers || ""}
                                            </TableCell>

                                            <TableCell style={{ display: "flex" }} align="right">
                                                <IconButton
                                                    color="success"
                                                    align="left"
                                                    aria-label="delete"
                                                    size="large"
                                                    onClick={() => handleClickOpen(item._id)}
                                                >
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>

                                                <IconButton
                                                    onClick={() => handleClickOpenUpdate(item)}
                                                    color="success"
                                                    align="left"
                                                    aria-label="delete"
                                                    size="large"
                                                >
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Delete dialog */}
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
                                        <DialogTitle>Update Repairer</DialogTitle>
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
                                                label="Name"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            />
                                            <ErrorMessage name="property_name" />

                                            <Field
                                                //   autoFocus
                                                margin="dense"
                                                id="email"
                                                name="email"
                                                label="Email"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            />
                                            <ErrorMessage name="price" />

                                            <Field
                                                // autoFocus
                                                margin="dense"
                                                id="contactNo"
                                                name="contactNo"
                                                label="Contact No"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            />
                                            <ErrorMessage name="total_rooms" />

                                            <Field
                                                // autoFocus
                                                margin="dense"
                                                id="typeOfRepairers"
                                                name="typeOfRepairers"
                                                label="Type Of Repairers"
                                                type="text"
                                                fullWidth
                                                as={TextField}
                                            />
                                            <ErrorMessage name="total_rooms" />
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

export default propertyPage;
