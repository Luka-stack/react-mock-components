import { v4 as uuidv4 } from 'uuid';
import { ReactNode, createContext, useContext, useRef } from 'react';

const NavigationMenuItemContext = createContext<string>('');

export function NavigationMenuItemProvider({
  children,
}: {
  children: ReactNode;
}) {
  const baseId = useRef(uuidv4());

  return (
    <NavigationMenuItemContext.Provider value={baseId.current}>
      {children}
    </NavigationMenuItemContext.Provider>
  );
}

export function useNavigationItemContext() {
  const context = useContext(NavigationMenuItemContext);

  if (context === undefined) {
    throw new Error(
      'useNavigationItemContext must be used within a NavigationMenuItemProvider'
    );
  }

  return context;
}
