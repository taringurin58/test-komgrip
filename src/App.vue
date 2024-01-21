<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 col-md-2 nopadding">
        <site-menu />
      </div>
      <div class="col-9 col-md-10 col-lg-9 nopadding">
        <router-view />
        <div class="text-left mt-5 text-sm" style="margin-left: 1.5rem">
          Coppyright C 2022 {{ "Knomgrip Technology Co., Ltd." }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SiteMenu from "./components/common/SiteMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    SiteMenu,
  },
  data() {
    return {
      thisIsAuth: false,
    };
  },
  mounted() {
    console.log(this.$route.path);
    if (this.$route.path === "/dashboard") {
      this.$router.push("/dashboard");
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
