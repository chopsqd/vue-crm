import {auth, db} from '@/main'
import {ref, get, update} from 'firebase/database';

export default {
  namespaced: true,
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({commit}) {
      try {
        const infoRef = ref(db, `/users/${auth.currentUser.uid}/info`);
        const snapshot = await get(infoRef);
        const info = snapshot.val();

        commit('setInfo', info);
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    },
    async updateInfo({commit, getters}, toUpdate) {
      try {
        const infoRef = ref(db, `/users/${auth.currentUser.uid}/info`);
        const updateData = {...getters.info, ...toUpdate}
        await update(infoRef, updateData);

        commit('setInfo', updateData);
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
