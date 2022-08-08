<template>
  <div
    class="modal fade"
    id="reportDetailsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">Report of event #{{ digit }}</div>
        <div class="modal-body">
          <div container="text-dark">
            <div class="row">
              <div class="col-md-6">
                <user-data
                  :title="event.displayName"
                  :subtitle="
                    'Test time: ' +
                      new Date(event.creationTime).toDateString()
                  "
                  :photo="event.photoURL || defaultPhoto"
                />
              </div>
              <div class="col-md-6">
                <div class="row">
                  <div class="col text-dark text-center">
                    <div>Download</div>
                    <small>{{ event.download }} Mbps</small>
                  </div>
                  <div class="col text-dark text-center">
                    <div>Upload</div>
                    <small>{{ event.upload }} Mbps</small>
                  </div>
                  <div class="col text-dark text-center">
                    <div>Latency</div>
                    <small>{{ event.ping }} ms</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-md-12">
                <h5>Event</h5>
                <div>
                  <h6 class="mt-3">
                    Location
                    <a
                      v-if="
                        event &&
                          event.latitude &&
                          event.longitude
                      "
                      :href="
                        '?latitude=' +
                          event.latitude +
                          '&longitude=' +
                          event.longitude
                      "
                      target="_blank"
                      ><small>(Visit)</small></a
                    >
                  </h6>
                  <div class="row">
                    <div class="col-md-4 text-dark">
                      Latitude: {{ event.latitude }}
                    </div>
                    <div class="col-md-4 text-dark">
                      Longitude: {{ event.longitude }}
                    </div>
                  </div>
                </div>
                <div>
                  <h6 class="mt-3">
                    Details <small>({{ event.type }})</small>
                  </h6>
                  <div class="row">
                    <div class="col-md-4 text-dark">
                      Provider: {{ event.provider }}
                    </div>
                    <div class="col-md-4 text-dark">
                      Offer: {{ event.name }}
                    </div>
                    <div class="col-md-4 text-dark">
                      Bandwidth: {{ event.bandwidth }} Mbps
                    </div>
                  </div>
                </div>
                <div>
                  <h6 class="mt-3">Usage</h6>
                  <div class="row">
                    <div class="col-md-4 text-dark">
                      Cuts per week:
                      <span v-if="event.cuts" class="text-capitalize">{{
                        event.cuts
                      }}</span>
                    </div>
                    <div class="col-md-4 text-dark">
                      Start time: {{ event.startingTime }}
                    </div>
                    <div class="col-md-4 text-dark">
                      End time: {{ event.endingTime }}
                    </div>
                  </div>
                </div>
                <div>
                  <h6 class="mt-3">Motive</h6>
                  <div class="row">
                    <p class="col-md-12 text-dark">
                      {{ event.motive }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            @click="handleToggleModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserData from "../../event/data/user-data";
const $ = window.$;
export default {
  props: {
    event: { type: Object, default: undefined },
    digit: { type: Number, default: undefined },
  },
  data() {
    return {
      defaultPhoto: process.env.BASE_URL + "images/avatar.png",
    };
  },
  methods: {
    handleToggleModal() {
      $("#reportDetailsModal").modal("toggle");
    },
  },
  components: {
    UserData,
  },
};
</script>

<style scoped>
.container {
  color: black;
}
</style>
