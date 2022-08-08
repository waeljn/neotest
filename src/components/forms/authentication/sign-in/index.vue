<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="signInModalLabel">Sign In</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="handleCloseModalClick"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="inputEmail">Email address</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="row">
          <div class="col-md-12">
            <button
              class="btn btn-link text-normalcase float-right"
              @click="handleGoToSignUpClick"
            >
              I don't have an account? Sign up!
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="text-center">Or sign in using</div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6 mx-auto d-flex justify-content-around">
            <button
              class="btn btn-facebook btn-circle"
              @click="handleFacebookSignInClick"
            >
              <i class="fa fa-facebook text-large"></i>
            </button>
            <button
              class="btn btn-google btn-circle"
              @click="handleGoogleSignInClick"
            >
              <i class="fa fa-google-plus text-large"></i>
            </button>
            <button
              class="btn btn-twitter btn-circle"
              @click="handleTwitterSignInClick"
            >
              <i class="fa fa-twitter text-large"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="text-danger" v-show="error">
          {{ error }}
        </div>
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="handleCloseModalClick"
        >
          Close
        </button>
        <button type="button" class="btn btn-primary" @click="handleSignIn">
          <i class="fa fa-circle-o-notch fa-spin mr-1" v-show="loading"></i>
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: undefined,
      password: undefined,
    };
  },
  methods: {
    handleSignIn() {
      this.$emit("sign-in", {
        email: this.email,
        password: this.password,
      });
    },
    handleCloseModalClick() {
      this.$emit("close-authentication-modal");
    },
    handleGoToSignUpClick() {
      this.$emit("goto-sign-up");
    },
    handleFacebookSignInClick() {
      this.$emit("facebook-sign-up");
    },
    handleGoogleSignInClick() {
      this.$emit("google-sign-up");
    },
    handleTwitterSignInClick() {
      this.$emit("twitter-sign-up");
    },
  },
};
</script>

<style scoped>
.text-normalcase {
  text-transform: none;
}
.btn-circle {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-facebook {
  background-color: #3b5998;
}
.btn-google {
  background-color: #db4437;
}
.btn-twitter {
  background-color: #00acee;
}
.text-large {
  font-size: 20px;
}
</style>
