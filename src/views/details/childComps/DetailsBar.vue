<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="item"
            class="title-item"
            :class="{ avtive: curretIndex == index }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailsBar",
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      curretIndex: 0
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    titleClick(index) {
      this.curretIndex = index;
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.back {
  margin-top: 7px;
}
.avtive {
  color: red;
}
</style>
