import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Plot from 'react-plotly.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Search from './Search';


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

    center:{
        margin: "auto",
        width: "50%",
        padding: "10px"
    },

    image:{
        width: "10%",
        paddingRight:"5px"
    },

    title : {
        fontSize:"150%",
        fontFamily:"Times New Roman",
        margin: "auto",
        width: "50%",
        padding: "10px",
        textDecoration:"none !important",
        color: "black !important"
    },

    subTitle:{
        fontSize:"110%",
        fontFamily:"Times New Roman",
        margin: "auto",
        width: "50%",
        padding: "10px",
        textDecoration:"none !important",
        color: "black !important"
    },

    mainBody :{
        marginTop:"10%",
        margin: "auto",
        width: "50%",
        padding: "10px"
    },

    innerBody :{
        marginTop:"10%",
    },
    button: {
        width:'20%',
        margin:'5%',
        padding:'2%',
        background: '#00CC00',
        color: '#ffffff',
        fontSize: 17,
        fontFamily:'Roboto Mono',
    },


  }));


const CompanyPage = (props) => {

    const [ companyData, setCompanyData ] = useState(undefined);
    const [ stockData, setStockData ] = useState("");
    const [ stockChartXValues, setStockChartXValues ] = useState("");
    const [ stockChartYValues, setStockChartYValues ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ loading2, setLoading2 ] = useState(true);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [ stocksLeft, setStocksLeft ] = useState("0");
    const [exceedText, setexceedText] = useState(" ");
  
    //Function for the modal when opened
    const handleOpen = () => {
      setOpen(true);
    };
  

    //Function for the modal when closed
    const handleClose = () => {
      setOpen(false);
    };

    //hook for getting the company Data
    useEffect(
		() => {
    async function fetchData() {
        
        try {
            let API_Call = `https://finnhub.io/api/v1/stock/profile2?symbol=${props.match.params.id}&token=bv67ig748v6phr4ccf60`
            const { data} = await axios.get(API_Call);
            setCompanyData(data);
            setLoading(false);
            
        } catch (e) {
            console.log(e+"////////////////////////////////////////////");
            setLoading(false);
        }
    
    }

    fetchData();
},[]);



//Hook for getting the company stock data
useEffect(
    () => {
async function fetchData() {
    try {
        const API_KEY = 'bv67ig748v6phr4ccf60';
        let StockSymbol = props.match.params.id;
        let API_Call = `https://finnhub.io/api/v1/quote?symbol=${StockSymbol}&token=${API_KEY}`;

        fetch(API_Call)
                .then(
                function(response) {
                    return response.json();
                }
                )
                .then(
                function(sdata) {
                    console.log(sdata);
                    setStockData(sdata);
                }
                )

                setLoading2(false);
        
    } catch (e) {
        console.log(e+"*****************************************");
        setLoading2(false);
    }

}


fetchData();
},[]);
// console.log(this.props.match.params.id)
// Hook to get data from the graph
useEffect(()=>{
    function fetchStock() {
        const API_KEY = 'LHLF23MXIQE2SEJK';
        let StockSymbol = props.match.params.id;
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
    
        fetch(API_Call)
          .then(
            function(response) {
              return response.json();
            }
          )
          .then(
            function(data) {
              console.log(data);
    
              for (var key in data['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
              }
    
              // console.log(stockChartXValuesFunction);
              setStockChartXValues(stockChartXValuesFunction)
              setStockChartYValues(stockChartYValuesFunction)
            }
          )
      }

      fetchStock();
},[]);



const onChange = () => {
    
    if (parseInt(stocksLeft,10)> parseInt(companyData.shareOutstanding,10)){
        setexceedText("You've Exceeded the Limit ");
    }
    else{
        setexceedText("");
    }

    
};



    
    if(!props.match.params.id || props.match.params.id.trim() === "")
    {
        return(
			<div>
				<h2>Props Not supplied....</h2>
			</div>
        );
    }

    else if(props.match.params.id==="noData"){
        console.log("llllllllll"+props.match.params.id);
        return(
            <div className={classes.title}  style={{margin:'35%'}}>
                <h2>Page 404</h2>
            </div>
        );
    }

    else if (loading || loading2) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else if(companyData && stockData) {

    return(
        <div className={classes.mainBody}>
            <Search></Search>
            <div className={classes.innerBody}>
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
                    <h2 id="transition-modal-title">Select the number of stocks </h2>
                    <p>Max Quantity available {companyData.shareOutstanding}</p>
                    <form onChange={(e) => setStocksLeft(e.target.value)}>
                        <label>
                            Quantity:
                            <input type="number" name="name" />
                        </label>
                            <div>
                            <input type="button" onClick={onChange} value="Submit" />
                            <p style={{color:"red"}} value-={exceedText}>
                                {exceedText}
                            </p>
                            </div>
                       
                        <Button  onClick={handleClose}> Close </Button>
                    </form>
                </div>
                </Fade>
            </Modal>
            <div >
                <div className={classes.center} style={{marginLeft:"35%"}}>
                    <img className={classes.image} src={companyData.logo} alt={"Company Logo"}/>
                    <a href={companyData.weburl} className={classes.title}>{companyData.name} </a>
                    <Button onClick={handleOpen} className={classes.button}>
                        Buy
                    </Button>
                </div>
                <div>
                <Button onClick={handleOpen} className={classes.button}>
                        Add to Wishlist 
                    </Button>
                </div>
                <div className={classes.center}>
                    <div className={classes.subTitle}> Trading at ${stockData.o}   Low : ${stockData.l}     <br/> High : ${stockData.h}</div>
                    </div>
                </div>
            <div  >

                <div style={{fontFamily:'Times New Roman', marginBottom:"2%"}}>6 month Graph</div>
                <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440}}
        />

            </div>
        </div>
        </div>
    )
}

else{
    return (
        <div>
            <h2>null....</h2>
        </div>
    );
}

}

export default CompanyPage;