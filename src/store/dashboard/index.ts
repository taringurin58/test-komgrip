import {
  DashboardTable,
  DashboardIdSummary,
} from "@/store/dashboard/interface";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    dashboardTable: [],
    dashboardTableLoading: false,
    dashboardTableOffset: 1,
    unitSummary: [],
    unitSummaryLoading: false,
  },
  getters: {
    getDashboardTable: (state: { dashboardTable: Array<DashboardTable> }) => {
      return state.dashboardTable;
    },
    getDashboardTableLoading: (state: { dashboardTableLoading: boolean }) => {
      return state.dashboardTableLoading;
    },
    // getDashboardTableOffset: (state: { dashboardTableOffset: number }) => {
    //   return state.dashboardTableOffset;
    // },
    getUnitFocus: (state: { unitSummary: Array<DashboardIdSummary> }) => {
      return state.unitSummary;
    },
    getUnitFocusLoading: (state: { unitSummaryLoading: boolean }) => {
      return state.unitSummaryLoading;
    },
  },
  mutations: {
    SET_DASHBOARD_TABLE(
      state: {
        dashboardTable: Array<DashboardTable>;
      },
      data: Array<DashboardTable>
    ) {
      state.dashboardTable = data;
    },
    SET_DASHBOARD_TABLE_LOADING(
      state: {
        dashboardTableLoading: boolean;
      },
      data: boolean
    ) {
      state.dashboardTableLoading = data;
    },
    SET_DASHBOARD_TABLE_OFFSET(
      state: {
        dashboardTableOffset: number;
      },
      data: number
    ) {
      state.dashboardTableOffset = data;
    },
    SET_UNIT_FOCUS(
      state: {
        unitSummary: Array<DashboardIdSummary>;
      },
      data: Array<DashboardIdSummary>
    ) {
      state.unitSummary = data;
    },
    SET_UNIT_FOCUS_LOADING(
      state: {
        unitSummaryLoading: boolean;
      },
      data: boolean
    ) {
      state.unitSummaryLoading = data;
    },
  },
  actions: {
    async callDashboardTable(
      { commit }: any,
      data: {
        pageSetOffset: number;
      }
    ) {
      commit("SET_DASHBOARD_TABLE_LOADING", true);
      commit("SET_DASHBOARD_TABLE", []);
      const offset = data.pageSetOffset;
      commit("SET_DASHBOARD_TABLE_OFFSET", offset);
      try {
        const response = await axios.get(
          `https://komgrip.co.th/coincap/assets?limit=5&offset=${offset}`
        );
        const data = response.data.data;
        commit("SET_DASHBOARD_TABLE", data);
      } catch (error) {
        commit("SET_DASHBOARD_TABLE", []);
        console.warn(error);
      } finally {
        commit("SET_DASHBOARD_TABLE_LOADING", false);
      }
    },
    async callDashboardFocus({ commit }: any) {
      commit("SET_UNIT_FOCUS", []);
      commit("SET_UNIT_FOCUS_LOADING", true);
      const idList = ["bitcoin", "ethereum", "solana", "dogecoin"];
      const newData: Array<DashboardIdSummary> = [];

      // @TODO: Fixed ID && Loop follow dynamic function
      for (const id of idList) {
        try {
          const response = await axios.get(
            `https://komgrip.co.th/coincap/assets/${id}`
          );
          const data = response.data.data;
          newData.push(data);
        } catch (error) {
          console.warn(error);
        }
      }
      commit("SET_UNIT_FOCUS", newData);
      commit("SET_UNIT_FOCUS_LOADING", false);
    },
  },
};
