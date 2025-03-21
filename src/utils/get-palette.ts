import { Mode } from '../context/theme-context/types/theme-context';
import { palette, paletteDark, paletteLight } from '../constants/theme/pallete';

export const getPalette = (mode: Mode) => {
  const modePalette = mode === 'dark' ? paletteDark : paletteLight;

  return {
    ...palette,
    ...modePalette,
  };
};
