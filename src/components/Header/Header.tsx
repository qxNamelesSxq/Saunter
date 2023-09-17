import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../redux/hook";
import { setOpenModal } from "../../redux/setOpenModal/setOpenModal";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleClickOpen = useCallback(() => {
    dispatch(setOpenModal(true));
  }, [dispatch]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingTop: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: 0,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Toolbar>
          <Typography
            component="div"
            sx={{ flexGrow: 1, color: "black", fontSize: 25 }}
          >
            Saunter
          </Typography>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleClickOpen}
          >
            Add path
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
