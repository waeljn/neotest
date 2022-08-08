<template>
  <div>
    <h2>comparaison des abonnements</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
    </p>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>
              Criteria
              <button class="btn btn-danger btn-sm" @click="$emit('clear')">
                <i class="fa fa-eraser" aria-hidden="true"></i>
              </button>
            </th>
            <th
              class="text-center with-pointer"
              @click="handleOpenEventData(elements[0], 1)"
            >
              1<sup>st</sup> event
              <div v-if="elements[0]">
                {{ elements[0].provider }} + {{ elements[0].name }}
                <button
                  class="btn btn-sm btn-danger btn-rounded"
                  @click="$emit('remove', 0)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </th>
            <th
              class="text-center with-pointer"
              @click="handleOpenEventData(elements[1], 2)"
            >
              2<sup>nd</sup> event
              <div v-if="elements[1]">
                {{ elements[1].provider }} + {{ elements[1].name }}
                <button
                  class="btn btn-sm btn-danger btn-rounded"
                  @click="$emit('remove', 1)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </th>
            <th
              class="text-center with-pointer"
              @click="handleOpenEventData(elements[2], 3)"
            >
              3<sup>rd</sup> event
              <div v-if="elements[2]">
                {{ elements[2].provider }} + {{ elements[2].name }}
                <button
                  class="btn btn-sm btn-danger btn-rounded"
                  @click="$emit('remove', 2)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </th>
            <th
              class="text-center with-pointer"
              @click="handleOpenEventData(elements[3], 4)"
            >
              4<sup>th</sup> event
              <div v-if="elements[3]">
                {{ elements[3].provider }} + {{ elements[3].name }}
                <button
                  class="btn btn-sm btn-danger btn-rounded"
                  @click="$emit('remove', 3)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="bg-dark-transparent text-white">Download (Mbps)</td>
            <td
              :class="getDownloadClass(element.download, element.bandwidth)"
              :key="'download_' + element.id"
              v-for="element in elements"
            >
              {{ element.download }} / {{ element.bandwidth }} ({{
                ((element.download / element.bandwidth) * 100).toFixed(2)
              }}%)
            </td>
            <td
              class="bg-hatched"
              :key="'download_' + index"
              v-for="index in 4 - elements.length"
            ></td>
          </tr>
          <tr>
            <td class="bg-dark-transparent text-white">Upload (Mbps)</td>
            <td
              :class="getUploadClass(element.upload)"
              :key="'upload_' + element.id"
              v-for="element in elements"
            >
              {{ element.upload }}
            </td>
            <td
              class="bg-hatched"
              :key="'upload_' + index"
              v-for="index in 4 - elements.length"
            ></td>
          </tr>
          <tr>
            <td class="bg-dark-transparent text-white">Latency (ms)</td>
            <td
              :class="getLatencyClass(element.ping)"
              :key="'latency_' + element.id"
              v-for="element in elements"
            >
              {{ element.ping }}
            </td>
            <td
              class="bg-hatched"
              :key="'latency_' + index"
              v-for="index in 4 - elements.length"
            ></td>
          </tr>
          <tr>
            <td class="bg-dark-transparent text-white">Cuts per week</td>
            <td
              :class="getCutsClass(element.cuts)"
              :key="'cuts_' + element.id"
              v-for="element in elements"
            >
              {{ element.cuts }}
            </td>
            <td
              class="bg-hatched"
              :key="'cuts_' + index"
              v-for="index in 4 - elements.length"
            ></td>
          </tr>
          <tr>
            <td class="bg-dark-transparent text-white">
              Score
              <select
                id="inputUsageType"
                class="form-control"
                v-model="usageType"
              >
                <option
                  :key="usage.type"
                  v-for="usage in usages"
                  :value="usage.type"
                >
                  {{ usage.label }}
                </option>
              </select>
            </td>
            <td :key="'score_' + element.id" v-for="element in elements">
              <div
                class="d-flex justify-content-center align-items-center mt-3 text-big"
              >
                {{ getScore(element) }} / 10
              </div>
            </td>
            <td
              class="bg-hatched"
              :key="index"
              v-for="index in 4 - elements.length"
            ></td>
          </tr>
        </tbody>
      </table>
      <b class="text-muted">
        Formula for {{ usages.filter((u) => u.type === usageType)[0].label }}:
        {{ usages.filter((u) => u.type === usageType)[0].download }} * download
        + {{ usages.filter((u) => u.type === usageType)[0].download }} * upload
        + {{ usages.filter((u) => u.type === usageType)[0].latency }} * latency
        + {{ usages.filter((u) => u.type === usageType)[0].cuts }} * cuts
      </b>
    </div>

    <report
      :event="eventProp"
      :digit="digit"
      :key="eventProp.id"
      v-if="eventProp"
      ref="report-details"
    />
  </div>
</template>

<script>
import Report from "../report";
export default {
  props: {
    elements: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { Report },
  data() {
    return {
      usageType: "DOWNLOADING",
      usages: [
        {
          type: "DOWNLOADING",
          label: "Downlading",
          download: 4,
          upload: 0,
          latency: 0,
          cuts: -1,
        },
        {
          type: "UPLOADING",
          label: "Uploading",
          download: 1,
          upload: 4,
          latency: 0,
          cuts: -3,
        },
        {
          type: "GAMING",
          label: "Gaming",
          download: 1,
          upload: 1,
          latency: 5,
          cuts: -5,
        },
        {
          type: "STREAMING",
          label: "Streaming",
          download: 2,
          upload: 3,
          latency: 0,
          cuts: -1,
        },
      ],
      eventProp: undefined,
      digit: undefined,
    };
  },
  methods: {
    getDownloadClass(download, bandwidth) {
      let c = "text-dark text-center";
      const calc = download / bandwidth + "".substring(0, 3);
      if (calc * 100 <= 50) {
        c = c + " bg-danger-transparent";
      }
      if (calc * 100 > 50 && calc * 100 < 80) {
        c = c + " bg-warning-transparent";
      }
      if (calc * 100 >= 80) {
        c = c + " bg-success-transparent";
      }
      return c;
    },
    getUploadClass(upload) {
      let c = "text-dark text-center";
      const calc = upload + "".substring(0, 3);
      if (calc <= 2) {
        c = c + " bg-danger-transparent";
      }
      if (calc > 2 && calc < 10) {
        c = c + " bg-warning-transparent";
      }
      if (calc >= 20) {
        c = c + " bg-success-transparent";
      }
      return c;
    },
    getLatencyClass(ping) {
      let c = "text-dark text-center";
      const calc = ping + "".substring(0, 3);
      if (calc <= 99) {
        c = c + " bg-success-transparent";
      }
      if (calc > 99 && calc < 200) {
        c = c + " bg-warning-transparent";
      }
      if (calc > 200) {
        c = c + " bg-danger-transparent";
      }
      return c;
    },
    getCutsClass(cuts) {
      let c = "text-dark text-center";
      if (cuts === "none") {
        c = c + " bg-info-transparent";
      }
      if (cuts === "1-3") {
        c = c + " bg-success-transparent";
      }
      if (cuts === "3-5") {
        c = c + " bg-warning-transparent";
      }
      if (cuts === "5+") {
        c = c + " bg-danger-transparent";
      }
      return c;
    },
    handleOpenEventData(event, digit) {
      this.eventProp = event;
      this.digit = digit;
      setTimeout(() => {
        this.$refs["report-details"].handleToggleModal();
      }, 500);
    },
    handleAddToComparaison() {
      alert("Already in the table of comparaisons.");
    },
    handleUpdateEvents() {},
    getScore(element) {
      const usage = this.usages.find((u) => u.type === this.usageType);

      // Download
      let downloadScore = 0;
      const donwloadCalc =
        element.download / element.bandwidth + "".substring(0, 3);
      if (donwloadCalc * 100 <= 50) {
        downloadScore = 1;
      }
      if (donwloadCalc * 100 > 50 && donwloadCalc * 100 < 80) {
        downloadScore = 2;
      }
      if (donwloadCalc * 100 >= 80) {
        downloadScore = 3;
      }

      // Upload
      let uploadScore = 0;
      const uploadCalc = element.upload + "".substring(0, 3);
      if (uploadCalc <= 2) {
        uploadScore = 1;
      }
      if (uploadCalc > 2 && uploadCalc < 10) {
        uploadScore = 2;
      }
      if (uploadCalc >= 20) {
        uploadScore = 3;
      }

      // Upload
      let latencyScore = 0;
      const latencyCalc = element.ping + "".substring(0, 3);
      if (latencyCalc <= 99) {
        latencyScore = 3;
      }
      if (latencyCalc > 99 && latencyCalc < 200) {
        latencyScore = 2;
      }
      if (latencyCalc > 200) {
        latencyScore = 1;
      }

      // Cuts
      let cutsScore = 0;
      if (element.cuts === "none") {
        cutsScore = 3;
      }
      if (element.cuts === "1-3") {
        cutsScore = 2;
      }
      if (element.cuts === "3-5") {
        cutsScore = 1;
      }
      if (element.cuts === "5+") {
        cutsScore = 0;
      }

      // Total
      const { download, upload, latency, cuts } = usage;
      const total =
        downloadScore * download +
        uploadScore * upload +
        latencyScore * latency +
        cutsScore * cuts;

      let allDownloads = 0;
      let allUploads = 0;
      let allLatencies = 0;
      let allCuts = 0;

      this.usages.forEach((element) => {
        allDownloads = allDownloads + element.download;
        allUploads = allUploads + element.upload;
        allLatencies = allLatencies + element.latency;
        allCuts = allCuts + element.cuts;
      });
      const allTotals =
        downloadScore * allDownloads +
        uploadScore * allUploads +
        latencyScore * allLatencies +
        cutsScore * allCuts;
      const ratio = total / allTotals;
      return (ratio * 10).toString().substring(0, 3);
    },
  },
};
</script>

<style scoped>
.bg-info-transparent {
  background-color: #007bff88;
}
.bg-danger-transparent {
  background-color: #d9534f88;
}
.bg-success-transparent {
  background-color: #4bbf7388;
}
.bg-warning-transparent {
  background-color: #f0ad4e88;
}
.bg-dark-transparent {
  background-color: #00000088;
}
.bg-hatched {
  background: repeating-linear-gradient(
    45deg,
    lightgrey,
    lightgrey 1px,
    white 1px,
    white 10px
  );
}
.text-big {
  font-size: 20px;
  font-weight: bold;
}
.with-pointer {
  cursor: pointer;
}
.btn-rounded {
  border-radius: 32px;
}
</style>
