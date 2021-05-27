<template>
  <div id="details">
    <details-bar class="details-nav"></details-bar>
    <scroll class="content" ref="scroll">
      <details-swiper :topImages="topImages"></details-swiper>
      <details-base-info :goods="goods"></details-base-info>
      <details-shop-info :shop="shop"></details-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <ul>
        <li>详情页1</li>
        <li>详情页2</li>
        <li>详情页3</li>
        <li>详情页4</li>
        <li>详情页5</li>
        <li>详情页6</li>
        <li>详情页7</li>
        <li>详情页8</li>
        <li>详情页9</li>
        <li>详情页10</li>
        <li>详情页11</li>
        <li>详情页12</li>
        <li>详情页13</li>
        <li>详情页14</li>
        <li>详情页15</li>
        <li>详情页16</li>
        <li>详情页17</li>
        <li>详情页18</li>
        <li>详情页19</li>
        <li>详情页20</li>
        <li>详情页21</li>
        <li>详情页22</li>
        <li>详情页23</li>
        <li>详情页24</li>
        <li>详情页25</li>
        <li>详情页26</li>
        <li>详情页27</li>
        <li>详情页28</li>
        <li>详情页29</li>
        <li>详情页30</li>
        <li>详情页31</li>
        <li>详情页32</li>
        <li>详情页33</li>
        <li>详情页34</li>
        <li>详情页35</li>
        <li>详情页36</li>
        <li>详情页37</li>
        <li>详情页38</li>
        <li>详情页39</li>
        <li>详情页40</li>
        <li>详情页41</li>
        <li>详情页42</li>
        <li>详情页43</li>
        <li>详情页44</li>
        <li>详情页45</li>
        <li>详情页46</li>
        <li>详情页47</li>
        <li>详情页48</li>
        <li>详情页49</li>
        <li>详情页50</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import DetailsBar from "./childComps/DetailsBar";
import DetailsSwiper from "./childComps/DetailsSwiper";
import DetailsBaseInfo from "./childComps/DetailBaseInfo";
import DetailsShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "../../components/common/scroll/Scroll";

import { getDetails, Goods, Shop, GoodsParam } from "network/details";
export default {
  name: "Details",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  components: {
    DetailsBar,
    DetailsSwiper,
    DetailsBaseInfo,
    DetailsShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,

    Scroll
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  },
  created() {
    // 1.保存存入的id
    this.iid = this.$route.params.iid;

    getDetails(this.iid).then(res => {
      console.log(res);
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
    });
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
  height: calc(100% - 44px);
}
</style>
