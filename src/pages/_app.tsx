import { AppProps } from 'next/app';
import { GlobalStyles } from '../styles/global-styles';
import { BlogThemeProvider } from '../contexts/blogThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BlogThemeProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </BlogThemeProvider>
  );
}

export default MyApp;
