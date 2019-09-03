console.log('loaded');
//
// document.addEventListener('DOMContentLoaded', function() {
//
//   try {
//     let app = firebase.app();
//     let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
//     document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
//   } catch (e) {
//     console.error(e);
//     document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
//   }
// });

// Initialize Firebase once DOM is loaded
document.addEventListener("DOMContentLoaded", event => {
  try {
      const app = firebase.app();
  } catch (e) {
      console.error(e);
  }
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  // Async, will give us user when promise resolves with .then()
  // Will create JWT for user. In browser, type localStorage to view.
  // TODO In IndexedDB, there is fbLocalStorage in fbase_key. Confirm JWT is here and UID is unique, doesn't change
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      document.write(`Hello ${user.displayName}`);
    })
    .catch(error => {
      console.log(error)
    })
};

const emailPasswordLogin = () => {

  const email = document.getElementById('email').value,
    password = document.getElementById('password').value;
    console.log(email, password);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(result => {
      console.log('result', result);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log('error code', errorCode);
      var errorMessage = error.message;
      console.log('error message', errorMessage);
  });
};
