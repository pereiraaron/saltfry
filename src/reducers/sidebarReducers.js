import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from '../constants/sidebarConstants';

export const sidebarReducer = (state = { isSidebarOpen: false }, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    default:
      return state;
  }
};
