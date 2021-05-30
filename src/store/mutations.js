export default {
  addCounter(state, payload) {
    payload.count += 1
  },
  addCartTo(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}