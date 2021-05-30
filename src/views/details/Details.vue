<template>
  <div id="details">
    <details-bar
      class="details-nav"
      @detailTitleClick="detailTitleClick"
      ref="nav"
    ></details-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <details-swiper :topImages="topImages"></details-swiper>
      <details-base-info :goods="goods"></details-base-info>
      <details-shop-info :shop="shop"></details-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="paramz"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommed" :goodslist="recommmeds"></goods-list>
    </scroll>
    <detail-bottom-bar @addShopCart="addShopCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowTop"></back-top>
  </div>
</template>
<script>
import DetailsBar from "./childComps/DetailsBar";
import DetailsSwiper from "./childComps/DetailsSwiper";
import DetailsBaseInfo from "./childComps/DetailBaseInfo";
import DetailsShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";
import { debounce } from "common/untils.js";
import BackTop from "components/common/backTop/BackTop";

import {
  getDetails,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/details";
export default {
  name: "Details",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommmeds: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      isShowTop: false
    };
  },
  components: {
    DetailsBar,
    DetailsSwiper,
    DetailsBaseInfo,
    DetailsShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
    BackTop
  },

  created() {
    // 1.保存存入的id
    this.iid = this.$route.params.iid;
    getDetails(this.iid).then(res => {
      // console.log(res);
      // 2.请求轮播图的图片信息
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 3.请求商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 5.获取图片信息
      this.detailInfo = data.detailInfo;
      // 6.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 7.获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    getRecommend().then(res => {
      // console.log(res);
      this.recommmeds = res.data.list;
    });
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("detailsItemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramz.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommed.$el.offsetTop - 44);

      // console.log(this.themeTopYs);
    },
    detailTitleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      this.isShowTop = position.y < -1000;

      let positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex != i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[parseInt(i)] &&
            positionY < this.themeTopYs[parseInt(i) + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[parseInt(i)]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.curretIndex = this.currentIndex;
        }
      }
    },
    backTop() {
      console.log("backTop");
      this.$refs.scroll.scrollTo(0, 0);
    },
    addShopCart() {
      const production = {};

      production.iid = this.iid;
      production.image = this.topImages[0];
      production.title = this.goods.title;
      production.desc = this.goods.desc;
      production.realPrice = this.goods.realPrice;
      // console.log(production);
      // console.log(this.goods);
      this.$store.dispatch("addCart", production).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        // }, 2000);
        console.log(this.$toast.show);
        this.$toast.show(res, 2000);
      });
    }
  }
};
</script>

<style scoped>
#details {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.details-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
