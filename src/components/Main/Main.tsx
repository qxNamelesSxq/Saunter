import React from "react";
import { Paper } from "@mui/material";
import Header from "../Header/Header";
import RouteList from "../RouteList/RouteList";
import RouteInfo from "../RouteInfo/RouteInfo";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../redux/hook";
import useMediaQuery from "@mui/material/useMediaQuery"; // Исправленный импорт

const Main: React.FC = () => {
  const show = useAppSelector((state) => state.setShowRouteInfoReducer.show);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const paperStyles = {
    width: isMobile ? "98vw" : "900px",
    minHeight: isMobile ? "100px" : "600px",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  const stackStyles = {
    height: isMobile ? "auto" : "500px",
    marginRight: isMobile ? 0 : "1rem",
  };

  return (
    <Paper elevation={3} style={paperStyles}>
      <Header />
      <Stack
        direction={isMobile ? "column" : "row"}
        divider={
          isMobile ? (
            <Divider orientation="horizontal" flexItem />
          ) : (
            <Divider orientation="vertical" flexItem />
          )
        }
        spacing={2}
        style={stackStyles}
      >
        <RouteList />
        {show ? <RouteInfo /> : <></>}
      </Stack>
    </Paper>
  );
};

export default Main;
