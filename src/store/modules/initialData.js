import Vue from 'vue'
import Vuex from 'vuex'
// state
const state = {
      boardSize: {
        height: 285,
        width: 1300,
        fretBoardHeight: 230,
        fretBoardWidth: 1080,
        stringTranslateStart:20,
        stringTranslateSeparator:40,
        circleAndTextTranslateStart:50,
        circleAndTextTranslateSeparator:70,
        fretTranslateStart:85,
        fretTranslateSeparator:70,
        rectangleLeftTranslateStart:20,
        rectangleRightTranslateStart:52,
        rectangleUpPosition:5,
        rectangleMiddlePosition:15,
        rectangleDownPosition:25,
        rectangleTranslateSeparator:70,
        fretClass:'fret'
    },
    modesNames : [
      
      { name: 'Major Pentatonic I', index: 1 , mayorRelative : 0, minorRelative: 0 , bluesChord :'I'},
      { name: 'Major Pentatonic IV', index: 1 , mayorRelative : 0, minorRelative: 0 , bluesChord :'IV'},
      { name: 'Major Pentatonic V', index: 1 , mayorRelative : 0, minorRelative: 0 , bluesChord :'V'},
      { name: 'Minor Pentatonic', index: 2 , mayorRelative : 0, minorRelative: 0},
      { name: 'Major / Ionian', index: 3 , mayorRelative : 0, minorRelative: 9},
      { name: 'Dorian', index: 4 , mayorRelative : 10, minorRelative: 7},
      { name: 'Phrygian', index: 5 , mayorRelative : 8, minorRelative: 5},
      { name: 'Lydian', index: 6 , mayorRelative : 7, minorRelative: 4},
      { name: 'Mixolydian', index: 7 , mayorRelative : 5, minorRelative: 2},
      { name: 'N Minor / Aeolian', index: 8 , mayorRelative : 0, minorRelative: 0},
      { name: 'Locrian', index: 9 , mayorRelative : 1, minorRelative: 10},
      
  ],
    signalFretCoordenates : [
      { id: 0, x: 260},
      { id: 1, x: 400},
      { id: 2, x: 540},
      { id: 3, x: 680},
      { id: 4, x: 880},
      { id: 5, x: 900},
      { id: 6, x: 1100}
    ],
    afinacion : [
      { id: 1,  label: "E"},
      { id: 2,  label: "B"},
      { id: 3,  label: "G"},
      { id: 4,  label: "D"},
      { id: 5,  label: "A"},
      { id: 6,  label: "E"}
   ],
   //F 2m 2M 3m 3M 4J 4Aum 5J 6m 6M 7b 7M
   //0 1  2  3  4  5  6     7  8  9  10 11
mastilNotes : [
  { id: 0,  label: "A"},
  { id: 1,  label: "A#"},
  { id: 2,  label: "B"},
  { id: 3,  label: "C"},
  { id: 4,  label: "C#"},
  { id: 5,  label: "D"},
  { id: 6,  label: "D#"},
  { id: 7,  label: 'E'},
  { id: 8,  label: "F"},
  { id: 9,  label: "F#"},
  { id: 10, label: "G"},
  { id: 11, label: "G#"},
], 
intervalsInfo : [  //old currentUsedIntervals //qutiar ispart, stroke y stroke width
  { "name": "F",  "intervalo": "0", "ispart": "0" ,"stroke":"#C6BD41","stroke_width":"4" },
  { "name": "2m", "intervalo": "1", "ispart": "0" ,"stroke":"#ff8000","stroke_width":"3" },
  { "name": "2M", "intervalo": "2",  "ispart": "0" ,"stroke":"#F08E0D","stroke_width":"3" },
  { "name": "3m", "intervalo": "3", "ispart": "0" ,"stroke":"#00e573","stroke_width":"3" },
  { "name": "3M", "intervalo": "4", "ispart": "0" ,"stroke":"#98388B","stroke_width":"3" },
  { "name": "4J", "intervalo": "5", "ispart": "0" ,"stroke":"#193ADF","stroke_width":"3" },
  { "name": "4Aum", "intervalo": "6", "ispart": "0" ,"stroke":"#666600","stroke_width":"3" },
  { "name": "5J", "intervalo": "7", "ispart": "0" ,"stroke":"#2D5A55","stroke_width":"3" },
  { "name": "6m", "intervalo": "8", "ispart": "0" ,"stroke":"#a64cff","stroke_width":"3" },
  { "name": "6M", "intervalo": "9", "ispart": "0" ,"stroke":"#48CEE2","stroke_width":"3" },
  { "name": "7m", "intervalo": "10", "ispart": "0" ,"stroke":"#2AAC44","stroke_width":"3" },
  { "name": "7M", "intervalo": "11", "ispart": "0" ,"stroke":"#cc6600","stroke_width":"3" }

  ],

    fretIntervals: ['0','1','2','3','4','5','6','7','8','9','10','11','12-0','12-1','12-2','12-3'],
    // 0  1  2  3  4  5  6  7  8  9  10 11
    // A     B  C     D     E  F     G
	notes : [
    { id: 0, index: 0, label: "A" , text:"A" },
    { id: 1, index: 1, label: "B♭" , text:"A#"},
    { id: 2, index: 2, label: "B" ,text:"B"},
    { id: 3, index: 3, label: "C" , text:"C"},
    { id: 4, index: 4, label: "D♭" , text:"C#"},
    { id: 5, index: 5, label: "D" , text:"D"},
    { id: 6, index: 6, label: "E♭" , text:"D#"},
    { id: 7, index: 7, label: "E" , text:"E"},
    { id: 8, index: 8, label: "F" , text:"F"},
    { id: 9, index: 9, label: "G♭" , text:"F#"},
    { id: 10, index: 10, label: "G" , text:"G"},
    { id: 11, index: 11, label: "A♭" , text:"G#"},
   ],
  }



Vue.use(Vuex)
// getters
const getters = {
  afinacion: state=>state.afinacion,
  boardSize: state=>state.boardSize,
  mastilNotes: state=>state.mastilNotes,
  fretIntervals: state=>state.fretIntervals,
  intervalsInfo: state=>state.intervalsInfo,
  fretTranslateStart: state=>state.boardSize.fretTranslateStart,
  fretTranslateSeparator: state=>state.boardSize.fretTranslateSeparator,
  circleAndTextTranslateStart:state=>state.boardSize.circleAndTextTranslateStart,
  circleAndTextTranslateSeparator: state=>state.boardSize.circleAndTextTranslateSeparator,
  rectangleLeftTranslateStart: state=>state.boardSize.rectangleLeftTranslateStart,
  rectangleRightTranslateStart: state=>state.boardSize.rectangleRightTranslateStart,
  rectangleUpPosition: state=>state.boardSize.rectangleUpPosition,
  rectangleMiddlePosition: state=>state.boardSize.rectangleMiddlePosition,
  rectangleDownPosition: state=>state.boardSize.rectangleDownPosition,
  rectangleTranslateSeparator:  state=>state.boardSize.rectangleTranslateSeparator,
  fretBoardWidth: state=>state.boardSize.fretBoardWidth,
  fretBoardHeight: state=>state.boardSize.fretBoardHeight,
  modesNames: state=>state.boardSize.modesNames,
  notes:  state=>state.notes
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