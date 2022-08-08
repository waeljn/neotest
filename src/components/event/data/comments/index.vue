<template>
  <div class="container">
    <div class="row" :key="comment.id" v-for="comment in comments">
      <div class="col-md-12">
        <user-data
          :title="comment.displayName"
          :strong="comment.userId === userId"
          :subtitle="
            'Commented in ' +
              new Date(comment.creationTime).toDateString() +
              ' at ' +
              new Date(comment.creationTime).getHours() +
              ':' +
              new Date(comment.creationTime).getMinutes()
          "
          :photo="comment.photoURL"
        />
        <div class="comment">
          <p>{{ comment.text }}</p>
        </div>
        <div class="mb-3"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <user-data :title="displayName + ' (you)'" :photo="photoURL" />
        <div class="comment">
          <textarea
            class="form-control"
            placeholder="Type your comment"
            v-model="text"
          ></textarea>
          <div>
            <button
              class="btn btn-outline-primary btn-sm mt-2"
              @click="handleAddCommentClick"
              :disabled="loading"
            >
              <i class="fa fa-circle-o-notch fa-spin mr-2" v-show="loading"></i>
              Comment
            </button>
            <button
              class="btn btn-secondary btn-sm mt-2 ml-1"
              @click="handleClearComment"
              :disabled="loading"
            >
              Clear
            </button>
          </div>
        </div>
        <div class="mb-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserData from "../user-data";
export default {
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    displayName: {
      type: String,
      default: undefined,
    },
    photoURL: {
      type: String,
      default: undefined,
    },
    userId: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: { UserData },
  data() {
    return {
      text: null,
    };
  },
  methods: {
    handleAddCommentClick() {
      this.$emit("add-comment", this.text);
      this.text = null;
    },
    handleClearComment() {
      if (confirm("Are you sure to clear your comment?")) {
        this.text = null;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-height: 360px;
  overflow: scroll;
}
.comment {
  margin-left: 56px;
  color: black;
}
</style>
