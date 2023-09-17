import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setId } from '../../redux/setId/setId';
import { setShowRouteInfo } from '../../redux/setShowRouteInfo/setShowRouteInfo';

interface TripListType {
    id: string,
    favorite: boolean,
    distance: number,
    title: string,
    shortdescription: string,
    fulldescription: string,
    markers: []
}


const ShortTripInfo = ({ id, favorite, distance, title, shortdescription }: TripListType) => {

    let bckgcolor = '#a0a0a01c';
    let color = 'balack'
    const choseId = useAppSelector(state => state.setIdReducer.id)
    if (choseId == id) {
        bckgcolor = '#4a98e5'
        color = 'white'
    } else {
        bckgcolor = '#a0a0a01c'
        color = 'balack'
    }

    const dispatch = useAppDispatch();
    let stringdistance = '';
    if (distance > 999) {
        stringdistance = `${distance / 1000} km`
    } else {
        stringdistance = `${distance} m`
    }

    const handleClick = () => {
        dispatch(setId(id));
        dispatch(setShowRouteInfo(true));
    }

    return (
        <ListItemButton sx={{
            backgroundColor: bckgcolor,
            marginTop: '0.5rem',
            marginRight: '0.5rem',
            borderRadius: 1,
            color: color,
            '&:hover': {
                backgroundColor: bckgcolor
            }
        }} onClick={handleClick}>
            <ListItemIcon>{favorite ? <StarIcon sx={{ color: color }} /> : <></>}</ListItemIcon>
            <ListItemText sx={{ width: '8rem', minHeight: '40px', color: color, overflow: 'auto' }} secondaryTypographyProps={{ sx: { color: color } }} primary={title} secondary={shortdescription} />
            <ListItemText primary={stringdistance} />
            <ListItemIcon><ArrowForwardIosIcon fontSize='small' sx={{ marginLeft: 'auto', color: color }} /></ListItemIcon>
        </ListItemButton>
    );
};

export default ShortTripInfo