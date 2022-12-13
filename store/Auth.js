export const state = () => ({
  isAuth: false,
})

export const getters = {
  isAuth: (state) => state.isAuth,
}

export const mutations = {
  toggleAuth(state) {
    state.isAuth = !state.isAuth
  },

  setAuth(state, payload) {
    state.isAuth = payload
  },
}

export const actions = {
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
