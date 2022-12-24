export const state = () => ({
  isAuth: false,
  user: null,
})

export const getters = {
  isAuth: (state) => state.isAuth,
  user: (state) => state.user,
}

export const mutations = {
  toggleAuth(state) {
    state.isAuth = !state.isAuth
  },

  setAuth(state, payload) {
    state.isAuth = payload
  },
  setUser(state, payload) {
    state.user = payload
  },
}

export const actions = {
  async registerWithEmail({ commit }, payload) {
    console.log(payload)
    const { email, password, displayName } = payload
    try {
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)

      // update user profile
      await this.$fire.auth.currentUser.updateProfile({ displayName })

      // save user to firestore
      await this.$fire.firestore
        .collection('users')
        .doc(this.$fire.auth.currentUser.uid)
        .set({
          displayName: displayName,
          email: email,
          uid: this.$fire.auth.currentUser.uid,
        })

      // sign out
      await this.$fire.auth.signOut()

      console.log('register success')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },

  toggleAuth({ commit }) {
    commit('toggleAuth')
  },

  setAuthFalse({ commit }) {
    commit('setAuth', false)
  },

  setAuthTrue({ commit }) {
    commit('setAuth', true)
  },
}
