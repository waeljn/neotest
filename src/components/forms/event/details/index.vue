<template>
  <div>
    <h3>Event</h3>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputProvider">Title *</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            placeholder="Event name"
            required
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputType">Type *</label>
          <select required id="inputType" class="form-control" v-model="type">
            <option disabled :value="null">Select a value...</option>
            <option value="sport">Sport</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputStartTime">Start time *</label>
          <input
            required
            v-model="startTime"
            type="datetime-local"
            value="2000-01-01T00:00:00+05:00"
            class="form-control"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputDescription">Description *</label>
          <textarea
            class="form-control"
            required
            v-model="description"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="inputProvider">Upload picture *</label>
          <br />
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="handleOpenFileInput"
          >
            Pick picture
          </button>
          <div v-show="loadingUpload" class="mt-2">Uploading picture...</div>
        </div>
      </div>
      <input
        v-show="false"
        type="file"
        id="input-upload"
        ref="fileInput"
        @change="handleUploadPhoto"
        required
      />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      loading: false,
      title: null,
      type: null,
      startTime: null,
      description: null,
      picture: null,
      loadingUpload: false
    }
  },
  methods: {
    handleOpenFileInput() {
      this.$refs['fileInput'].click()
    },
    handleUploadPhoto($event) {
      this.loadingUpload = true
      const file = $event.target.files[0]
      const storageRef = firebase
        .storage()
        .ref('pictures/' + Date.now() + '.png')
      const task = storageRef.put(file)
      task.on(
        'state_changed',
        () => {
          // console.log(snapshot);
        },
        (error) => {
          console.log(error)
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((photoURL) => {
            this.picture = photoURL
            this.loadingUpload = false
          })
        },
      )
    },
  },
}
</script>

<style scoped></style>
