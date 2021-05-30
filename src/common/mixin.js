export const backTopMixin = {
  data: function() {
    return {
      isShowTop: false
    }
  },
  methods: {
    backTop: function() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
}