import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from '../constants/sidebarConstants';
import { Action, SidebarState } from '../types';

export const sidebarReducer = (
  state: SidebarState = { isSidebarOpen: false },
  action: Action
): SidebarState => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    default:
      return state;
  }
};

