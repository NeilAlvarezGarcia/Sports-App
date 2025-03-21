import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';
import { getMode, getPalette } from '../../utils';
import { Mode, ThemeContextType } from './types/theme-context';

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
};

export function ThemeProvider({ children }: PropsWithChildren<ReactNode>) {
  const [mode, setMode] = useState<Mode>(getMode());

  const switchMode = useCallback(() => {
    const neewMode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('mode', neewMode);

    setMode(neewMode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      palette: getPalette(mode),
      switchMode,
    }),
    [mode, switchMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProviderBase theme={value.palette}>{children}</ThemeProviderBase>
    </ThemeContext.Provider>
  );
}
