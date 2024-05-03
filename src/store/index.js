import { createStore } from 'vuex';
import * as types from './mutation-types';

const store = createStore({
    state () {
        return {
            notes: [],
        }
    },
    mutations: {
        [types.REPLACE_STATE](state, newState) {
            Object.assign(state, newState);
        },

        [types.ADD_NOTE](state, note) {
            state.notes = [note, ...state.notes];
        },

        [types.DELETE_NOTE](state, id) {
            state.notes = state.notes.filter((note) => note.id !== id) 
        },

        [types.EDIT_NOTE](state, payload) {
            const index = state.notes.findIndex((note) => note.id === payload.id);
            state.notes[index] = payload;
        },
    },
    actions: {
        replaceState({ commit, state }) {
            if (localStorage.getItem('user_notes')) {
                commit(types.REPLACE_STATE, {...state, notes: JSON.parse(localStorage.getItem('user_notes'))})
			}
        }
    },
})

export default store;