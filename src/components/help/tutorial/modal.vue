<template>
  <div
    class="modal fade"
    id="tutorialModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="tutorialModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tutorialModalLabel">
            {{ $t("tutorial.title") }}
          </h5>
          <locale-changer />
        </div>
        <div class="modal-body">
          <div class="root">
            <div class="tabs d-flex mb-3">
              <div
                class="tab d-flex justify-content-center align-items-center"
                :class="tab === 0 && 'tab-selected'"
                @click="handleClickTab(0)"
              >
                {{ $t("tutorial.view") }}
              </div>
              <div
                class="tab d-flex justify-content-center align-items-center"
                :class="tab === 1 && 'tab-selected'"
                @click="handleClickTab(1)"
              >
                {{ $t("tutorial.new") }}
              </div>
            </div>
          </div>
          <div class="container">
            <iframe
              src="https://www.youtube.com/embed/OPltpdu9KGM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video"
              v-show="tab === 0 && $root.$i18n.locale === 'en'"
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/278QwSgbdkM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video"
              v-show="tab === 1 && $root.$i18n.locale === 'en'"
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/5kXKPCqRbRI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video"
              v-show="tab === 0 && $root.$i18n.locale === 'fr'"
            ></iframe>
            <iframe
              src="https://www.youtube.com/embed/zNVQQdm5AX8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video"
              v-show="tab === 1 && $root.$i18n.locale === 'fr'"
            ></iframe>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="handleToggleModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            {{ $t("tutorial.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const $ = window.$;
import LocaleChanger from "../../app-footer/locale-changer";
export default {
  components: {
    LocaleChanger,
  },
  data() {
    return {
      tab: 0,
    };
  },
  methods: {
    handleClickTab(i) {
      this.tab = i;
    },
    handleToggleModal() {
      $("#tutorialModal").modal("toggle");
    },
  },
};
</script>
<style scoped>
.tab {
  height: 48px;
  width: 50%;
  cursor: pointer;
}
.tab-selected {
  background-color: gray;
  color: white;
  cursor: default;
}
.container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.reddy {
  background-color: red;
}
</style>
