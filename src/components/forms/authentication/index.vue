<template>
  <div
    class="modal fade"
    id="authenticationModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="authenticationModalLabel"
    aria-hidden="true"
    ref="authenticationModal"
  >
    <sign-in
      v-show="step === 'SIGN_IN'"
      @goto-sign-up="handleGoToSignUp"
      @sign-in="handleSignIn"
      @close-authentication-modal="handleCloseModal"
      @facebook-sign-up="handleFacebookSignUp"
      @google-sign-up="handleGoogleSignUp"
      @twitter-sign-up="handleTwitterSignUp"
      :loading="loading"
      :error="signInError"
    />
    <sign-up
      v-show="step === 'SIGN_UP'"
      @goto-sign-in="handleGoToSignIn"
      @sign-up="handleSignUp"
      @close-authentication-modal="handleCloseModal"
      :loading="loading"
      :error="signUpError"
    />
  </div>
</template>
<script>
import SignIn from "./sign-in";
import SignUp from "./sign-up";
import firebase from "firebase";
const $ = window.$;
export default {
  components: { SignIn, SignUp },
  data() {
    return {
      step: "SIGN_IN",
      signInError: undefined,
      signUpError: undefined,
      loading: false,
    };
  },
  methods: {
    async handleSignIn($data) {
      this.signInError = undefined;
      this.signUpError = undefined;
      this.loading = false;
      if ($data && $data.email !== undefined && $data.password !== undefined) {
        try {
          this.loading = true;
          await firebase
            .auth()
            .signInWithEmailAndPassword($data.email, $data.password);
          this.loading = false;
          location.reload();
        } catch (error) {
          this.loading = false;
          let message = "Oops! An error happened.";
          if (error && error.message) {
            message = error.message;
          }
          this.signInError = message;
          console.log(error);
        }
      } else {
        this.loading = false;
        alert("Please provide all information.");
      }
    },
    async handleSignUp($data) {
      this.signInError = undefined;
      this.signUpError = undefined;
      this.loading = false;
      if (
        $data &&
        $data.email !== undefined &&
        $data.password !== undefined &&
        $data.firstName !== undefined &&
        $data.lastName !== undefined
      ) {
        try {
          this.loading = true;
          await firebase
            .auth()
            .createUserWithEmailAndPassword($data.email, $data.password);
          await firebase.auth().currentUser.updateProfile({
            displayName: $data.firstName + " " + $data.lastName,
          });
          location.reload();
          this.loading = false;
        } catch (error) {
          this.loading = false;
          let message = "Oops! An error happened.";
          if (error && error.message) {
            message = error.message;
          }
          this.signUpError = message;
          console.log(error);
        }
      } else {
        this.loading = false;
        alert("Please provide all information.");
      }
    },
    handleToggleModal() {
      $("#authenticationModal").modal("toggle");
    },
    handleGoToSignIn() {
      this.step = "SIGN_IN";
    },
    handleGoToSignUp() {
      this.step = "SIGN_UP";
    },
    handleCloseModal() {
      $("#authenticationModal").modal("toggle");
    },
    handleFacebookSignUp() {
      this.signInError = undefined;
      var provider = new firebase.auth.FacebookAuthProvider();
      // [END auth_facebook_provider_create]

      // / [START auth_facebook_provider_scopes]
      provider.addScope("user_birthday");
      // [END auth_facebook_provider_scopes]

      // [START auth_facebook_provider_params]
      provider.setCustomParameters({
        display: "popup",
      });
      // [END auth_facebook_provider_params]

      // [START auth_facebook_signin_popup]
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          /** @type {firebase.auth.OAuthCredential} */
          this.handleToggleModal();
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode);
          console.log(errorMessage);
          console.log(email);
          console.log(credential);
          this.signInError = errorMessage;
          // ...
          // [END auth_facebook_signin_popup]
        });
    },
    handleGoogleSignUp() {
      this.signInError = undefined;
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        display: "popup",
      });
      // [END auth_facebook_provider_params]

      // [START auth_facebook_signin_popup]
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.handleToggleModal();
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode);
          console.log(errorMessage);
          console.log(email);
          console.log(credential);
          this.signInError = errorMessage;

          // ...
          // [END auth_facebook_signin_popup]
        });
    },
    handleTwitterSignUp() {
      alert`Twitter`;
    },
  },
};
</script>
