import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WindPredictionComponent from './components/WindPredictionComponent';
import About from './components/About';
import ProjectDoneBy from './components/ProjectDoneBy';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Header />

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/project">Range Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Predict values</Link>
              </li>
              
            </ul>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<WindPredictionComponent />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<ProjectDoneBy />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
