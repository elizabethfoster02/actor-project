import React, { useState, useEffect } from 'react';
import axios from "axios";

import {
    Link
  } from 'react-router-dom';

function Home(props) {

    const [movies, setMovies] = useState([]);
  
    const getMovies = () => {
      axios.get("/api") // called api from react app that talks to database
      .then(result => {
        console.log(result.data);
        const myMovies = result.data;
        setMovies(myMovies);
      })
    };
  
    useEffect(() => getMovies(), []);
  
    const display_movie = (movies) => {
      return (
        <div key={movies.film_id}>
          <h3 className="movie__title"> {movies.title} </h3>
            <li>
              <Link to={`/description?id=${movies.film_id}`}> More info </Link>
            </li> 
        </div>
      )
    }
  
    return (
      <div className={movies.list}>
          {movies.map(display_movie)}
      </div>
    )
  }
 
export default Home;