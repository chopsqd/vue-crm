export default {
  namespaced: true,
  actions: {
    async fetchCurrency({commit}) {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/EUR')
        return await res.json()
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    }
  }
}
