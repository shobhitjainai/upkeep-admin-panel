import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  createProperty,
  getadminLandlords,
  updateProperty,
  deleteProperty,
} from "app/store/admin/adminLandlordSlice";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Paper,
//   TableRow,
//   TableHead,
//   TableContainer,
//   TableCell,
//   TableBody,
//   Table,
// } from "@mui/material";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Styled Table Container
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "2px",
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(1),
  width: "90%", 
  marginLeft: "45px",
  marginTop: "15px",
  overflowX: "hidden", 
}));

// Styled Table Head Cell
const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#00ab41",
  color: "#282A35",
  fontWeight: "bold",
  // borderRight: `1px solid ${theme.palette.primary.light}`,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  padding: theme.spacing(1.5, 2),
}));

// Styled Table Body Cell
const StyledTableCellBody = styled(TableCell)(({ theme }) => ({
  // borderRight: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: "20px",
  // padding: theme.spacing(0, 0),
  padding: "0px"

}));

const access_token = localStorage.getItem("jwt_access_token");

console.log(access_token);
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
  const { adminLandlords, loading } = useSelector(
    (state) => state.admin.adminLandlord
  );
  console.log(adminLandlords);
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
    username: Yup.string().min(3, t("Minimum")).required(t("Required")),
    phoneNumber: Yup.number().positive(t("Positive")).required(t("Required")),
    gender: Yup.string()
      .required(t("Required")),
    email: Yup.string().required(t("Required")),
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
          <StyledTableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCellHeader align="center">{t("S_no")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("User_name")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("email")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("social_Type")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("phoneNumber")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("gender")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("profilePicture")}</StyledTableCellHeader>
            <StyledTableCellHeader align="center">{t("Actions")}</StyledTableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminLandlords?.map((item, index) => (
            <TableRow key={index}>
              <StyledTableCellBody align="center">{index + 1}</StyledTableCellBody>
              <StyledTableCellBody align="center">{item.username || "null"}</StyledTableCellBody>
              <StyledTableCellBody align="center">{item.email || "null"}</StyledTableCellBody>
              <StyledTableCellBody align="center">{item.socialType || "null"}</StyledTableCellBody>
              <StyledTableCellBody align="center">{item.phoneNumber || ""}</StyledTableCellBody>
              <StyledTableCellBody align="center">{item.gender || "null"}</StyledTableCellBody>
              <StyledTableCellBody align="center">
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
                  <OpenInNewIcon />
                </IconButton>
              </StyledTableCellBody>
              <StyledTableCellBody style={{ display: "flex" }} align="center">
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
             

              </StyledTableCellBody>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>

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
