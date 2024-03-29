import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Snackbar,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getadminNotification,
  getsendNotifications,
} from "app/store/admin/BroadcastNotificationSlice";
import Container from "@mui/material/Container";
import { getNotifications } from "app/store/admin/notificationSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FuseLoading from "@fuse/core/FuseLoading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Notification() {
  const { t } = useTranslation("propertyPage");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { adminNotifications, loading } = useSelector(
    (state) => state.admin.notification
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    dispatch(getadminNotification());
  }, []);

  const handleSend = async (messageData) => {
    try {
      await dispatch(getsendNotifications({ messageData })).then((res) => {
        if (res.payload.success) {
          dispatch(getNotifications());
          setSnackbarOpen(true); // Open Snackbar on successful notification
        }
      });
      setOpen(false);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const broadcastNotification = () => {
    const title = document.getElementsByName("title")[0].value;

    if (message.split(" ").length <= 100) {
      const messageData = {
        title: title,
        description: message,
      };
      handleSend(messageData);
    } else {
      setMessageError("Message should not exceed 100 words");
    }
  };

  const handleMessageChange = (event) => {
    const inputMessage = event.target.value;
    setMessage(inputMessage);
    const messageWithoutSpaces = inputMessage.replace(/\s/g, "");
    if (messageWithoutSpaces.length > 100) {
      setMessageError("Message should not exceed 100 characters");
    } else {
      setMessageError("");
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let hour = date.getHours();
    const minute = date.getMinutes();
    let period = "AM";

    if (hour >= 12) {
      period = "PM";
      if (hour > 12) {
        hour -= 12;
      }
    }

    if (hour === 0) {
      hour = 12;
    }

    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedHour = hour < 10 ? "0" + hour : hour;
    const formattedMinute = minute < 10 ? "0" + minute : minute;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHour}:${formattedMinute} ${period}`;
  }

  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        sx={{ paddingRight: "130px", marginTop: "20px" }}
      >
        <Button variant="contained" color="success" onClick={handleOpen}>
          {t(`Send_Push_Notification`)}
        </Button>
      </Grid>
      <Typography
        sx={{
          marginLeft: "65px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderBottom: "1px solid lightgray",
          width: "86%",
        }}
      >
        {t(`Notifications_List`)}
      </Typography>

      {loading ? (
        <FuseLoading />
      ) : (
        <Container
          maxWidth="xl"
          style={{ marginTop: "2%", marginLeft: "30px" }}
        >
          {/* repairer */}

          <TableContainer
            component={Paper}
            sx={{ borderRadius: "2px", borderBottom: "", width: "90%" }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow className="bg-gray-200 transition-colors duration-200 ease-in-out">
                  <TableCell align="center" >
                    {t(`S_no`)}
                  </TableCell>
                  <TableCell align="left">
                    {t(`Title`)}
                  </TableCell>
                  <TableCell align="left">
                    {t(`Message`)}
                  </TableCell>
                  <TableCell align="left">
                    {t(`Created_Date`)}
                  </TableCell>
                  {/* <TableCell align="center" sx={{color: "#F2F5E9" }}>{t("typeOfRepairers")}</TableCell>
          <TableCell align="center" sx={{color: "#F2F5E9" }}>{t("Actions")}</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {adminNotifications
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
                      <TableCell
                        className="py-6"
                        align="center"
                        style={{ height: "60px" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className="py-6"
                        align="left"
                        style={{ height: "60px" }}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        className="py-6"
                        align="left"
                        style={{ height: "60px" }}
                      >
                        {item.description || "null"}
                      </TableCell>
                      <TableCell
                        className="py-6"
                        align="left"
                        style={{ height: "60px" }}
                      >
                        {formatDate(item.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              className="flex justify-end"
              rowsPerPageOptions={rowsPerPage}
              count={adminNotifications.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
            />
          </TableContainer>
        </Container>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 id="parent-modal-title">{t(`Create_Notification`)}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            name="title"
            label={t(`Title`)}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            name="message"
            label={t(`Message`)}
            variant="outlined"
            margin="normal"
            value={message}
            onChange={handleMessageChange}
            error={messageError !== ""}
            helperText={
              messageError ||
              `${message.replace(/\s/g, "").length}/100 ${t('characters')}`
            }
            InputProps={{
              style: { lineHeight: '1.5' }, // Adjust the line height as needed
            }} 
          />

          <Button
            type="submit"
            sx={{ borderRadius: "0px", marginRight: "5px" }}
            variant="contained"
            color="success"
            onClick={broadcastNotification}
          >
            {t(`Send`)}
          </Button>
          <Button
            sx={{ borderRadius: "0px" }}
            variant="contained"
            color="success"
            onClick={handleClose}
          >
            {t(`Cancel`)}
          </Button>
        </Box>
      </Modal>

      {/* Snackbar Component */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ marginTop: "70px" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Notified successfully"
        key={"top" + "center"}
      />
    </>
  );
}
