const initialState = {
  data: null
};

export const setCoords = (coords) => {
  return {
    type: 'SET_COORDS',
    payload: coords
  };
};

export const resetCoords = (coords) => {
  return {
    type: 'RESET_COORDS',
    payload: coords
  };
};

const coordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COORDS':
      return {
        ...state,
        data: action.payload,
      };
    case 'RESET_COORDS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const selectCoords = (state) => state.coords.data;

export default coordsReducer;