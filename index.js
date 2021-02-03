const {sdk, SpeakerEvent} = require("symbl-node");

sdk.init({
  appId: 'appId',
  appSecret: 'appSecret',
  basePath: "https://api.symbl.ai",
}).then((e) => {
  console.log('SDK initialized.', e);
  try {
    const DTMF_MEETING_ID = "ZOOM_MEETING_ID";
	const DTMF_MEETING_PASSCODE = "ZOOM_MEETING_PASSCODE";
	const dtmfSequence = `,,${DTMF_MEETING_ID}#,,${DTMF_MEETING_PASSCODE}`;
	sdk.startEndpoint({
	  operation: "start",
	  endpoint: {
	    type: "pstn",
	    phoneNumber: "+16465588656", // US Zoom Numbers are "+16465588656", or "+14086380968".
	    dtmf: dtmfSequence,
	  },
	  actions: [
	    {
	      invokeOn: "stop",
	      name: "sendSummaryEmail",
	      parameters: {
	        emails: [EMAIL_ADDRESS],
	      },
	    },
	  ],
	  data: {
	    session: {
	      name: "Symbl Zoom Test",
	    },
	  },
	}).then((connection) => {
	  const connectionId = connection.connectionId;
	  console.log("Successfully connected.", connectionId);
	  console.log("Calling into Zoom now, please wait.");
	})
	.catch((err) => {
	   console.error("Error while starting the connection", err);
	});
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));
