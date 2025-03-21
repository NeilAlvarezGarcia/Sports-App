import { Mode } from '../context/theme-context/types/theme-context';

export const getMode = () => {
  const mode = localStorage.getItem('mode');

  return (mode || 'light') as Mode;
};
