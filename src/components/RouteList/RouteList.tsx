import { useState, useEffect } from 'react';
import ShortTripInfo from './ShortTripInfo';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFiles } from '../../redux/fetchData/action';
import { useMediaQuery } from '@material-ui/core';


const RouteList = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');

    const dispatch = useAppDispatch();
    const update = useAppSelector(state => state.setUpdateReducer.update);
    const [searchText, setSearchText] = useState('');
    const tripList = useAppSelector(state => state.fetchReducer.data);
    useEffect(() => {
        dispatch(fetchFiles());
    }, [update]);


    const filteredTripList = tripList.filter(
        (item) =>
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.fulldescription.toLowerCase().includes(searchText.toLowerCase())
    );

    filteredTripList.sort((a, b) => {
        if (a.favorite && !b.favorite) {
            return -1;
        }
        if (!a.favorite && b.favorite) {
            return 1;
        }
        return 0;
    });


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper
                component="form"
                elevation={3}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: isMobile ? '80vw' : 400, marginLeft: '1rem', marginTop: '1rem' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search trip' }}
                    onChange={e => setSearchText(e.target.value)}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <List
                sx={{

                    width: '100%',
                    maxWidth: '95%',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 500,
                    marginTop: '1rem',
                    marginLeft: '1rem'

                }}

            >
                {filteredTripList.map(info => <ShortTripInfo {...info} key={info.id} />)}
            </List>

        </Box>
    );
};

export default RouteList