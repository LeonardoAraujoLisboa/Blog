/* eslint-disable prettier/prettier */
import { render, RenderResult } from '@testing-library/react';
import { BlogThemeProvider } from '../contexts/blogThemeContext';


export const renderTheme = (children: React.ReactNode): RenderResult => {
  return render(<BlogThemeProvider>{children}</BlogThemeProvider>);
};
