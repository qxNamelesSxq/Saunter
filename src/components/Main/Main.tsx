import { Paper } from "@mui/material";
import Header from "../Header/Header";
import RouteList from "../RouteList/RouteList";
import RouteInfo from "../RouteInfo/RouteInfo";
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../redux/hook';
import { useMediaQuery } from '@material-ui/core';



const Main = () => {
    const show = useAppSelector(state => state.setShowRouteInfoReducer.show)
    const isMobile = useMediaQuery('(max-width: 600px)')

    return (
        <Paper elevation={3} style={{ width: isMobile ? '98vw' : '900px', minHeight: isMobile ? '100px' : '600px', marginTop: '1rem', marginBottom: '1rem' }}>
            <Header />
            <Stack
                direction={isMobile ? 'column' : 'row'}
                divider={isMobile ? <Divider orientation="horizontal" flexItem /> : <Divider orientation="vertical" flexItem />}
                spacing={2}
                style={{ height: isMobile ? 'auto' : '500px', marginRight: isMobile ? 0 : '1rem' }}
            >
                <RouteList />
                {show ? <RouteInfo /> : <></>}
            </Stack>
        </Paper>
    );
};

export default Main