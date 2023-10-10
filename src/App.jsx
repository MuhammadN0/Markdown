import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppPage from './pages/AppPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './ui/ProtectedRoute';
import UnProtectedRoute from './ui/UnProtectedRoute';
import { SearchProvider } from './context/SearchProvider';
import UserPage from './pages/UserPage';
import ForgotPassword from './pages/ForgotPassword';
const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Poppins', sans-serif;
}
:root{
  //Terkoiz
  --nav-terkoiz: #95BEAF;
  --main-terkoiz: #B8F0DC;
  --white-terkoiz: #EAFFF9;
  --light-terkoiz: #DBEBE5;
  --mid-terkoiz: #BBE2D4;
  --dark-terkoiz: #6AAC94;
  --darker-terkoiz: #5C9681;

  --black: #000;
  --text-gray: #717776;
  --placeholder-gray: #555555;
  --white: #fff;
  --blue: #185640;
}
button {
  cursor: pointer;
  border: none;
  &:disabled{
    cursor: not-allowed;
  }
}
a{
  text-decoration: none;
  color: var(--black)
}
ul{
  list-style: none;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`;

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Toaster />
        <ReactQueryDevtools />
        <GlobalStyles />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                index
                path="/"
                element={
                  <ProtectedRoute>
                    <AppPage />
                  </ProtectedRoute>
                }
              />
              <Route
                index
                path="/userpage"
                element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <UnProtectedRoute>
                    {' '}
                    <Login />
                  </UnProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <UnProtectedRoute>
                    <Signup />
                  </UnProtectedRoute>
                }
              />
              <Route
                path="/forgotpassword"
                element={
                  <UnProtectedRoute>
                    <ForgotPassword />
                  </UnProtectedRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SearchProvider>
    </QueryClientProvider>
  );
}

export default App;
