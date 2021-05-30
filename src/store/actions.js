export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduction = context.state.cartList.find(item => item.iid == payload.iid)
      if (oldProduction) {
        context.commit('addCounter', oldProduction)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1;
        context.commit('addCartTo', payload)
        resolve("添加新的商品")
      }
    })
  }
}