<template>
  <div class="catge-list">
    <goods-list-item
      v-for="(item, index) in categoryGoods"
      :key="index"
      :goodsitem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "../../../components/content/goods/GoodsListItem";

export default {
  name: "TabContentDetail",
  props: {
    categoryGoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style scoped>
.catge-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>
