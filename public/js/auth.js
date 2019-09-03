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
  const app = firebase.app();
});

const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  //async, will give us user when promise resolves with .then()
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;

      document.write(`Hello ${user.displayName}`);
    })
};
