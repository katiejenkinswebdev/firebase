// Initialize Firebase once DOM is loaded
document.addEventListener("DOMContentLoaded", event => {
  try {
      const app = firebase.app();

      // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'success.html',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        tosUrl: 'tos.html',
        privacyPolicyUrl: 'privacyPolicy.html',
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);

  } catch (e) {
      console.error(e);
  }
});

const emailPasswordSignup = () => {
  const emailSignup = document.getElementById('emailSignup').value,
    passwordSignup = document.getElementById('passwordSignup').value;

  firebase.auth().createUserWithEmailAndPassword(emailSignup, passwordSignup)
    .then(result => {
      checkAuthStatus();
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('email sent');
      }).catch(function(error) {
        // An error happened.
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
  });
};

const emailPasswordLogin = () => {
  const emailLogin = document.getElementById('emailLogin').value,
    passwordLogin = document.getElementById('passwordLogin').value;

  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then(result => {
      const user = result.user;
      checkAuthStatus();
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
};

const checkAuthStatus = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('user signed in');
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
    } else {
      // User is signed out.
      console.log('user is signed out');
    }
  });
};

const sendResetPasswordEmail = () => {
  let emailAddress = firebase.auth().currentUser.email;

  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
};

const signOut = () => {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  checkAuthStatus();

  }).catch(function(error) {
    // An error happened.
  });
}
