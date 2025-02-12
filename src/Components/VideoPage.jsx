

import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, Server_Secret } from './constant';
import { userName } from './HomePage';

const VideoPage = () => {
    const {id}  = useParams()
    const roomID = id    
    let myMeeting = async (element) => {
    const appID = APP_ID;
    const serverSecret = Server_Secret;
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  Date.now().toString(),  userName,  3600, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'copy link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
}
  return (
    <div ref={myMeeting}>

    </div>
  )
}
export default VideoPage


// import { useParams, useNavigate } from 'react-router-dom';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { APP_ID, Server_Secret } from './constant';
// import { userName } from './HomePage';

// const VideoPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const roomID = id;

//     const myMeeting = async (element) => {
//         const appID = APP_ID;
//         const serverSecret = Server_Secret;
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID, 
//             serverSecret, 
//             roomID,
//             Date.now().toString(),
//             userName ,
//             3600,
//             0, 0, 0, 0, 0, 0, 0, 0, 0, 0
//         );

//         const zp = ZegoUIKitPrebuilt.create(kitToken);
        
//         zp.joinRoom({
//             container: element,
//             sharedLinks: [
//                 {
//                     name: 'Copy Link',
//                     url: window.location.href,
//                 },
//             ],
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.GroupCall,
//                 config: {
//                     role: ZegoUIKitPrebuilt.Host,
//                 },
//             },
//             showPreJoinView: true,
//             showScreenSharingButton: true,
//             showUserList: true,
//             showLayoutButton: true,
//         });
//     };

//     return (
//         <div className="h-screen flex flex-col bg-gray-100">
//             {/* Header */}
//             <div className="bg-white shadow px-4 py-3">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div>
//                         <h1 className="text-xl font-semibold text-gray-800">Room: {roomID}</h1>
//                         <p className="text-sm text-gray-600">User: {userName || "Anonymous"}</p>
//                     </div>
//                     <button
//                         onClick={() => navigate('/')}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                     >
//                         Leave Room
//                     </button>
//                 </div>
//             </div>

//             {/* Video Container */}
//             <div 
//                 className="flex-1 w-full"
//                 ref={myMeeting}
//             />
//         </div>
//     );
// };

// export default VideoPage;