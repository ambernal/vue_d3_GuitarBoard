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
    {index: 10,name:"acordes7M" ,intervals: ["F","3M","5J","7M"]},
    {index: 11,name:"acordesMenor7mayor" ,intervals: ["F","3m","5J","7M"]},
    {index: 12,name:"acordesMenor7m" ,intervals: ["F","3m","5J","7m"]},
    {index: 13,name:"triads maior" ,intervals: ["F","3M","5J"]},
    {index: 14,name:"triads minor" ,intervals: ["F","3m","5J"]}

  ],
  chords : [
    {scaleIntervalsIndex: 9, chordIndex:"0", finalString : 1, initialString :4, jsonName:"7Chords_from4String", name:"Dominant Chords from 4 String" , "seventh": "m", "third":"M"},
    {scaleIntervalsIndex: 9, chordIndex:"1", finalString : 2, initialString :5, jsonName:"7Chords_from5String", name:"Dominant Chords from 5 String" , "seventh": "m", "third":"M"},
    {scaleIntervalsIndex: 9, chordIndex:"2", finalString : 3, initialString :6, jsonName:"7Chords_from6String", name:"Dominant Chords from 6 String" , "seventh": "m", "third":"M"},
    {scaleIntervalsIndex: 10, chordIndex:"3", finalString : 1, initialString :4, jsonName:"7Chords_from4String", name:"7M Chords from 4 String" , "seventh": "M", "third":"M"},
    {scaleIntervalsIndex: 10, chordIndex:"4", finalString : 2, initialString :5, jsonName:"7Chords_from5String", name:"7M Chords from 5 String" , "seventh": "M", "third":"M"},
    {scaleIntervalsIndex: 10, chordIndex:"5", finalString : 3, initialString :6, jsonName:"7Chords_from6String", name:"7M Chords from 6 String" , "seventh": "M", "third":"M"},
    {scaleIntervalsIndex: 11, chordIndex:"6", finalString : 1, initialString :4, jsonName:"7Chords_from4String_m", name:"7 Chords minor from 4 String" , "seventh": "M", "third":"m"},
    {scaleIntervalsIndex: 11, chordIndex:"7", finalString : 2, initialString :5, jsonName:"7Chords_from5String_m", name:"7 Chords minor from 5 String" , "seventh": "M", "third":"m"},
    {scaleIntervalsIndex: 11, chordIndex:"8", finalString : 3, initialString :6, jsonName:"7Chords_from6String_m", name:"7 Chords minor from 6 String" , "seventh": "M", "third":"m"},
    {scaleIntervalsIndex: 12, chordIndex:"9", finalString : 1, initialString :4, jsonName:"7Chords_from4String_m", name:"7m Chords minor from 4 String" , "seventh": "m", "third":"m"},
    {scaleIntervalsIndex: 12, chordIndex:"10", finalString : 2, initialString :5, jsonName:"7Chords_from5String_m", name:"7m Chords minor from 5 String" , "seventh": "m", "third":"m"},
    {scaleIntervalsIndex: 12, chordIndex:"11", finalString : 3, initialString :6, jsonName:"7Chords_from6String_m", name:"7m Chords minor from 6 String" , "seventh": "m", "third":"m"}
  ],
  triads: [
    {scaleIntervalsIndex: 13, chordIndex:"13", finalString : 1, initialString :6, jsonName:"triads_from6String", name:"Major Triads" , "seventh": "-", "third":"M"},
    {scaleIntervalsIndex: 14, chordIndex:"14", finalString : 1, initialString :6, jsonName:"triads_from6String", name:"Minor Triads" , "seventh": "-", "third":"m"}

  ]
  /* box1_Pent_Mayor:[
    { "1": [ "F", "2M"] },
    { "2": [ "5J", "6M"]},
    { "3": [ "2M", "3M"]},
    { "4": [ "6M", "F"]},
    { "5": [ "3M", "5J"]},
    { "6": [ "F", "2M"]}
  ], */

}


Vue.use(Vuex)
// getters
const getters = {
  scaleIntervals: state=>state.scaleIntervals,
 // box1_Pent_Mayor: state=>state.box1_Pent_Mayor,
  chords: state=>state.chords,
  triads: state=>state.triads
}



export default {
  state,
  getters
} 