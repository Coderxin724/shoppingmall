<template>
  <div class="home-recommendview">
    <div
      v-for="item in recommends"
      :key="item.index"
      class="home-recommendview-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped>
.home-recommendview {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}

.home-recommendview-item {
  flex: 1;
}

.home-recommendview-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
