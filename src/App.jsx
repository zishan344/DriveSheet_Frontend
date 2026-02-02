import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Trip from './pages/Trip';
import TripDetails from './pages/TripDetails';

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trip />} />
        <Route path="/trip/:id" element={<TripDetails />} /> 
      </Routes>
    </div>
    </>
  )
}

export default App
