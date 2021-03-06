import { 
  SendBirdProvider, 
  withSendBird,
  sendBirdSelectors, 
} from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';
import {React, useContext} from 'react';
import ChatContext from './ChatContext'
import '../Marketplace/marketplace.css'

const appId = process.env.REACT_APP_SENDBIRD_ID

const CustomChannel = ({createChannel, sdk, sendMessage}) => {
  const props = useContext(ChatContext)

  return (
    <>
      <button className='request-btn' onClick={() => {
        let message = prompt("Send an initial message:", "Hi! I am interested in being your client...")

        let channelParams = new sdk.GroupChannelParams()
        channelParams.isPublic = false
        channelParams.isEphemeral = false
        channelParams.isDistinct = true 
      
        const ptId = props.pt.id
        const userIds = [ptId]
        channelParams.addUserIds(userIds) 

        createChannel(channelParams) 
        .then(c => {
          return c
        })
        .then(c => {
          let msgParams = new sdk.UserMessageParams()
          msgParams.message = message

          sendMessage(c.url, msgParams)
          .then((pendingMessage) => {
            return pendingMessage
          })
          .then(message => {
            console.warn(message)
          })
          .catch(c => console.warn(c))
        })
        .catch(c => console.warn(c))
      }}>
        Message 
      </button>
    </>

  )
}

const CustomChannelWithSendBird = withSendBird(CustomChannel, (state) => {
  const createChannel = sendBirdSelectors.getCreateChannel(state)
  const sdk = sendBirdSelectors.getSdk(state)
  const sendMessage = sendBirdSelectors.getSendUserMessage(state)
  return ({createChannel, sdk, sendMessage})
})

const ChatButton = (props) => {
  const userId = props.user.id

  return (
    <>
    <SendBirdProvider 
      appId={appId}
      userId={userId} 
      nickname={props.user.publicName}
      profileUrl={props.user.pictureUrl}
    >
      <ChatContext.Provider value={props}> 
          <CustomChannelWithSendBird />
      </ChatContext.Provider>

    </SendBirdProvider>
    </>
  )
}

export default ChatButton; 



