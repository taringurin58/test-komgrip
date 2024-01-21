<template>
  <nav
    v-if="thisIsAuth"
    class="navbar navbar-expand-lg top-0 z-index-3 w-100 shadow-none my-3 navbar-transparent nopadding"
  >
    <div class="container nopadding">
      <div>
        <div class="text-left">
          <a
            v-for="(item, index) in mappingRouter"
            :key="item.name + '_' + index"
          >
            <span v-if="index !== 0 && index < mappingRouter.length"> / </span>
            <a
              class="navbar-brand"
              :class="item.name === $route.name ? 'active' : 'not-active'"
              :href="item.path"
            >
              {{ item.label }}
            </a>
          </a>
        </div>
        <div class="text-left">
          <span class="fw-900"> {{ pageName }} </span>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <div class="row">
            <div class="col-auto">
              <a
                class="navbar-brand"
                href=""
                rel="tooltip"
                title="Designed and Coded by Creative Tim"
                data-placement="bottom"
                target="_blank"
              >
                Pahnuywit Hongsig
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface MappingRouter {
  name: string;
  label: string;
  path: string;
}

export default defineComponent({
  name: "NavBar",
  props: {
    pageName: {
      type: String,
      default: "",
    },
    mappingRouter: {
      type: Array as () => MappingRouter[],
      default: () => [
        {
          name: "home",
          label: "Home",
          path: "/",
        },
      ],
    },
  },
  data() {
    return {
      thisIsAuth: true,
    };
  },
});
</script>

<style lang="scss" scoped>
.navbar-brand {
  margin-right: 4px !important;

  &.not-active {
    font-weight: 400;
  }
}
</style>
