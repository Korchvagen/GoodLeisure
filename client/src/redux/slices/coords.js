const initialState = {
  data: null
};

export const setCoords = (coords) => {
  return {
    type: 'SET_VALUE',
    payload: coords
  };
};

const coordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VALUE':
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