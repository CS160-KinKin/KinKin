// getCreateChannel & getLeaveChannel

import {
    SendBirdProvider,
    withSendBird, // a HOC, higher order component, can access data stored in SendBirdProvider 
    sendBirdSelectors, // getCreateChannel, getSendUserMessage
} from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

// when state changes, component re-renders
// component state: values within component 
// component props: values passed to component

const appId = process.env.APP_ID; 
const userId = process.env.USER_ID; // need to define 
const channelUrl = process.env.CHANNEL_URL;

const CustomComponent = ({ createChannel, sdk, leaveChannel }) => {
    const [channelUrl, setChannelUrl] = useState('');
    return(
        <>
            <button onClick={() => {
                let params = new sdk.GroupChannelParams();
                params.isPublic = false;
                params.isEphemeral = false;
                params.isDistinct = false;
                params.addUserIds(['sravan']);
                params.name = NAME;
                createChannel(params)
                    .then(c => {
                        setChannelUrl(c.url);
                    })
                    .catch(c => console.warn(c));
                }}
                > Create channel
            </button>
            <button onClick={() => {
                leaveChannel(channelUrl).
                    then(c => {
                        setChannelUrl('');
                    })
                    .catch(c => console.warn(c));
                }}
                > Leave channel
            </button>
            <br />
            { `Created channel is: ${channelUrl}` }
        </>
    );
};

const CustomComponentWithSendBird = withSendBird(CustomComponent, (state) => {
    const createChannel = sendBirdSelectors.getCreateChannel(state);
    const leaveChannel = sendBirdSelectors.getLeaveChannel(state);
    const sdk = sendBirdSelectors.getSdk(state);
    return ({ createChannel, sdk, leaveChannel });
});

export const ChannelCRUDSelectors = () => (
    <SendBirdProvider appId={appId} userId={userId} nickname={userId}>
        <CustomComponentWithSendBird />
        <div style={{ width: '320px', height: '500px' }}>
            <ChannelList />
        </div>
    </SendBirdProvider>
);