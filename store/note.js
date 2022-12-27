// init nuxt store
export const state = () => ({
  notes: [],
  todayNotes: [],
  isLoading: false
});

export const getters = {
  notes: state => state.notes,
  todayNotes: state => state.todayNotes,
  isLoading: state => state.isLoading
};

export const mutations = {
  setNotes(state, notes) {
    state.notes = notes;
  },
  setTodayNotes(state, notes) {
    state.todayNotes = notes;
  },
  addNote(state, note) {
    state.notes.push(note);
  },
  updateNote(state, note) {
    const index = state.notes.findIndex(n => n.id === note.id);
    state.notes[index] = note;
  },
  deleteNote(state, note) {
    const index = state.notes.findIndex(n => n.id === note.id);
    state.notes.splice(index, 1);
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  }
};

export const actions = {
  async fetchNotes({ commit }) {
    commit("setNotes", []);
    commit("setLoading", true);
    try {
      const notes = await this.$fire.firestore
        .collection("users")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("notes")
        .orderBy("timestamp", "desc")
        .get()
        .then(querySnapshot => {
            const notes = [];
            querySnapshot.forEach(doc => {
              notes.push({ id: doc.id, ...doc.data() });
            });
            return notes;
          }
        );
      commit("setNotes", notes.reverse());
      commit("setLoading", false);

    } catch (e) {
      console.log(e);
    }
  },

  async fetchTodayNotes({ commit,getters }) {
    commit("setTodayNotes", []);
    try {
      const notes = getters.notes.filter(note => {
        const today = new Date().toISOString().slice(0, 10)
        return today === note.date
      })
      commit("setTodayNotes", notes);
    } catch (e) {
      console.log(e);
    }
  },

  async create({ commit }, note) {
    try {
      const firestoreTimestamp = this.$fireModule.firestore.FieldValue.serverTimestamp();
      const newNote = await this.$fire.firestore
        .collection("users")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("notes")
        .add({ ...note,timestamp : firestoreTimestamp });
      commit("addNote", { id: newNote.id, ...note });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  async deleteNote({ commit }, note) {
    try {
      await this.$fire.firestore
        .collection("users")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("notes")
        .doc(note.id)
        .delete();
      commit("deleteNote", note);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async deleteAllNotes({ commit }) {
    try {
      await this.$fire.firestore
        .collection("users")
        .doc(this.$fire.auth.currentUser.uid)
        .collection("notes")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
      commit("setNotes", []);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  async clearState({ commit }) {
    commit("setNotes", []);
    commit("setTodayNotes", []);
  }
};
