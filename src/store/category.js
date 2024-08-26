import {auth, db} from '@/main'
import {ref, push, get, update} from 'firebase/database';

export default {
  namespaced: true,
  actions: {
    async fetchCategories({commit}) {
      try {
        const categoriesRef = ref(db, `users/${auth.currentUser.uid}/categories`);

        const snapshot = await get(categoriesRef);
        const categories = snapshot.val() || {};

        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    },
    async createCategory({commit}, {title, limit}) {
      try {
        const categoriesRef = ref(db, `users/${auth.currentUser.uid}/categories`);

        return await push(categoriesRef, { title, limit });
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    },
    async updateCategory({commit}, {title, limit, id}) {
      try {
        const categoryRef = ref(db, `/users/${auth.currentUser.uid}/categories/${id}`);

        return await update(categoryRef, { title, limit });
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  }
}
