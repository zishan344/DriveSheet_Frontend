import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Trip = lazy(() => import('./pages/Trip'));
const TripDetails = lazy(() => import('./pages/TripDetails'));

function App() {

  return (
    <>
      <Navbar />
      <div>
        <ErrorBoundary>
          <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trips" element={<Trip />} />
              <Route path="/trip/:id" element={<TripDetails />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default App
