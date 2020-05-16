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
    scalesPainted: []    
  },
  getters: {
    intervalStartRoot: state => state.intervalStartRoot,
    //intervalToPaint: state=>state.intervalToPaint,
    tonica: state=>state.tonica,
    scalesPainted: state=>state.scalesPainted
    },
  
/*   getters: { // cuando hay que aplicar cierta logica a la hora de recuperarlo del state
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }, en la .vue recuperarlo con store.getters.doneTodos*/
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
      console.log('addScalePainted ' +JSON.stringify(payload, null, 2));
      state.scalesPainted.push(payload)
      console.log('addScalePainted after' + JSON.stringify(state.scalesPainted, null, 2));
    }
/*     resetIntervalToPaint (state) {
      // mutate state
      console.log('resetIntervalToPaint');
      state.intervalToPaint=0;
    } */
}

})
