<template>
  <div class="check-button" :class="{ active: isCheck }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.active {
  background-color: red;
  border-color: red;
}
</style>
