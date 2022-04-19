import React, {useState, useEffect} from 'react';
import RequestComponent from "./RequestComponent";
// import {Navigation} from "./src/components/index"; How do I import something that is outside my folder?

const Request = () => {

    const FirstName = "FirstName";
    const LastName = "LastName";

    return (
        <div className="request">
            {/* <Navigation /> */}
            {/* NEED TO CONDITIONALLY RENDER THESE COMPONENTS */}
            {/* Fetch from DB: This user's list of requests, should return the names of those client users which we can render */}
            {/* OnClick method on pt page should send the name of the client to the DB */}

            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
            <RequestComponent FirstName={FirstName} LastName={LastName}/>
        </div>
    );

}

export default Request;