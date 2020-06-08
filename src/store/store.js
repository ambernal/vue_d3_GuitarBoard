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
      { id: 0, mode: '0', used: false ,onlyBoxes: [], scale: 0},
      { id: 1, mode: '0', used: false ,onlyBoxes: [], scale: 0},
      { id: 2, mode: '0', used: false ,onlyBoxes: [], scale: 0},

    ],
    intervalsUsed:[]  
  },
  getters: {
    intervalStartRoot: state => state.intervalStartRoot,
    //intervalToPaint: state=>state.intervalToPaint,
    tonica: state=>state.tonica,
    scalesPainted: state=>state.scalesPainted,
    intervalsUsed: state=>state.intervalsUsed
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

    }, addIntervalUsed(state, payload){
       // console.log('addIntervalUsed ' +JSON.stringify(payload, null, 2));
     // console.log('addIntervalUsed state.intervalsUsed' +JSON.stringify(state.intervalsUsed, null, 2));
     // console.log('payload.id ' +payload.id);
      //Vue.set(state.intervalsUsed, payload.id, payload)
      //for(var key in scaleInterval) {
      state.intervalsUsed.push(payload);
           // console.log('addIntervalUsed after' + JSON.stringify(state.intervalsUsed, null, 2));


    }
/*     resetIntervalToPaint (state) {
      // mutate state
      console.log('resetIntervalToPaint');
      state.intervalToPaint=0;
    } */
}

})
