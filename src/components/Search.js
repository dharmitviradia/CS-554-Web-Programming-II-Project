import React, { useEffect, useState } from 'react';
import {Button} from '@material-ui/core'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
const Search = () =>{
    const[searchTerm,setSearchTerm] = useState("");
    const[result,setResult] = useState([]);
    const[searcedComp, setsearchedComp] = useState("");
    useEffect(
		() => {
    async function fetchData() {
        try {
            let resultArr = await axios.get(`https://stonk-market-server.herokuapp.com/api/stocks/add/stocks/nyse/companies?searchTerm=${searchTerm}`);
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
    if(! sym[1] || sym[1] === ' ' ){
      setsearchedComp("noData");
    } 
    else{
      setsearchedComp(sym[1].trim());
    }
    
}
        return (
            <div style={{ width: 300, margin: "auto", padding: "10px" }}>
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

            <Button style={{ width: "100%", margin: "auto", padding: "10px" }}><a onClick = {gotoCompPage} href={`/company-page/${searcedComp}`}> Search </a></Button>
           
          </div>
        )
      }

  
export default Search;