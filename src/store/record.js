import {auth, db} from '@/main'
import {push, ref} from 'firebase/database';

export default {
  namespaced: true,
  actions: {
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
