import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import initialData from './modules/initialData'
import scales from './modules/scales'
// axios.defaults.baseURL = ''

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    initialData,
    scales
  },
  state: {
 /*    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ] */
    intervalStartRoot :'0',
    tonica:'A',
    fechaEfectoTarificacion: '',
    actividades: {
      esqui: 'false',
    },
    scalesPainted: [
      { id: 0, mode: '0', used: false ,onlyBoxes: []},
      { id: 1, mode: '0', used: false ,onlyBoxes: []},
      { id: 2, mode: '0', used: false ,onlyBoxes: []},

    ]    
  },
  getters: {
    intervalStartRoot: state => state.intervalStartRoot,
    //intervalToPaint: state=>state.intervalToPaint,
    tonica: state=>state.tonica,
    scalesPainted: state=>state.scalesPainted
    },

  mutations: {
    updateIntervalStartRoot: (state, payload) => {
      state.intervalStartRoot = payload
  },
   incrementIntervalToPaint (state) {
      // mutate state
      state.intervalToPaint++
    },
    addScalePainted (state,payload) {
      // mutate state
     // console.log('addScalePainted ' +JSON.stringify(payload, null, 2));
     // console.log('addScalePainted state.scalesPainted' +JSON.stringify(state.scalesPainted, null, 2));
     // console.log('payload.id ' +payload.id);
      Vue.set(state.scalesPainted, payload.id, payload)
     // console.log('addScalePainted after' + JSON.stringify(state.scalesPainted, null, 2));
    },
    changeTonicNote(state,payload){
      console.log("changeTonicNote->"+payload);

      state.tonica=payload;

    }
/*     resetIntervalToPaint (state) {
      // mutate state
      console.log('resetIntervalToPaint');
      state.intervalToPaint=0;
    } */
}

})
