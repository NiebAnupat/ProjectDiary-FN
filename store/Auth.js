import Cookies from 'js-cookie'
export const state = () => ({
  isAuth: false,
  user: false
});

export const getters = {
  isAuth: (state) => state.isAuth,
  user: (state) => state.user
};

export const mutations = {
  toggleAuth(state) {
    state.isAuth = !state.isAuth;
  },

  setAuth(state, payload) {
    state.isAuth = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  }
};

export const actions = {

  async loginWithEmailAndPassword({ commit,dispatch }, payload) {
    const { email, password } = payload;
    try {
      const { user } = await this.$fire.auth.signInWithEmailAndPassword(email, password);
      const { uid,displayName } = user;
      commit('setUser', { uid, displayName });
      const token = await this.$fire.auth.currentUser.getIdToken()
      Cookies.set('access_token', token)
      dispatch('note/fetchNotes',null,{root:true})
      dispatch('note/fetchTodayNotes',null,{root:true})
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  },

  async registerWithEmail({ commit }, payload) {
    const { email, password, displayName } = payload;
    try {
      await this.$fire.auth.createUserWithEmailAndPassword(email, password);

      // update user profile
      await this.$fire.auth.currentUser.updateProfile({ displayName });

      // save user to firestore
      await this.$fire.firestore
        .collection("users")
        .doc(this.$fire.auth.currentUser.uid)
        .set({
          displayName: displayName,
          email: email,
          uid: this.$fire.auth.currentUser.uid
        });

      // sign out
      await this.$fire.auth.signOut();
      console.log("register success");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async resetPassword({ commit }, payload) {
    const email = payload;
    try {
      await this.$fire.auth.sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

   logout({ commit,dispatch }) {
     this.$fire.auth.signOut().then(async () => {
       commit('setUser', null);
       dispatch('note/clearState', null, { root: true });
       await Cookies.remove('access_token')
       return true
     }).catch((error) => {
        console.log(error);
        return false
     });

  },

  setUser({commit}, payload) {
    commit('setUser', payload);
  },

  toggleAuth({ commit }) {
    commit("toggleAuth");
  },


  setAuthFalse({ commit }) {
    commit("setAuth", false);
  },

  setAuthTrue({ commit }) {
    commit("setAuth", true);
  }
};
