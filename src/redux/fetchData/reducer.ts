export interface TripListTypeNew {
    id: string,
    favorite: boolean,
    distance: number,
    title: string,
    shortdescription: string,
    fulldescription: string,
    markers: []
  }
 export interface FilesState {
    data: TripListTypeNew[];
    loading: boolean;
    error: string | null;
  }
  
   enum FilesActionTypes {
    FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST',
    FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
    FETCH_FILES_FAILED = 'FETCH_FILES_FAILED',
  }

const initialState: FilesState = {
    data: [],
    loading: false,
    error: null,
  };
  
  export const fetchReducer = (state = initialState, action: any): FilesState => {
    switch (action.type) {
      case FilesActionTypes.FETCH_FILES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FilesActionTypes.FETCH_FILES_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FilesActionTypes.FETCH_FILES_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };