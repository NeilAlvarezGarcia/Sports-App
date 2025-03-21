export type Mode = 'light' | 'dark';

export interface ThemeContextType {
  mode: Mode;
  palette: Record<string, string | record<string, string>>;
  switchMode: () => void;
}
