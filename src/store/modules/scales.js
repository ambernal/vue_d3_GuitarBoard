import Vue from 'vue'
import Vuex from 'vuex'
// state
const state = {
  
  
scaleIntervals : [
    {index: 0, name:"pentatonicaMayor" ,intervals: ["F","2M","3M","5J","6M"]},
    {index: 1,name:"pentatonicaMenor" ,intervals: ["F","3m","4J","5J","7m"]},
    {index: 2,name:"ionian" ,intervals: ["F","2M","3M","4J","5J","6M","7M"]},
    {index: 3,name:"dorian" ,intervals: ["F","2M","3m","4J","5J","6M","7m"]},
    {index: 4,name:"phrygian" ,intervals: ["F","2M","3M","4J","5J","6m","7m"]},
    {index: 5,name:"lydian" ,intervals: ["F","2M","3M","4Aum","5J","6M","7M"]},
    {index: 6,name:"mixolydian" ,intervals: ["F","2M","3M","4J","5J","6M","7m"]},
    {index: 7,name:"aeolian" ,intervals: ["F","2M","3m","4J","5J","6m","7m"]},
    {index: 8,name:"locrian" ,intervals: ["F","2m","3m","4J","4Aum","6m","7m"]},
    {index: 9,name:"acordesDominantes" ,intervals: ["F","3M","5J","7m"]},
    {index: 10,name:"acordesm7" ,intervals: ["F","3m","5J","7m"]},
    {index: 11,name:"acordesMayor7mayor" ,intervals: ["F","3M","5J","7M"]},
    {index: 12,name:"arpeggios" ,intervals: []}

   
  ],

  box1_Pent_Mayor:[
    { "1": [ "F", "2M"] },
    { "2": [ "5J", "6M"]},
    { "3": [ "2M", "3M"]},
    { "4": [ "6M", "F"]},
    { "5": [ "3M", "5J"]},
    { "6": [ "F", "2M"]}
  ],

}


Vue.use(Vuex)
// getters
const getters = {
  scaleIntervals: state=>state.scaleIntervals,
  box1_Pent_Mayor: state=>state.box1_Pent_Mayor,
}



export default {
  state,
  getters
} 