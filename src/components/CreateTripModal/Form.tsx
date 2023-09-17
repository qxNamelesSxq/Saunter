import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setOpenModal } from '../../redux/setOpenModal/setOpenModal';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { setUpdate } from '../../redux/setUpdate/setUpdate';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@material-ui/core';

const Form = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    const databaseCollection = collection(db, 'data');

    const dispatch = useAppDispatch();
    const distance = useAppSelector(state => state.setDistanceReducer.distance);
    const markers = useAppSelector(state => state.setMarkersArrayReducer.arr)
    const [title, setTitle] = useState('');
    const [sdescription, setSdescription] = useState('');
    const [fdescription, setFdescription] = useState('');
    let stringdistance = '';
    if (distance > 999) {
        stringdistance = `${distance / 1000} km`
    } else {
        stringdistance = `${distance} m`
    }

    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleSubmit = async () => {
        if (title.trim().length > 0 && sdescription.trim().length > 0 && fdescription.trim().length > 0 && distance > 0) {
            let obj = {
                title: title.trim(),
                shortdescription: sdescription.trim(),
                fulldescription: fdescription.trim(),
                markers: markers,
                distance: distance,
                favorite: false
            };
            try {
                await addDoc(databaseCollection, obj)
            } catch (err) {
                console.error(err)
            }
            dispatch(setOpenModal(false));
            dispatch(setUpdate())
        } else {
            setOpen(true);
        }
    };

    return (
        <>
            <Stack
                component="form"
                sx={{
                    marginTop: '10px',
                    width: isMobile ? '35ch' : '40ch',
                    alignItems: 'center'
                }}
                spacing={3}
                noValidate
                autoComplete="off">
                <TextField fullWidth id="outlined-multiline-flexible" label="Title" onChange={e => setTitle(e.target.value)} />
                <TextField helperText={`${sdescription.length}/160`} FormHelperTextProps={{ style: { marginLeft: 'auto' } }} fullWidth id="outlined-textarea" label="Short description" inputProps={{ maxLength: 160 }} multiline rows={2} onChange={e => setSdescription(e.target.value)} />
                <TextField fullWidth id="outlined-multiline-static" label="Full description" multiline rows={4} onChange={e => setFdescription(e.target.value)} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MapOutlinedIcon /><Typography>Length {stringdistance}</Typography>
                </Box>
                <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleSubmit}>Add path</Button>
            </Stack>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Error! Some data is empty!
                </Alert>
            </Snackbar>
        </>

    );
};

export default Form