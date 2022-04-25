import untitled from './Untitled.png';
import './App.css';
import React, { Component } from 'react';
import About from './pages/about';
import Home from './pages/home';
import Description from './pages/description';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {

  render() {
    return (
       <Router>
           <div className="App">
            <header className="App-header">
              <img src={untitled} className="App-logo" alt="untitled" />
          
              <h1>
                <Link to="/">Movie List</Link>
              </h1>


              <li>
                <Link to="/about">About Us</Link>
              </li>

              <Routes>
                  <Route exact path='/' element={< Home />}></Route>
                  <Route exact path='/about' element={< About />}></Route>
                  <Route exact path='/description' element={< Description />}></Route>

              </Routes>


            </header>
           </div>
       </Router>
   );
  }
}


export default App;
