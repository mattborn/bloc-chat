import React from 'react';

const SignIn = React.createClass({

  signIn() {
    // firebase.google.com/docs/auth/web/github-auth#handle_the_sign-in_flow_with_the_firebase_sdk
    const provider = new firebase.auth.GithubAuthProvider(); // eslint-disable-line no-undef
    firebase.auth().signInWithPopup(provider).then((result) => { // eslint-disable-line no-undef
      const user = result.user;
      firebase.database().ref(`users/${user.uid}`).set({ // eslint-disable-line no-undef
        displayName: user.displayName,
        email: user.email,
        githubId: user.providerData[0].uid,
        photoURL: user.photoURL,
        refreshToken: user.refreshToken,
        token: result.credential.accessToken
      });
    }).catch((error) => console.error(error)); // eslint-disable-line no-undef, no-console
  },

  render() {
    return <button onClick={this.signIn}>Sign in with GitHub</button>;
  }
});
export default SignIn;
