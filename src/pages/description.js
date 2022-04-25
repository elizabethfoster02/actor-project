import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import {
  Link
} from 'react-router-dom';

function Description(props) {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState();

  useEffect(() => getDetails());

  const getDetails = () => {
    axios.get(`/api/movies?id=${searchParams.get("id")}`) // called api from react app that talks to database
    .then(result => {
      console.log(result.data);
      const myDetails = result.data;
      setDetails(myDetails);
    })
  };
  
  if (!details) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )}
    return (

      <div>
            <h3 className="movie__title"> 
              More information about <i>{details.title} </i> ({details.release_year})
            </h3>
            <p className="movie__description"> {details.description} </p>
            <p className="actor__description"> The following actors performed in <i>{details.title}</i> </p>
            
            <div>
              {details.actor_list.map( val => {return <li className="actor__name" key={val}>{val}</li>} )}
            </div>


        <Link to={`/`}>
          <button> Back to movie list </button>
        </Link>
      </div>
    )
}
 
export default Description;