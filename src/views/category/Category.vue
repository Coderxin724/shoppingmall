<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <template v-slot:center>
        <div>
          商品分类
        </div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu
        :category-tab-list="categoryTabList"
        @selectItem="selectItem"
      ></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <tab-content-category
          :category-data="categoryData"
        ></tab-content-category>
        <tab-control
          :titles="['综合', '新品', '销量']"
          class="tab-control"
          @tabClick="tabClick"
        ></tab-control>
        <tab-content-detail
          :category-goods="categoryGoods[currentType].list"
          @imageLoad="imageLoad"
        ></tab-content-detail>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import { debounce } from "common/untils.js";
import Scroll from "components/common/scroll/Scroll.vue";
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../network/category";
export default {
  name: "Category",
  data() {
    return {
      categoryTabList: [],
      categoryData: [],
      currentIndex: -1,
      categoryGoods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop"
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail,
    Scroll
  },
  created() {
    this.getCategory();
  },
  // 组件创建完后调用
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("categoryItemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    /**
     * 网络请求的数据的方法
     */
    getCategory() {
      getCategory().then(res => {
        // console.log(res);
        this.categoryTabList = res.data.category.list;
        // console.log(this.categoryTabList);
        this.getSubcategory(0);
      });
    },
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categoryTabList[index].maitKey;
      // 请求数据
      getSubcategory(maitKey).then(res => {
        this.categoryData = res.data.list;

        this.getCategoryDetail("pop");
        this.getCategoryDetail("new");
        this.getCategoryDetail("sell");
      });
    },
    getCategoryDetail(type) {
      const miniWallkey = this.categoryTabList[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        // console.log(res);
        this.categoryGoods[type].list = res;
      });
    },
    /**
     * 时间监听的方法
     */
    selectItem(index) {
      this.getSubcategory(index);
      this.$refs.scroll.refresh();
    },
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.category-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  display: flex;
}
</style>
