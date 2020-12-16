import React, { useState, useEffect, useRef } from 'react';
import {Button} from '@material-ui/core'
import axios from 'axios'
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Search = () =>{


    const [ searchText, setsearchText] = useState("");
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

        //Function for the modal when opened
        const handleOpen = async () => {
            const data = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=LHLF23MXIQE2SEJK`);
            console.log("_______________________Companies Searched __________________")
            setOpen(true);
          };
        
      
          //Function for the modal when closed
          const handleClose = () => {
            setOpen(false);
          };
   
          
    const searchFunction = (e) =>{
        console.log(e.target.value);
        setsearchText(e.target.value);
    }

    return (
        <div>
            <form>
                <label>
                    <input type="text" onChange={searchFunction}>
                    </input>
                    <Button value="Search" onClick={handleOpen}>
                        Search
                    </Button>
                    <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Search Results</h2>
                </div>
                <Button  onClick={handleClose}> Close </Button>
                </Fade>
            </Modal>
                </label>
            </form>
        </div>

    )

}

export default Search;