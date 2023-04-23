
var chatWidgetSettings = {
    URI: 'https://oda-55639e9c408d4c73bd6601e34b08e26b-da6d747a.data.digitalassistant.oci.oraclecloud.com',
    channelId: 'c4a64c35-bad6-4767-9692-b8249bb370e3'
};
function initSdk(name) {
    // Default name is Bots
    if (!name) {
        name = 'Bots';
    }
    setTimeout(() => {
        const Bots = new WebSDK(chatWidgetSettings); // Initiate library with configuration
        Bots.connect()                               // Connect to server
            .then(() => {
                console.log("Connection Successful");
            })
            .catch((reason) => {
                console.log("Connection failed");
                console.log(reason);
            });
        window[name] = Bots;
    });
}





// //settings.js
// var chatSettings = {
//     URI: 'https://oda-1669526db1924c9f962d6c4f34990592-da6d747a.data.digitalassistant.oci.oraclecloud.com',
//     channelId: '1e2a858d-5e91-4cb6-bd94-8d93c5de9ff9'
// };

// function initSDK(name) {
//     // If WebSDK is not available, reattempt later
//     if (!document || !WebSDK) {
//         setTimeout(function() {
//             initSDK(name);
//         }, 2000);
//         return;
//     }

//     // Default name is Bots
//     if (!name) {
//         name = 'Bots';
//     }

//     setTimeout(function() {
//         var Bots = new WebSDK(chatSettings);    // Initiate library with configuration

//         var isFirstConnection = true;
//         Bots.on(WebSDK.EVENT.WIDGET_OPENED, function() {
//             if (isFirstConnection) {
//                 Bots.connect()                          // Connect to server
//                     .then(function() {
//                         console.log('Connection Successful');
//                     })
//                     .catch(function(reason) {
//                         console.log('Connection failed');
//                         console.log(reason);
//                     });
//                    isFirstConnection = false;
//             }
//         });

//         window[name] = Bots;
//     }, 0);
// }