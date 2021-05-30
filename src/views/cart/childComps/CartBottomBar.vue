<template>
  <div class="cart-bottom-bar">
    <div class="checked-all">
      <check-button
        :is-check="isSelectAll"
        class="check-button"
        @click.native="checkedAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="toloaPirce">合计：{{ toloaPirce }}</div>
    <div class="calculate">去计算({{ calculate }})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    toloaPirce() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.realPrice;
          }, 0)
          .toFixed(2)
      );
    },
    calculate() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkedAll() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 40px;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.checked-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.toloaPirce {
  flex: 1;
  margin-left: 30px;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
