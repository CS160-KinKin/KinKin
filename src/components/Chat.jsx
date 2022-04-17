// user logs into sendbird

// APP ID: 45391E28-BD64-49C5-89A5-C14E1A5E5A0C
// User ID: user1
// Nickname: eunice 

// User can select a PT they are interested in 

import { SendBirdProvider, withSendBird } from "sendbird-uikit";

import {App as SendBirdApp} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import styles from './chat.module.css'

import React from "react";
import {Navigation} from "./index";

var YOUR_APP_ID = "45391E28-BD64-49C5-89A5-C14E1A5E5A0C"
var USER_ID = "user1" // pass in correct USER_ID based on login 

const ChatApp = (props) => {
    console.log(props.user)
    return (
        <>
        <Navigation />
        <div className={styles.App}>
            <SendBirdApp 
                appId={YOUR_APP_ID} 
                userId={props.user.email}
                nickname={props.user.name}
                profileUrl={props.user.picture}
            />
        </div>
        </>
    );
};

export default ChatApp; 

