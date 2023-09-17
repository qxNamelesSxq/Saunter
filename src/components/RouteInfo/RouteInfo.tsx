import { Box } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import Typography from '@mui/material/Typography';
import MapInfo from './MapInfo';
import Link from '@mui/material/Link';
import { setUpdate } from '../../redux/setUpdate/setUpdate';
import { setShowRouteInfo } from '../../redux/setShowRouteInfo/setShowRouteInfo';
import { useMediaQuery } from '@material-ui/core';



const RouteInfo = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const id = useAppSelector(state => state.setIdReducer.id);
    const dispatch = useAppDispatch();
    const tripInfo = useAppSelector(state => state.fetchReducer.data).filter(e => e.id == id);
    let stringdistance = '';
    if (tripInfo[0].distance > 999) {
        stringdistance = `${tripInfo[0].distance / 1000} km`
    } else {
        stringdistance = `${tripInfo[0].distance} m`
    }

    const deleteTrip = async () => {
        const tripDoc = doc(db, 'data', id);
        await deleteDoc(tripDoc);
        dispatch(setShowRouteInfo(false));
        dispatch(setUpdate());
    }

    const addToFavoriteTrip = async () => {
        const tripDoc = doc(db, 'data', id);
        await updateDoc(tripDoc, { favorite: true });
        dispatch(setUpdate());
    }
    const removeFromFavoriteTrip = async () => {
        const tripDoc = doc(db, 'data', id);
        await updateDoc(tripDoc, { favorite: false });
        dispatch(setUpdate());
    }

    return (

        <Box sx={{ width: '100%', maxHeight: '500px', overflow: 'auto' }}>
            <Box sx={{ marginRight: isMobile ? 0 : '1rem' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '1rem' }}>
                    <Typography fontSize={20}>{tripInfo[0].title}</Typography>
                    <Typography fontSize={17}>{stringdistance}</Typography>
                </Box>
                <Typography sx={{ marginTop: '1rem', marginBottom: '1rem', marginLeft: '1rem' }}>{tripInfo[0].fulldescription}</Typography>
                <Box>
                    <MapInfo />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '1rem' }}>
                    {tripInfo[0].favorite ?
                        <Link
                            component="button"
                            variant="body2"
                            onClick={removeFromFavoriteTrip}
                            sx={{ marginBottom: '1rem', marginRight: '1rem' }}
                        >
                            Remove from favorite
                        </Link>
                        :
                        <Link
                            component="button"
                            variant="body2"
                            onClick={addToFavoriteTrip}
                            sx={{ marginBottom: '1rem', marginRight: '1rem' }}
                        >
                            Add to favorite
                        </Link>
                    }

                    <Link
                        sx={{ color: 'red', textDecorationColor: '#ff00008a', marginBottom: '1rem', marginRight: '1rem' }}
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

export default RouteInfo