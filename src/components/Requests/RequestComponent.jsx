import React, {useState, useEffect} from 'react';
import './requestcomponent.css';
import { acceptRequest } from "../../util/pt";
import { deleteRequest } from "../../util/pt";

const RequestComponent = (props) => {
  
    const onAcceptRequest = async () => {
        try {
            const response = await acceptRequest(props.user.token, props.name);
            alert("Request Accepted");
        }
        catch (err) {
            alert("Could not accept request");
            console.log("not working" + err.message);
        }
    }

    const onRejectRequest = async () => {
        try {
            const response = await deleteRequest(props.user.token, props.name);
            alert("Request Rejected");
        }
        catch (err) {
            alert("Could not reject request");
            console.log("not working" + err.message);
        }
    }

    return (
        <div className="request-container">
            <div className="client-name">
                <h1>{props.name}</h1>
            </div>
            <div className="buttons">
                <button type="button" className="accept-btn" onClick={onAcceptRequest}>Accept</button>
                <button type="button" className="reject-btn" onClick={onRejectRequest}>Reject</button>
            </div>
        </div>
    );
}

export default RequestComponent;