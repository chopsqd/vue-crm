export default {
  namespaced: true,
  actions: {
    async fetchCurrency() {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR')
      return await res.json()
    }
  }
}
