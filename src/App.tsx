import React from 'react';
import './App.css';
import {
  AppLayout,
  Dashboard,
  Customers,
  CustomerDetails,
  CustomerCreate,
  CustomerEdit,
} from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route as RouteName } from './utils/enums';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path={RouteName.Base}
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path={RouteName.Customers}
            element={
              <AppLayout>
                <Customers />
              </AppLayout>
            }
          />
          <Route
            path={`${RouteName.Customers}/:id${RouteName.Details}`}
            element={
              <AppLayout>
                <CustomerDetails />
              </AppLayout>
            }
          />
          <Route
            path={`${RouteName.Customers}${RouteName.Create}`}
            element={
              <AppLayout>
                <CustomerCreate />
              </AppLayout>
            }
          />
          <Route
            path={`${RouteName.Customers}/:id${RouteName.Edit}`}
            element={
              <AppLayout>
                <CustomerEdit />
              </AppLayout>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
