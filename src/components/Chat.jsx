import { 
  SendBirdProvider, 
  withSendBird,
  sendBirdSelectors, 
  Channel,
  ChannelList,
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import {React, useState} from 'react';
import { Navigation } from './index';

// import { App as SendBirdApp } from 'sendbird-uikit';
// import styles from './chat.module.css';

const appId = process.env.REACT_APP_SENDBIRD_ID
// consider making a separate function for onClick 

const CustomChannel = ({createChannel, sdk, state}) => {
  //const [channelUrl, setChannelUrl] = useState('')  
  return (
    <>
      <button onClick={() => {
        let params = new sdk.GroupChannelParams()
        params.isPublic = false
        params.isEphemeral = false
        params.isDistinct = true
      
        var userIds = [state.config.userId]

        params.addUserIds(userIds) 
        params.name = "Test"

        createChannel(params) 
        .then(c => {
          //setChannelUrl(c.url)
          console.log(c.url) // do i need to use channelUrl here? 
        })
        .catch(c => console.warn(c))
      }}>
        Message 
      </button>
    </>
    // send message to newly created channel 
  )
}

const CustomChannelWithSendBird = withSendBird(CustomChannel, (state) => {
  console.log(state)

  const createChannel = sendBirdSelectors.getCreateChannel(state)
  const sdk = sendBirdSelectors.getSdk(state)
  return ({createChannel, sdk, state})
})

const ChatApp = (props) => {
  const [channelUrl, setChannelUrl] = useState('')

  return (
    <>
    <Navigation {...props}/>
    <SendBirdProvider 
      appId={appId}
      userId={props.user.email} 
      nickname={props.user.publicName}
      profileUrl={props.user.pictureUrl}
    >
      <CustomChannelWithSendBird />

      {/* <ChannelList onChannelSelect={(channel) => {
        setChannelUrl(channel.url)
      }}/>
      <Channel channelUrl={channelUrl} /> */}
    </SendBirdProvider>
    </>
  )
}

export default ChatApp; 



