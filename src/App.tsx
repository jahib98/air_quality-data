import React from 'react';
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import './App.css';
import ListingData from "./ListingData/ListingData";
import ListingDetails from "./ListingData/ListingDetails";
import DataContextProvider from "./context/DataContext";

function App() {
  return (
      <Router>
          <DataContextProvider>
        <Routes>
            <Route path='/' element={<ListingData />} />
            <Route path='/listing/details/:id' element={<ListingDetails />} />
        </Routes>
          </DataContextProvider>
      </Router>
  );
}
export default App;
