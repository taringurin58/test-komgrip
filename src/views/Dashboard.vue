<template>
  <div class="home container">
    <NavBar pageName="Dashboard" :mappingRouter="pageMapping" />
    <div
      v-if="ladingFocus"
      class="row align-middle text-center pt-5 pb-5 flex-middle"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
    <div v-else class="row">
      <div
        class="col-6 col-xl-3"
        v-for="(item, index) in focusData"
        :key="item.id + '_' + index"
      >
        <div class="card container mt-3">
          <div class="row">
            <div class="col-8 pt-2 pb-2">
              <div class="id-label">
                {{ item.name }}
              </div>
              <div class="supply-label">
                ${{ converStringToNumber(item.priceUsd) }}
              </div>
              <div
                class="change-percent-label"
                :class="
                  converStringToNumber(item.changePercent24Hr) > 0
                    ? 'text-green'
                    : 'text-red'
                "
              >
                {{ converStringToNumber(item.changePercent24Hr) }}%
              </div>
            </div>
            <div class="col-4 pt-3 pb-2">
              <div class="flex-middle">
                <div class="badge bg-gradient-primary icon-money">
                  <i class="ni ni-money-coins"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="table-responsive">
        <div class="card-header">
          <div class="row">
            <div class="col-6 align-middle">
              <h5 class="mb-0">Cryptocurrencies</h5>
            </div>
            <div class="col-6 text-right">
              <button
                class="btn btn-sm btn-outline-primary mb-0"
                @click="arrowLeft"
                :disabled="pageSetOffset === 1"
              >
                <i class="ni ni-bold-left"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-primary mb-0"
                @click="arrowRight"
                style="margin-left: 0.5rem"
              >
                <i class="ni ni-bold-right"></i>
              </button>
            </div>
          </div>
        </div>
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                NO
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Name
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                SYMBOL
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                SUPPLY/MAX SUPPLY
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                USD
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                24H
              </th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr v-for="(item, index) in dataTable" :key="item.id + '_' + index">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-xs">
                      {{ (pageSetOffset - 1) * 5 + (index + 1) }}
                    </h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="font-weight-bold mb-0">{{ item.name }}</p>
              </td>
              <td class="align-middle text-center">
                {{ item.symbol }}
              </td>
              <td class="align-middle text-right">
                <span class="text-secondary">
                  {{ converStringToNumber(item.supply) }} /
                  {{ converStringToNumber(item.maxSupply) }}
                </span>
              </td>
              <td class="align-middle text-right">
                ${{ converStringToNumber(item.priceUsd) }}
              </td>
              <td class="align-middle text-right">
                <span
                  v-if="converStringToNumber(item.changePercent24Hr) > 0"
                  class="text-green"
                >
                  +{{ converStringToNumber(item.changePercent24Hr) }}%
                </span>
                <span v-else class="text-red">
                  {{ converStringToNumber(item.changePercent24Hr) }}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="loadingTable"
          class="row align-middle text-center pt-5 pb-5 flex-middle mx-auto"
          style="width: 90%"
        >
          <div class="spinner-border text-primary pt-2 pb-2" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/common/NavBar.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    NavBar,
  },
  computed: {
    dataTable() {
      return this.$store.getters["dashboardIndex/getDashboardTable"];
    },
    loadingTable() {
      return this.$store.getters["dashboardIndex/getDashboardTableLoading"];
    },
    focusData() {
      return this.$store.getters["dashboardIndex/getUnitFocus"];
    },
    ladingFocus() {
      return this.$store.getters["dashboardIndex/getUnitFocusLoading"];
    },
  },
  data() {
    return {
      thisIsAuth: false,
      pageSetOffset: 1,
      pageMapping: [
        {
          name: "home",
          label: "Home",
          path: "/",
        },
        {
          name: "dashboard",
          label: "Dashboard",
          path: "/dashboard",
        },
      ],
    };
  },
  mounted() {
    this.getDataTable();
    this.getDataFocus();
  },
  methods: {
    arrowLeft() {
      this.pageSetOffset -= 1;
      if (this.pageSetOffset < 0) {
        this.pageSetOffset = 0;
      } else {
        this.getDataTable();
      }
    },
    arrowRight() {
      this.pageSetOffset += 1;
      this.getDataTable();
    },
    getDataTable() {
      this.$store.dispatch("dashboardIndex/callDashboardTable", this);
    },
    getDataFocus() {
      this.$store.dispatch("dashboardIndex/callDashboardFocus", this);
    },
    converStringToNumber(value: string) {
      const number = Number(value);
      if (Number.isNaN(number)) {
        return 0;
      }
      return number.toFixed(2);
    },
  },
});
</script>

<style lang="scss" scoped>
.icon-money {
  font-size: 1.2rem;
  padding: 0.5rem 0.7rem;
  margin-left: auto;
}

.id-label {
  font-size: 0.8rem;
  color: #6c757d;
  text-transform: capitalize;
  line-height: 0.6rem;
}
.supply-label {
  font-size: 1.1rem;
  font-weight: 800;
}
.change-percent-label {
  font-size: 0.9rem;
}
.text-red {
  color: #f73c61;
}
.text-green {
  color: #2ce754;
}
</style>
