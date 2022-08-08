<template>
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="signUpModalLabel">Sign Up</h5>
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
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputFirstName">First Name</label>
            <input
              type="text"
              class="form-control"
              id="inputFirstName"
              placeholder="First Name"
              v-model="firstName"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputLastName">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="inputLastName"
              placeholder="Last Name"
              v-model="lastName"
            />
          </div>
        </div>
        <button
          class="btn btn-link text-normalcase pull-right"
          @click="handleGoToSignInClick"
        >
          You already have an account? Sign in!
        </button>
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
        <button type="button" class="btn btn-primary" @click="handleSignUp">
          <i class="fa fa-circle-o-notch fa-spin mr-1" v-show="loading"></i>
          Sign Up
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
      firstName: undefined,
      lastName: undefined,
    };
  },
  methods: {
    handleSignUp() {
      this.$emit("sign-up", {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      });
    },
    handleCloseModalClick() {
      this.$emit("close-authentication-modal");
    },
    handleGoToSignInClick() {
      this.$emit("goto-sign-in");
    },
  },
};
</script>

<style scoped>
.text-normalcase {
  text-transform: none;
}
</style>
