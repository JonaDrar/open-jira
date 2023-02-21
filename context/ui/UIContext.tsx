import { createContext } from 'react';

interface ContextProps {
  //Properties
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggingEntry: boolean;

  //Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;

  setIsAddingEntry: (value: boolean) => void;

  startDraggingEntry: () => void;
  endDraggingEntry: () => void;
}

export const UIContext = createContext({} as ContextProps);