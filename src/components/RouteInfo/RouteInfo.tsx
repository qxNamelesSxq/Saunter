import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import MapInfo from "./MapInfo";
import { setUpdate } from "../../redux/setUpdate/setUpdate";
import { setShowRouteInfo } from "../../redux/setShowRouteInfo/setShowRouteInfo";
import useMediaQuery from "@mui/material/useMediaQuery";

const RouteInfo: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const id = useAppSelector((state) => state.setIdReducer.id);
  const dispatch = useAppDispatch();
  const tripInfo = useAppSelector((state) => state.fetchReducer.data).find(
    (e) => e.id === id
  );

  // Проверка на существование tripInfo перед обращением к его свойствам
  const stringdistance =
    tripInfo?.distance !== undefined
      ? tripInfo.distance > 999
        ? `${tripInfo.distance / 1000} km`
        : `${tripInfo.distance} m`
      : "";

  const deleteTrip = async () => {
    const tripDoc = doc(db, "data", id);
    await deleteDoc(tripDoc);
    dispatch(setShowRouteInfo(false));
    dispatch(setUpdate());
  };

  const toggleFavoriteTrip = async () => {
    if (tripInfo) {
      const tripDoc = doc(db, "data", id);
      const favorite = !tripInfo.favorite;
      await updateDoc(tripDoc, { favorite });
      dispatch(setUpdate());
    }
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "500px", overflow: "auto" }}>
      <Box sx={{ marginRight: isMobile ? 0 : "1rem" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography fontSize={20}>{tripInfo?.title}</Typography>
          <Typography fontSize={17}>{stringdistance}</Typography>
        </Box>
        <Typography
          sx={{ marginTop: "1rem", marginBottom: "1rem", marginLeft: "1rem" }}
        >
          {tripInfo?.fulldescription}
        </Typography>
        <Box>
          <MapInfo />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={toggleFavoriteTrip}
            sx={{ marginBottom: "1rem", marginRight: "1rem" }}
          >
            {tripInfo?.favorite ? "Remove from favorite" : "Add to favorite"}
          </Link>
          <Link
            sx={{
              color: "red",
              textDecorationColor: "#ff00008a",
              marginBottom: "1rem",
              marginRight: "1rem",
            }}
            component="button"
            variant="body2"
            onClick={deleteTrip}
          >
            Remove
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default RouteInfo;
