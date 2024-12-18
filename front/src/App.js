import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import AppShellComponent from './constructure/app_shell';
import Login from './components/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './rtk/store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorSchemeProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route exact path="/*" element={<AppShellComponent />} />
            </Routes>
          </MantineProvider>
        </ColorSchemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
