import {auth, db} from '@/main'
import {get, push, ref} from 'firebase/database';

export default {
  namespaced: true,
  actions: {
    async fetchRecords({commit}) {
      try {
        const recordsRef = ref(db, `users/${auth.currentUser.uid}/records`);
        const snapshot = await get(recordsRef);
        const records = snapshot.val() || {};

        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    },
    async createRecord({commit}, recordData) {
      try {
        const recordsRef = ref(db, `users/${auth.currentUser.uid}/records`);

        return await push(recordsRef, recordData);
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    }
  }
}
