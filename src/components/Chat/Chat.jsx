import { 
    SendBirdProvider, 
    Channel,
    ChannelList,
  } from 'sendbird-uikit';
  import 'sendbird-uikit/dist/index.css';
  import {React, useState} from 'react';
  import { Navigation, Footer } from '../index';
  
  const appId = process.env.REACT_APP_SENDBIRD_ID
  
  const ChatApp = (props) => {

    const userId = props.user.id
    const [channelUrl, setChannelUrl] = useState('')
    const [queries] = useState({
      applicationUserListQuery: {
        limit: 0,
        userIdsFilter: [], 
      }
    })

    return (
      <>
      <Navigation {...props}/>
      <SendBirdProvider 
        appId={appId}
        userId={userId} 
        nickname={props.user.publicName}
        profileUrl={props.user.pictureUrl}
        userListQuery={[]}
      >
        <div className='sendbird-app__wrap'>
          {/* <div className = 'sendbird-channel-header sendbird-channel-header__right-icon'> */}
          <ChannelList 
          onChannelSelect={(channel) => {
                if(channel) {
                    setChannelUrl(channel.url)
                }
            }}
            queries={queries}
            />
            <Channel channelUrl={channelUrl} /> 
        </div>

      </SendBirdProvider>
      <Footer />
      </>
    )
  }
  
  export default ChatApp; 
  
  
  
  