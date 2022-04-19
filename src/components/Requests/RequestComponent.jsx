import React, {useState, useEffect} from 'react';
import './requestcomponent.css';

const RequestComponent = (props) => {
    return (
        <div className="request-container">
            <div className="client-name">
                <h1>{props.FirstName} {props.LastName}</h1>
            </div>
            <div className="buttons">
                <button type="button" className="accept-btn" /*onClick={}*/>Accept</button>
                <button type="button" className="reject-btn" /*onClick={}*/>Reject</button>
            </div>
        </div>
    );
}

export default RequestComponent;