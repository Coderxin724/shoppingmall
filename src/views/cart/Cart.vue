<template>
  <div class="shopcart">
    <nav-bar class="car-nav">
      <template v-slot:center>
        <div>购物车({{ cartListLength }})</div>
      </template>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartListLength"])
  }
};
</script>

<style scoped>
.shopcart {
  height: calc(100vh - 44px - 49px);
}
.car-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
