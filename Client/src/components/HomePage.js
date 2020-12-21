import React, { useEffect, useState } from 'react';

import axios from 'axios';



const Profile = (props) =>{
    const [ mystocks, setmystocks] = useState("");
    const [ wishlist, setwishlist] = useState("");
    const [ loading, setLoading ] = useState(true);

    useEffect(
        () =>{
          async function getwishlist(){
          try {
            let wishlist  = await axios.get(`http://localhost:4040/api/stock/wishlist`)
            setwishlist(wishlist.data)
            setLoading(false)
          }
          catch(e){
            console.log(e)
            setLoading(false)
          }
        }
      getwishlist()
    },[])

    useEffect(
      () =>{
        async function getmystocks(){
        try {
          let mystocks  = await axios.get(`http://localhost:4040/api/stock/mystocks`)
          setmystocks(mystocks.data)
          setLoading(false)
        }
        catch(e){
          console.log(e)
          setLoading(false)
        }
      }
    getmystocks()
  },[])

    return(
      <div className="homePage">
          <h1>Welcome to Stock Market</h1>
      </div>
    )

}


export default Profile;