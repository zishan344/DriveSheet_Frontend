import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Trip = lazy(() => import('./pages/Trip'));
const TripDetails = lazy(() => import('./pages/TripDetails'));

function App() {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Suspense
          fallback={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 80px)',
                gap: 2,
              }}
            >
              <CircularProgress size={50} />
              <Typography variant="h6" color="textSecondary">
                Loading...
              </Typography>
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trip />} />
            <Route path="/trip/:id" element={<TripDetails />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App

