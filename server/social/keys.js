module.exports = {

    'facebookAuth' : {
        'clientID'      : '469223673272656', // your App ID
        'clientSecret'  : '47bde713789aed4e762368f7108082f1', // your App Secret
        'callbackURL'   : 'https://asdes.herokuapp.com/api/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '681644594140-6u40flstt15k44901so7hvnoh43q7m5n.apps.googleusercontent.com',
        'clientSecret'  : 'OXYwfvElMWfB1It0j9A46Zh6',
        'callbackURL'   : 'https://asdes.herokuapp.com/api/auth/google/callback'
    }

};