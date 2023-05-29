const initialState = {
  isLoading: false
};

export const setLoading = (isLoading) => {
  return {
    type: 'SET_LOADING',
    payload: isLoading
  };
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export const selectLoadingStatus = (state) => state.loading.isLoading;

export default loadingReducer;