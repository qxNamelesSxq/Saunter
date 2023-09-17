import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Typography from "@mui/material/Typography";
import { Box } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setOpenModal } from "../../redux/setOpenModal/setOpenModal";
import { db } from "../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { setUpdate } from "../../redux/setUpdate/setUpdate";
import { useMediaQuery } from "@material-ui/core";
import Alert from "@mui/material/Alert";

const Form: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const databaseCollection = collection(db, "data");
  const dispatch = useAppDispatch();
  const distance = useAppSelector((state) => state.setDistanceReducer.distance);
  const markers = useAppSelector((state) => state.setMarkersArrayReducer.arr);

  const [formData, setFormData] = useState({
    title: "",
    sdescription: "",
    fdescription: "",
  });

  const { title, sdescription, fdescription } = formData;

  const stringDistance =
    distance > 999 ? `${distance / 1000} km` : `${distance} m`;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      title.trim().length > 0 &&
      sdescription.trim().length > 0 &&
      fdescription.trim().length > 0 &&
      distance > 0
    ) {
      const newPath = {
        title: title.trim(),
        shortdescription: sdescription.trim(),
        fulldescription: fdescription.trim(),
        markers: markers,
        distance: distance,
        favorite: false,
      };

      try {
        await addDoc(databaseCollection, newPath);
        dispatch(setOpenModal(false));
        dispatch(setUpdate());
      } catch (err) {
        console.error(err);
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Stack
        component="form"
        sx={{
          marginTop: "10px",
          width: isMobile ? "35ch" : "40ch",
          alignItems: "center",
        }}
        spacing={3}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Title"
          name="title"
          value={title}
          onChange={handleInputChange}
        />
        <TextField
          helperText={`${sdescription.length}/160`}
          FormHelperTextProps={{ style: { marginLeft: "auto" } }}
          fullWidth
          id="outlined-textarea"
          label="Short description"
          name="sdescription"
          inputProps={{ maxLength: 160 }}
          multiline
          rows={2}
          value={sdescription}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          id="outlined-multiline-static"
          label="Full description"
          name="fdescription"
          multiline
          rows={4}
          value={fdescription}
          onChange={handleInputChange}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MapOutlinedIcon />
          <Typography>Length {stringDistance}</Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={handleSubmit}
        >
          Add path
        </Button>
      </Stack>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error! Some data is empty!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Form;
