<template>
  <!-- Navigation -->
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      id="mainNav"
    >
      <div class="container">
        <router-link to="/"
          ><li class="navbar-brand js-scroll-trigger text-white">
            <i class="fa fa-calendar mr-2"></i>{{ $t("home.title") }}
          </li></router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="handleToggleToolbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!user" @click="handleToggleModalClick">
              <a class="nav-link with-pointer js-scroll-trigger">
                {{ $t("navbar.login") }}
              </a>
            </li>
            <li class="nav-item dropdown" v-if="user">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="navbar-dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="handleToggleDropdown"
              >
                <i class="fa fa-circle-o-notch fa-spin mr-2" v-if="loading"></i>
                <span v-if="!user.displayName && user.email">{{
                  user.email
                }}</span>
                <span v-if="user.displayName">{{ user.displayName }}</span>
                <img
                  v-if="!user.photoURL"
                  :src="defaultPhoto"
                  class="avatar ml-2"
                />
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  class="avatar ml-2"
                />
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
                id="navbar-dropdown"
              >
                <a
                  class="dropdown-item with-pointer"
                  role="button"
                  @click="handleToggleNameModalClick"
                  ><i class="fa fa-pencil mr-3"></i>
                  {{ $t("navbar.updateName") }}
                </a>
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item with-pointer"
                  role="button"
                  @click="handleLogout"
                  ><i class="fa fa-sign-out mr-3"></i> {{ $t("navbar.logout") }}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <input
      type="file"
      id="input-upload"
      ref="fileInput"
      @change="handleUploadPhoto"
    />
    <div
      class="modal fade"
      id="updateNameModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateNameModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateNameModalLabel">
              Update your name
            </h5>
            <button
              @click="handleToggleNameModalClick"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="firstName">First Name</label>
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
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="handleToggleNameModalClick"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleUpdateName"
            >
              Update name
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="updateEmailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="updateEmailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateEmailModalLabel">
              Update your email
            </h5>
            <button
              @click="handleToggleEmailModalClick"
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail"
                    placeholder="New Email"
                    v-model="email"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="handleToggleEmailModalClick"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleUpdateEmail"
            >
              Update email
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = window.$;
import firebase from "firebase";
import { BUSINESS_DOMAIN } from "../../constants";
export default {
  data() {
    return {
      user: undefined,
      fileInput: undefined,
      loading: false,
      defaultPhoto: process.env.BASE_URL + "images/avatar.png",
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      showVerifyEmail: false,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.user = user;
        if (
          // user.email.includes("@infopro-digital.com") &&
          user.email.includes(BUSINESS_DOMAIN) &&
          user.emailVerified === false
        ) {
          this.showVerifyEmail = true;
        }
      } else {
        console.log("No user");
      }
    });
    this.fileInput = this.$refs["fileInput"];
  },
  methods: {
    handleUploadPhoto($event) {
      this.loading = true;
      const file = $event.target.files[0];
      const storageRef = firebase
        .storage()
        .ref("photos/" + this.user.uid + ".png");
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        () => {
          // console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((photoURL) => {
            firebase
              .auth()
              .currentUser.updateProfile({ photoURL })
              .then(() => {
                this.user = firebase.auth().currentUser;
                this.loading = false;
                location.reload();
              })
              .catch((error) => {
                this.loading = false;
                console.log(error);
              });
          });
        }
      );
    },
    handleLogout() {
      if (confirm("Are you sure to logout?")) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            location.reload();
          })
          .catch((error) => {
            alert("Oops, an error happened!");
            console.log(error);
          });
      }
    },
    handleToggleDropdown() {
      $("#navbar-dropdown").collapse("toggle");
    },
    handleToggleToolbar() {
      $("#navbarResponsive").collapse("toggle");
    },
    handleUploadPhotoClick() {
      $("#navbar-dropdown").collapse("hide");
      this.fileInput.click();
    },
    handleToggleModalClick() {
      this.$emit("toggle-modal");
    },
    handleToggleNameModalClick() {
      $("#updateNameModal").modal("toggle");
    },
    handleToggleEmailModalClick() {
      $("#updateEmailModal").modal("toggle");
    },
    handleUpdateName() {
      if (this.firstName && this.lastName) {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: this.firstName + " " + this.lastName,
          })
          .then(() => location.reload())
          .catch((error) => {
            console.log(error);
            alert("Error happened!");
          });
      }
    },
    handleUpdateEmail() {
      if (this.email) {
        firebase
          .auth()
          .currentUser.updateEmail(this.email)
          .then(() => location.reload())
          .catch((error) => {
            console.log(error);
            alert("Error happened!");
          });
      }
    },
    handleVerifyEmail() {
      // const v = firebase.auth().currentUser.emailVerified;
      // if (v) console.log(firebase.auth().currentUser);
      const email = firebase.auth().currentUser.email;
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          alert("Verification email sent");
          // The link was successfully sent. Inform the user.
          // Save the email locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", email);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
        });
    },
  },
};
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}
</style>
