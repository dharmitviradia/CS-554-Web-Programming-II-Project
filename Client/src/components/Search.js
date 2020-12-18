import React, { useEffect, useState } from 'react';

import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Company from './CompanyPage'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

const Search = () =>{
    const[searchTerm,setSearchTerm] = useState("");
    const[result,setResult] = useState([]);
    const[searcedComp, setsearchedComp] = useState("");
    useEffect(
		() => {
    async function fetchData() {
        try {
            let resultArr = await axios.get(`http://localhost:4040/api/stocks/add/stocks/nyse/companies?searchTerm=${searchTerm}`);
            console.log(resultArr.data);
            setResult(resultArr.data);
            console.log(result);
            
        } catch (e) {
            console.log(e+"////////////////////////////////////////////");
        }
    
    }
    fetchData();
},[]);

const gotoCompPage =()=>{
    let sym = searchTerm.split(":");
    setsearchedComp(sym[1].trim());
}
        return (
            <div style={{ width: 300 }}>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              onChange={(eevent, newValue) => {
                setSearchTerm(newValue)

              }
                
            }
              options={result.map((option) => option["Company Name"] + " : " + option["Symbol"])}
              renderInput={(params) => (
                <TextField {...params} label="Stocks" margin="normal" variant="outlined" />
              )}
            />

            <a onClick = {gotoCompPage} href={`/company-page/${searcedComp}`}> Goto CompanyPage </a>
           
          </div>
        )
      }

  
export default Search;