<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: true
    };
  },
  methods: {
    imageLoad() {
      if (this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = false;
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped></style>
