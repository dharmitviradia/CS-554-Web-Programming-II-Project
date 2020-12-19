import React, { useEffect, useState } from 'react';

import axios from 'axios';



const Profile = (props) =>{
    const [ mystocks, setmystocks] = useState();
    const [ wishlist, setwishlist] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(
        () =>{
            
        }
    )

    return(
      <div>
        <h1>Profile</h1>
      </div>
    )

}


export default Profile;