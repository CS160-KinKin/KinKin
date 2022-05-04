import { 
  SendBirdProvider, 
  withSendBird,
  sendBirdSelectors, 
  Channel,
  ChannelList,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import {React, useState} from 'react';
import { useEffect } from 'react';

// import { App as SendBirdApp } from 'sendbird-uikit';
// import styles from './chat.module.css';
// import { Navigation } from './index';

const appId = process.env.REACT_APP_SENDBIRD_ID
const userId = "eunice.oh@sjsu.edu"
// consider making a separate function for onClick 

const CustomChannel = ({createChannel, sdk}) => {
  //const [channelUrl, setChannelUrl] = useState('')

  return (
    <>
      <button onClick={() => {

        let params = new sdk.GroupChannelParams()
        params.isPublic = false
        params.isEphemeral = false
        params.isDistinct = false
        params.addUserIds(['eunice.oh@sjsu.edu'])
        params.name = "Test"

        createChannel(params) 
        .then(c => {
          //setChannelUrl(c.url)
          console.log(c.url) // do i need to use channelUrl here? 
        })
        .catch(c => console.warn(c))
      }}>
        Create Channel 
      </button>
    </>
  )
}

const CustomChannelWithSendBird = withSendBird(CustomChannel, (state) => {
  console.log(state)

  const createChannel = sendBirdSelectors.getCreateChannel(state)
  const sdk = sendBirdSelectors.getSdk(state)
  return ({createChannel, sdk})
})

// const CustomMessageWithSendBird = withSendBird(CustomMessage, (state) => {
//   const sendMessage = sendBirdSelectors.getSendUserMessage(state)
//   const sdk = sendBirdSelectors.getSdk(state); 
// })

const ChatApp = (props) => {
  const [channelUrl, setChannelUrl] = useState('')

  return (
    <SendBirdProvider 
      appId={appId}
      userId={userId} // change to props
    >
      <CustomChannelWithSendBird />
      <ChannelList onChannelSelect={(channel) => {
        setChannelUrl(channel.url)
      }}/>
      <Channel channelUrl={channelUrl} />
    </SendBirdProvider>
  )
}

export default ChatApp; 

// // {/* <SendBirdApp
// //             appId={process.env.REACT_APP_SENDBIRD_ID}
// //             userId={props.user.email}
// //             nickname={props.user.publicName}
// //             profileUrl={props.user.pictureUrl}
// //           /> */}


