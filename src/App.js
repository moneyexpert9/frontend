import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddInvestment from './components/AddInvestment';
import SearchInvestment from './components/SearchInvestment';
import EditInvestment from './components/EditInvestment';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SearchInvestment />} />
                <Route path="/add" element={<AddInvestment />} />
                <Route path="/edit/:id" element={<EditInvestment />} />
            </Routes>
        </Router>
    );
};

export default App;
