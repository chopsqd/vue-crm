import {auth, db} from '@/main'
import {signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} from "firebase/auth";
import {ref, set} from 'firebase/database';

export default {
  namespaced: true,
  actions: {
    async login({commit}, {email, password}) {
      try {
        return await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        // { root: true } - мутация должна быть вызвана на корневом уровне хранилища, а не в текущем модуле
        commit('error/setError', error, {root: true})
      }
    },
    async register({commit}, {email, password, name}) {
      try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);

        const userRef = ref(db, `/users/${user.uid}/info`);
        await set(userRef, {
          bill: 100000,
          name
        })

        return user
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    },
    async logout({commit}) {
      try {
        commit('info/clearInfo', null, {root: true})
        return await signOut(auth);
      } catch (error) {
        commit('error/setError', error, {root: true})
      }
    }
  }
}
