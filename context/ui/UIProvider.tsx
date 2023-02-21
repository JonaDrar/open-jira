import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggingEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDraggingEntry: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open SideBar' });
  };

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close SideBar' });
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({ type: '[Entry] - Set Is Adding Entry', payload: value });
  };

  const startDraggingEntry = () => {
    dispatch({ type: '[UI] - Start Dragging' });
  };

  const endDraggingEntry = () => {
    dispatch({ type: '[UI] - End Dragging' });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,

        
        //Methods
        openSideMenu,
        closeSideMenu,

        setIsAddingEntry,

        startDraggingEntry,
        endDraggingEntry,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
