import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  CHANGE_STEP,
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false,
  step: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING: {
      return {
        ...state,
        loading: true,
        step: false,
      };
    }
    case GET_PROFILE: {
      return {
        ...state,
        profile: action.payload,
        loading: false,
        step: false,
      };
    }
    case CLEAR_CURRENT_PROFILE: {
      return {
        ...state,
        profile: {},
        loading: false,
        step: false,
      };
    }

    case CHANGE_STEP: {
      return {
        ...state,
        step: action.payload,
        loading: false,
      };
    }
    default:
      return state;
  }
}
