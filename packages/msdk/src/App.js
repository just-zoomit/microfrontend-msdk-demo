import React from "react";


import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

import { 
    StylesProvider , 
    createGenerateClassName,
} from '@material-ui/core/styles'






// Add prefix to css className to aviod collsion 
const generateClassName = createGenerateClassName({
    productionPrefix: 'ma',
})

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.6.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

    // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
    var signatureEndpoint = 'https://msdksig.herokuapp.com/'
    // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
    var sdkKey = '4ASmoeC9qV2BAcj8XFNPD9GK9uTrg60582Fm'
    var meetingNumber = '97372367793'
    var role = 0
    var leaveUrl = 'http://localhost:8080'
    var userName = 'React'
    var userEmail = 'donte.zoomie@gmail.com'
    var passWord = '541141'
    // pass in the registrant's token if your meeting or webinar requires registration. More info here:
    // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
    // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
    var registrantToken = ''

  
    
    function getSignature(e) {
      
      e.preventDefault();

      // const leaveBtn= document.getElementById('userButtonLeave');

      // leaveBtn?.addEventListener('click', () => {
      //   clientleaveMeeting().then((e) => {
      //     window.closedCaption = '';
      //     window.recordingClient = '';
      //   })
      // });

      


  
      fetch(signatureEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role
        })
      }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })
    }
  
    function startMeeting(signature) {
      document.getElementById('zmmtg-root').style.display = 'block'
      

      

     
  
      ZoomMtg.init({
        leaveUrl: leaveUrl,
        success: (success) => {
          console.log(success)
  
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingNumber,
            userName: userName,
            sdkKey: sdkKey,
            userEmail: userEmail,
            passWord: passWord,
            tk: registrantToken,
            success: (success) => {
              console.log(success)
            },
            error: (error) => {
              console.log(error)
            }
          })
  
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  
    return (
      <div className="App">
        <main>
          <h1>Zoom Meeting SDK Sample React</h1>
  
          <button onClick={getSignature}>Join Meeting</button>
        </main>
      </div>
    );
  }
  
  export default App;