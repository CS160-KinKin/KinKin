import { SendBirdProvider, withSendBird } from 'sendbird-uikit';

import { App as SendBirdApp } from 'sendbird-uikit';
import 'sendbird-uikit/dist/index.css';

import styles from './chat.module.css';

import React from 'react';
import { Navigation } from './index';

const ChatApp = (props) => {
  return (
    <>
      <Navigation {...props} />
      <div className='row content'>
        <div className={styles.App}>
          <SendBirdApp
            appId={process.env.REACT_APP_SENDBIRD_ID}
            userId={props.user.email}
            nickname={props.user.name}
            profileUrl={props.user.picture}
          />
        </div>
      </div>
    </>
  );
};

export default ChatApp;
