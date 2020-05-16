import Vue from 'vue'
import Vuex from 'vuex'
// state
const state = {
  respuesta: {
    data: {
      datos: { 
        // Se leeria asi en la template--->
        // {{this.$store.state.initialData.respuesta.data.datos[0].conceptosEconomicosSimulacion.primaPuraTexto}} 

        0: {
          conceptosEconomicosSimulacion: {
            primaPuraTexto: '-2312'
          }
        },
        1: {
          conceptosEconomicosSimulacion: {
            primaPuraTexto: '-'
          }
        },
        2: {
          conceptosEconomicosSimulacion: {
            primaPuraTexto: '-'
          }
        }
      }
    }
  }
}

Vue.use(Vuex)
// getters
const getters = {
  getRespuesta () {
    return state.respuesta
  }
}

// actions
const actions = {}

// mutations
const mutations = {
    setWeight (state, value) {
        state.weight = value
      }
}

export default {
  state,
  getters,
  actions,
  mutations
} 