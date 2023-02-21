import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open SideBar' }
  | { type: 'UI - Close SideBar' }
  | { type: '[Entry] - Set Is Adding Entry', payload: boolean }
  | { type: '[UI] - Start Dragging' }
  | { type: '[UI] - End Dragging' }

export const uiReducer = (state: UIState, action: UIActionType) => {
  switch (action.type) {
    case 'UI - Open SideBar':
      return { ...state, sideMenuOpen: true };
    case 'UI - Close SideBar':
      return { ...state, sideMenuOpen: false };
    case '[Entry] - Set Is Adding Entry':
      return { ...state, isAddingEntry: action.payload };
    case '[UI] - Start Dragging':
      return { ...state, isDraggingEntry: true };
    case '[UI] - End Dragging':
      return { ...state, isDraggingEntry: false };
    default:
      return state;
  }
};