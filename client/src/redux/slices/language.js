const initialState = {
  data: "ru"
};

export const setLanguage = (language) => {
  return {
    type: 'SET_LANGUAGE',
    payload: language
  };
};

const languagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const selectLanguage = (state) => state.language.data;

export default languagesReducer;