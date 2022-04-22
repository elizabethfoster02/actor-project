import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import {
  Link
} from 'react-router-dom';

function Description(props) {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState([]);

  const getDetails = () => {
    axios.get("/api/movies") // called api from react app that talks to database
    .then(result => {
      console.log(result.data);
      const myDetails = result.data;
      setDetails(myDetails);
    })
  };

  useEffect(() => getDetails(), []);

  const display_actor = (actor) => {
    return (
      <div key={actor}>
        <p className="actor__name"> {actor} </p>
      </div>
    )
  }

  const display_details = (details) => {
    return (
        <div>
          <div key={details.film_id}>
            <h3 className="movie__title"> 
              More information about <i>{details.title} </i> ({details.release_year})
            </h3>
            <p className="movie__description"> {details.description} </p>
            {display_actor(details.actors)}
            

            {/* <li>
              <Link to={`/description?id=${details.film_id}`}> More info </Link>
            </li> */}
          </div>
        </div>
    )
  }

  return (
      <div>
        <div className={details.list}>
          {details.map(display_details)}
        </div>

        {/* <p>hello, {searchParams.get("id")}</p> */}
        {/* {details.map(display_details)} */}

        {/* <Link to={`/description?id=${searchParams.get("id")+"1"}`}>
          <button> Next movie </button>
        </Link> */}
        <Link to={`/`}>
          <button> Back to movie list </button>
        </Link>
      </div>
  )
}
 
export default Description;