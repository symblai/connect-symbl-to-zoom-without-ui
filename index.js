const {sdk, SpeakerEvent} = require("symbl-node");
const appId = appId;
const appSecret = appSecret;
const phoneNumber = "ZOOM_PHONE_NUMBER"; // US Zoom Numbers are "+16465588656", or "+14086380968".
const meetingName = "Zoom Test Meeting";
const emailAddress = "user@example.com";

const DTMF_MEETING_ID = "ZOOM_MEETING_ID";
const DTMF_MEETING_PASSCODE = "ZOOM_MEETING_PASSCODE";
const dtmfSequence = `,,${DTMF_MEETING_ID}#,,${DTMF_MEETING_PASSCODE}#`;


sdk.init({
  appId: appId,
  appSecret: appSecret,
  basePath: "https://api.symbl.ai",
}).then(async() => {
  console.log('SDK initialized.');
  try {

    sdk.startEndpoint({
      endpoint: {
        type: "pstn",
        phoneNumber: phoneNumber,
        dtmf: dtmfSequence,
      },
      actions: [
        {
          invokeOn: "stop",
          name: "sendSummaryEmail",
          parameters: {
            emails: [
              emailAddress
            ],
          },
        },
      ],
      data: {
        session: {
          name: meetingName,
        },
      },
    }).then((connection) => {
      const connectionId = connection.connectionId;
      console.log("Successfully connected.", connectionId);
      console.log('Conversation ID', connection.conversationId);
      console.log('Full Conection Object', connection);
      console.log("Calling into Zoom now, please wait about 30-60 seconds.");
    })
    .catch((err) => {
       console.error("Error while starting the connection", err);
    });
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));