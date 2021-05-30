<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",

  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, timer) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
      }, timer);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
}
</style>
