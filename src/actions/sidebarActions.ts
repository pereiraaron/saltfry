import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from '../constants/sidebarConstants';
// Types are now global - no import needed

export const openSidebar = () => (dispatch: $TSFixMe) => {
  dispatch({
    type: SIDEBAR_OPEN,
  });
};

export const closeSidebar = () => (dispatch: $TSFixMe) => {
  dispatch({
    type: SIDEBAR_CLOSE,
  });
};

