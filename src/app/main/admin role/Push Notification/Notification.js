import React, {  useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  Snackbar,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { getsendNotifications } from "app/store/admin/BroadcastNotificationSlice";
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    if (inputMessage.split(" ").length > 100) {
      setMessageError("Message should not exceed 100 words");
    
    } else {
      setMessageError("");
    
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="flex-end"
        sx={{ paddingRight: "50px", marginTop: "20px" }}
      >
        <Button variant="contained" color="success" onClick={handleOpen}>
          Send Push Notification
        </Button>
      </Grid>
      <Typography
        sx={{
          marginLeft: "108px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          borderBottom: "1px solid lightgray",
          width: "86%",
        }}
      >
        Notifications List
      </Typography>

      {/* <Container maxWidth="xl" style={{ marginTop: "2%", marginLeft: "80px" }}>
        <TableContainer
          component={Paper}
          sx={{ borderRadius: "2px", borderBottom: "", width: "90%" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{ borderBottom: "2px solid lightgray" ,fontWeight:"600px"}}
                >
                  S No.
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderBottom: "2px solid lightgray" ,fontWeight:"600px"}}
                >
                  Title
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderBottom: "2px solid lightgray" ,fontWeight:"600px"}}
                >
                  Message
                </TableCell>
                <TableCell
                  align="center"
                  style={{ borderBottom: "2px solid lightgray" ,fontWeight:"600px"}}
                >
                  Created Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "0.5px solid lightgray",
                      margin: "30px",
                      minHeight: "60px"
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "0.5px solid lightgray",
                      margin: "30px",
                      minHeight: "60px"
                    }}
                  >
                    {row.calories}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "0.5px solid lightgray",
                      margin: "30px",
                      minHeight: "60px"
                    }}
                  >
                    {row.fat}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      borderBottom: "0.5px solid lightgray",
                      margin: "30px",
                      minHeight: "60px"
                    }}
                  >
                    {row.fat}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container> */}
    

<Container maxWidth="xl" style={{ marginTop: "2%", marginLeft:"30px" }}>



  {/* repairer */}

  <TableContainer
    component={Paper}
    sx={{ borderRadius: "2px", borderBottom: "", width: "90%" }}
  >
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow
          style={{ backgroundColor: "#51AB30" }}
          
        >
          <TableCell align="center" sx={{color: "#F2F5E9" }}>S No</TableCell>
          <TableCell align="center" sx={{color: "#F2F5E9" }}>Title</TableCell>
          <TableCell align="center" sx={{color: "#F2F5E9" }}>Message</TableCell>
          <TableCell align="center" sx={{color: "#F2F5E9" }}>Created Date</TableCell>
          {/* <TableCell align="center" sx={{color: "#F2F5E9" }}>{t("typeOfRepairers")}</TableCell>
          <TableCell align="center" sx={{color: "#F2F5E9" }}>{t("Actions")}</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => (
              <TableRow 
              key={index} 
              className="transition-colors duration-200 ease-in-out hover:bg-gray-200"
              sx={{
                "td, th, thead, trow": {
                  borderBottom: "0.5px solid lightgray",
                },
              }}
            >
              <TableCell className="p-3" align="center">
                {index + 1}
              </TableCell>
              <TableCell className="p-3" align="center">
                {row.name}
              </TableCell>
              <TableCell className="p-3" align="center">
                {row.fat || "null"}
              </TableCell>
              <TableCell className="p-3" align="center">
                {row.name}
              </TableCell>
              {/* <TableCell className="p-3" align="center">
                {item.typeOfRepairers || ""}
              </TableCell> */}
 
            </TableRow>
          ))}
      </TableBody>
    </Table>
    <TablePagination
     className="flex justify-end"
      rowsPerPageOptions={rowsPerPage}
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
    />
  </TableContainer>

</Container>


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
            <h2 id="parent-modal-title">Create Notification</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            name="title"
            label="Title"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            name="message"
            label="Message"
            variant="outlined"
            margin="normal"
            value={message}
            onChange={handleMessageChange}
            error={messageError !== ""}
            helperText={
              messageError || `${message.split(" ").length}/100 words`
            }
          />

          <Button
            type="submit"
            sx={{ borderRadius: "0px", marginRight:"5px" }}
            variant="contained"
            color="success"
            onClick={broadcastNotification}
          >
            Send
          </Button>
          <Button
           
            sx={{ borderRadius: "0px" }}
            variant="contained"
            color="success"
            onClick={handleClose}
          >
            Cancel
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
