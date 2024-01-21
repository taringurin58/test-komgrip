<template>
  <div class="container">
    <div class="row company-name">
      <div class="col text-left nopadding">
        <div class="pt-4 pb-3 text-ellipsis">
          <img class="company-logo" alt="Vue logo" src="@/assets/logo.png" />
          {{ "Knomgrip Technology" }}
        </div>
      </div>
    </div>
    <div class="row line-break"></div>
    <div class="row">
      <div class="col text-left nopadding">
        <div class="pt-4 pb-3 text-ellipsis">
          <div
            v-for="(item, index) in SiteMenu"
            :key="item.name + '_site_' + index"
          >
            <router-link
              :to="item.path"
              class="navbar-brand card-link card"
              :class="item.name === $route.name ? 'active' : 'not-active'"
            >
              <div class="flex-menu">
                <div
                  class="icon-menu flex-middle"
                  v-if="item.icon"
                  :class="
                    item.name === $route.name ? 'bg-primary text-white' : ''
                  "
                >
                  <i :class="`ni ni-${item.icon}`"></i>
                </div>

                <div class="text-ellipsis">
                  {{ item.label }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SiteMenu",
  computed: {
    nameOfRoute() {
      return this.$route.name;
    },
  },
  data() {
    return {
      SiteMenu: [
        {
          name: "dashboard",
          label: "Dashboard",
          path: "/dashboard",
          icon: "shop",
        },
        {
          name: "about",
          label: "About",
          path: "/about",
          icon: "image",
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.company-logo {
  width: 32px;
  height: 32px;
}
.company-name {
  font-size: 1rem;
  font-weight: bold;
}
.line-break {
  border-bottom: 1px solid #e5e5e5;
}
.card-link {
  background: #ffffff00;
  transition: 0.3s;
  box-shadow: none;
  padding: 1rem 1rem;
  margin-bottom: 0.5rem;

  &.active {
    background: #fff;
    box-shadow: 2px 2px 6px 0px #eee;
  }
}
.flex-menu {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1rem;

  > .icon-menu {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    transition: 0.3s;
    box-shadow: 2px 2px 6px 0px #eee;
  }

  @media (max-width: 768px) {
    > .icon-menu {
      display: none;
      box-shadow: none;
    }
  }
}
</style>
