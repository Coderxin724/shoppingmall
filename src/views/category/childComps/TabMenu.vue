<template>
  <div class="wrapper">
    <scroll id="tab-menu" ref="scroll">
      <div class="menu-list">
        <div
          class="menu-list-item"
          v-for="(item, index) in categoryTabList"
          :key="index"
          @click="tabMenuClick(index)"
          :class="{ active: currentIndex === index }"
        >
          {{ item.title }}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "TabMenu",
  components: {
    Scroll
  },
  props: {
    categoryTabList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabMenuClick(index) {
      this.currentIndex = index;
      this.$emit("selectItem", index);
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
#tab-menu {
  background-color: #f6f6f6;
  height: calc(100% - 44px - 49px);
  width: 100px;
  box-sizing: border-box;
  overflow: hidden;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>
