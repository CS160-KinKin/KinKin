import './HealthInput.css';
import React, {useState, useEffect} from 'react';
import { Footer, Navigation } from '../index';
import {Link, useLocation} from "react-router-dom";
import { createHealthData } from "../../util/healthdata";
// import Button from '@material-ui/core/Button';

const HealthInput = (props) => {
    const [calories, setCalories] = useState("");
    const [distance, setDistance] = useState("");
    const [minutes, setMinutes] = useState("");
    
    
    // Calling the method setProduct from App.js that communicates with the backend to set the products
    // When user clicks button, this method will be called which calls the method to tell the backend to input the info into the db
    // It then gets the result from that to know if it was successful or not
    const inputCheck = async () => {
        try {
            const response = await createHealthData(props.user.token, calories, distance, minutes);
            console.log(response);
            alert("Health Data Uploaded");
        }
        catch(err) {
            console.log(err.message);
        }
        
    }

    return (  
        
        <div className="posting-container">
            <Navigation {...props} />
             <form>
                <span className="info"><b>Enter Today's Health Data</b></span>
                <div className="posting-input-container">
                    <label className='label-minutes'>Calories Burned</label>
                    <div className="health-input">
                        <input type="text" name="calories-burned" required="" value={calories} onChange={(e) => setCalories(e.target.value)}/>
                        <label>Calories</label>
                    </div>	
                </div>
                <div className="posting-input-container">
                    <label className='label-minutes'>Distance Walked, Ran, or Cycled</label>	
                    <div className='health-input'>
                        <input type="text" name="distance" required="" value={distance} onChange={(e) => setDistance(e.target.value)}/>
                        <label>Miles</label>
                    </div>
                </div>
            
                <div className="posting-input-container">
                    <label className='label-minutes'>Minutes Spent Working Out</label>
                    <div className='health-input'>	
                        <input type="text" name="minutes" required="" value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
                        <label>Minutes</label>
                    </div>
                </div>
                <button className='btn1' type="button" onClick={inputCheck}>Upload</button>
                {/* <Link style={{textDecoration: 'none'}} variant="outlined" to='/profile'> <Button style={{ backgroundColor: "dodgerblue", marginBottom: "30px", marginLeft: "30px"}} type="button" className="btn1" onClick={postingCheck}>Post</Button> </Link> */}
            </form>
        </div>
    );
}

export default HealthInput;