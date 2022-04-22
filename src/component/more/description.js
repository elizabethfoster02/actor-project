import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import {
  Link
} from 'react-router-dom';

function Description(props) {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState([]);


  useEffect(() => getDetails(), []);

  const getDetails = () => {
    axios.get(`/api?id=${details.film_id}`) // called api from react app that talks to database
    .then(result => {
      console.log(result.data);
      const myDetails = result.data;
      setDetails(myDetails);
    })
  };
  
  const display_actor = (actor) => {
    return (
      <div key={actor}>
        <li className="actor__name">{actor} </li>
      </div>
    )
  };

  const display_details = (details) => {
    return (
        <div>
          <div key={details.film_id}>
            <h3 className="movie__title"> 
              More information about <i>{details.title} </i> ({details.release_year})
            </h3>
            <p className="movie__description"> {details.description} </p>
            <p className="actor__description"> The following actors performed in <i>{details.title}</i> </p>
            
            <div className={details.actor}> 
              {details.actor_list.map(display_actor)}
            </div>
            

            {/* <li>
              <Link to={`/description?id=${details.film_id}`}> More info </Link>
            </li> */}
          </div>
        </div>
    )
  }

  return (
      <div>
        {/* <p>hello, {searchParams.get("id")}</p> */}

        {details.map(display_details)}

        {/* <div key={details.film_id}>
            <h3 className="movie__title"> 
              More information about <i>{details.title} </i> ({details.release_year})
            </h3>
            <p className="movie__description"> {details.description} </p>
            <p className="actor__description"> The following actors performed in <i>{details.title}</i> </p>
            
            <div className={details.actor}> 
            
              {display_actor(details.actor_list)}
            </div> */}
            

            {/* <li>
              <Link to={`/description?id=${details.film_id}`}> More info </Link>
            </li> */}
        {/* </div> */}

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