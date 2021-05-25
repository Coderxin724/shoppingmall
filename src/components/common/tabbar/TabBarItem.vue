<template>
  <div class="tab-bar-item" @click="tabBarItemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="avticeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String,
    avticeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
      // console.log(this.avticeColor);
      return this.$route.path == this.link;
    },
    avticeStyle() {
      return this.isActive ? { color: this.avticeColor } : {};
    }
  },
  methods: {
    tabBarItemClick() {
      // console.log("tabBarItemClick");
      this.$router.push(this.link).catch(() => {});
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
</style>
