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

const emailPasswordSignup = () => {

  const emailSignup = document.getElementById('emailSignup').value,
    passwordSignup = document.getElementById('passwordSignup').value;

  firebase.auth().createUserWithEmailAndPassword(emailSignup, passwordSignup)
    .then(result => {
      console.log('result', result);
    })
    .catch(function(error) {
      // Handle Errors here.
      let errorCode = error.code;
      console.log('error code', errorCode);
      let errorMessage = error.message;
      console.log('error message', errorMessage);
  });
};

const emailPasswordLogin = () => {

  const emailLogin = document.getElementById('emailLogin').value,
    passwordLogin = document.getElementById('passwordLogin').value;
    console.log(emailLogin, passwordLogin);

  firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user}`);
    })
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
}
