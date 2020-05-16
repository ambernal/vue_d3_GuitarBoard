import Vue from 'vue'
import Vuex from 'vuex'
// state
const state = {
  
  
scaleIntervals : [
    {index: 1, name:"pentatonicaMayor" ,intervals: ["F","2M","3M","5J","6M"]},
    {index: 2,name:"pentatonicaMenor" ,intervals: ["F","3m","4J","5J","7m"]},
    {index: 3,name:"ionian" ,intervals: ["F","2M","3M","4J","5J","6M","7M"]},
    {index: 4,name:"dorian" ,intervals: ["F","2M","3m","4J","5J","6M","7m"]},
    {index: 5,name:"phrygian" ,intervals: ["F","2M","3M","4J","5J","6m","7m"]},
    {index: 6,name:"lydian" ,intervals: ["F","2M","3M","4Aum","5J","6M","7M"]},
    {index: 7,name:"mixolydian" ,intervals: ["F","2M","3M","4J","5J","6M","7m"]},
    {index: 8,name:"aeolian" ,intervals: ["F","2M","3m","4J","5J","6m","7m"]},
    {index: 9,name:"locrian" ,intervals: ["F","2m","3m","4J","4Aum","6m","7m"]},
    {index: 10,name:"acordesDominantes" ,intervals: ["F","3M","5J","7m"]},
    {index: 11,name:"acordesm7" ,intervals: ["F","3m","5J","7m"]},
    {index: 12,name:"acordesMayor7mayor" ,intervals: ["F","3M","5J","7M"]},
    {index: 13,name:"arpeggios" ,intervals: []}

   
  ]
}


Vue.use(Vuex)
// getters
const getters = {
  scaleIntervals: state=>state.scaleIntervals,
  
}



export default {
  state,
  getters
} 