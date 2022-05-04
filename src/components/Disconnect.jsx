import {
    SendBirdProvider,
    withSendBird,
    sendBirdSelectors,
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css"
import React from 'react';

const appId = process.env.APP_ID; 
const userId = "eunice.oh@sjsu.edu";

function disconnect(props) {
    // props.disconnect().then((reject, response) => {
    //     // do something?? 
    // })
}

const MyButton = (props) => {
    <button onClick={disconnect(props)} >
        Disconnect
    </button>
}

const ButtonWithSendBird = withSendBird(
    MyButton, 
    (state) => {
        disconnect: sendBirdSelectors.getDisconnect(state)
    }
)

const Disconnect = () => {
    <SendBirdProvider appId={appId} userId={userId}>
        <div>
            <ButtonWithSendBird />
        </div>
    </SendBirdProvider>
}

export default Disconnect; 

