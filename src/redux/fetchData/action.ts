import { Dispatch } from 'redux';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase';


enum FilesActionTypes {
  FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
  FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
  FETCH_FILES_FAILED = 'FETCH_FILES_FAILED',
}

export const fetchFilesRequest = () => ({
  type: FilesActionTypes.FETCH_FILES_REQUEST,
});

export const fetchFilesSuccess = (data: any) => ({
  type: FilesActionTypes.FETCH_FILES_SUCCESS,
  payload: data,
});

export const fetchFilesFailed = (error: string) => ({
  type: FilesActionTypes.FETCH_FILES_FAILED,
  payload: error,
});

export const fetchFiles = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchFilesRequest()); 
    try {
      const data = await (await getDocs(collection(db, 'data'))).docs.map((trip) => ({ ...trip.data(), id: trip.id }))
      dispatch(fetchFilesSuccess(data));
    } catch (error:any) {
      dispatch(fetchFilesFailed(error.message));
    }
  };
};