<template>
<div class="btn-group-vertical"  role="group">
   <button
    v-for="mode in modesNames" 
    :key="mode.id"
    type='button'
    @click="showMode(mode.index,mode.bluesChord,$event)" 
    class='btn btn-outline-dark'
   >{{mode.name}} 
</button>
{{this.scalesUsed}}
{{ this.paintAllScales()}}
</div>
</template>

<script>
import * as d3 from "d3";
import {ChordsFunctions} from "./utils/paintLineChords.js";
import {d3Functions} from "./utils/paintd3Elements.js"; 
import {utilsFunctions} from "./utils/utilsFunctions.js"; 

/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "ModesZone",
  props: {
    scalesUsed: {type: Array, default: () => []}
  },  
  data() {
    return {
      modesNames : this.$store.state.initialData.modesNames,
      scalesBoxData :'',
      stringTranslateStart : this.$store.state.initialData.boardSize.stringTranslateStart,
      stringTranslateSeparator : this.$store.state.initialData.boardSize.stringTranslateSeparator,
    };
  },
   computed:{
      scaledPainted:function() {
         return  this.$store.getters.scalesPainted
      },
 /*      getBox1_Pent_Mayor:function() {
         return  this.$store.getters.box1_Pent_Mayor
      } */
  }, 
   created() {
     this.fetchDataInitial();

  },
  beforeUpdate(){
      console.log('beforeUpdate ModesZone');
  /*      var keys = Object.keys(this.scalesBoxData);
          console.log(keys[7]);  */
      console.log('beforeUpdate ModesZone<-');
  },
  update(){
      console.log('update ModesZone');
  },
  methods: {
    async fetchDataInitial() {
       let scalesBox = await d3.json("./scalesBox.json");
      //console.log("scalesBox tras el await" + JSON.stringify(scalesBox, null, 2));
      this.scalesBoxData = scalesBox;

    },
    showMode: function(mode,bluesChord,$event){
      console.log('showMode se ejecuta ' + mode +" y bluesChord " +bluesChord)
     $event.target.classList.toggle('btn-warning')
      if(this.scaledPainted.length<4){
        var id=0;
        //var used = 0;
        var freeSpace = false;
        for(var key in this.scaledPainted) {
            //console.log("Id Is used "+this.scaledPainted[key].id);
            // console.log("Is used "+this.scaledPainted[key].used);
                if(this.scaledPainted[key].used==false &&!freeSpace){
                    id= this.scaledPainted[key].id
                    freeSpace=true;
                    //console.log("Id selected "+this.scaledPainted[key].id);
                   
                } /* else  if(this.scaledPainted[key].used==true){
                   //console.log("used++ ");
                  used++
                } */
        }
        if(freeSpace){
      var scale = {};
              scale ["id"] = id
              scale ["mode"] = mode //parseInt(mode)+1;
              scale ["used"] = true;
              var onlyBoxes = [] //its the first time that i paint the scale so onlyBoxes = empty
              scale ["onlyBoxes"] = onlyBoxes;
              if(typeof bluesChord !== "undefined")scale["bluesChord"] = bluesChord;
             /* scale ["name"] = this.$store.state.initialData.modesNames[mode].name;
              scale ["mayorRelative"] = this.$store.state.initialData.modesNames[mode].mayorRelative;
              scale ["minorRelative"] = this.$store.state.initialData.modesNames[mode].minorRelative; */
              this.$store.commit('addScalePainted',scale);
              this.paintAllScales();
      }
    }
  },
  paintAllScales: function(){
    var used ='';
    for(var key in this.scaledPainted) {
         if(this.scaledPainted[key].used==true){
                   //console.log("used++ ");
                  used++
                }
    }  
      //console.log("reinicio!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      d3Functions.resetCircles();
        for(var index in this.scaledPainted) {
          console.log("Pinto el scaledPainted !!!!" + index);
          if(this.scaledPainted[index].used) this.paintScale(this.scaledPainted[index].onlyBoxes,this.scaledPainted[index].mode,used,index,this.scaledPainted[index].bluesChord);

        }
      return;
  },
   paintScale:function(onlyBoxes,indexMode,used,numberScaledPainted,bluesChord){
      //console.log("scaleNotes->" +JSON.stringify(this.$store.state.getter.scalesPainted, null, 2))
     //console.log("paintScale-> Pintamos el indexMode ->"+indexMode +"used-> " +used);
      var scaleInterval ="";
    if(indexMode>0 && (onlyBoxes.length==0 ||onlyBoxes[0]==0)){
       //console.log("Hay que pintar escala completa");
        scaleInterval = this.getScaleIntervals(parseInt(indexMode)-1);

       if(typeof bluesChord !== "undefined" && bluesChord != 'I'){
        // console.log("Hay que pintar un blueschord with diferente tonic so we have to transform intervals");
        scaleInterval = utilsFunctions.adaptScaleIntervalToChordTonic(scaleInterval,bluesChord,this.$store.getters.intervalsInfo);
       }

        for(var key in scaleInterval) {
        //  console.log("Pintamos el interval ->" +scaleInterval[key]);
       
        let initialString =7;
        let finalString =1;
        if (this.scaledPainted[numberScaledPainted]["chordInitialString"]>0) {
          initialString = parseInt(this.scaledPainted[numberScaledPainted]["chordInitialString"])+1;
          finalString = parseInt(this.scaledPainted[numberScaledPainted]["chordFinalString"]);
          console.log("I am painting chords by String so only paint their string ");
        }
          for (var string=finalString; string<initialString; string++) {
            this.paintInterval(string,scaleInterval[key],used,numberScaledPainted,bluesChord);
          }
        }

        if(this.scaledPainted[numberScaledPainted].used && this.scaledPainted[numberScaledPainted].chord)this.paintChordsLines(this.scaledPainted[numberScaledPainted].idChord);
      }else {
        //console.log("Hay que pintar boxes");
        for(var box in onlyBoxes) {  
          console.log("box to paint->" +onlyBoxes[box]);
            var name = "box"+onlyBoxes[box]+"_"+this.$store.getters.scaleIntervals[parseInt(indexMode)-1].name;
             console.log("scale name to search->" +name);
            //var boxToPaint = this.scalesBoxData["box1_pentatonicaMayor"];
            var boxToPaint = this.scalesBoxData[name];
            // console.log("box to paint->" +boxToPaint2);
            Object.keys(boxToPaint).forEach(key => {
            // console.log(key + ' - ' + JSON.stringify(boxToPaint[key], null, 2));
             var stringToPaint = boxToPaint[key];
              Object.keys(stringToPaint).forEach(string => {
                stringToPaint[string].forEach(interval => {
                   // console.log("intervaloBox= "+interval +" string" +string +" used" +used +" numberScaledPainted" +numberScaledPainted)
                     this.paintInterval(string,interval,used,numberScaledPainted)
                });
             }); 
            });
        }
      }

      // this.$store.commit('addIntervalUsed',scaleInterval);

},
paintChordsLines(chordType){
   console.log("getChordIntervals-> - chordType ->" +chordType);
   var chordsToUse =0;
   chordsToUse = this.$store.getters.chords.filter(e => e["chordIndex"] == chordType  );
   if(chordsToUse == 0) chordsToUse = this.$store.getters.triads.filter(e => e["chordIndex"] == chordType  );
     console.log("chordsToUse" + ' - ' + JSON.stringify(chordsToUse, null, 2));
    ChordsFunctions.getChords(chordsToUse,this.scalesBoxData,this.stringTranslateStart, this.stringTranslateSeparator);
},
 getScaleIntervals: function( scaleType) {
  //console.log("getScaleIntervals->" +scaleType);
  var scaleNotes = this.$store.getters.scaleIntervals[scaleType].intervals;
  //console.log("scaleNotes->" +JSON.stringify(scaleNotes, null, 2))
  return scaleNotes;
   },

 paintInterval: function(string,interval,scalesNumber,numberScaledPainted,bluesChord){
  var name="#string-"+string+"-"+interval;
   // console.log("paintInterval-> interval-> " +interval +" string-> "+string + " scalesNumber-> "+scalesNumber + " numberScaledPainted-> "+numberScaledPainted+" name=>"+name);

  var usedCurrentInterval =d3.select(name).attr("data-used");
  //console.log("name-> "+name +" - usedCurrentInterval-> " +usedCurrentInterval + " dataInterval-> "+dataInterval);
  
  //if this interval never has been painted and it´s the first scale dont paint background
  if(usedCurrentInterval==0){
    //console.log("entra en 0!!!!!!")
    d3Functions.updateCircles(string,interval,bluesChord);
    var notaName = this.getNoteNameFromInterval(interval,this.$store.getters.tonica)
    d3Functions.updateText(string,interval,notaName);

  }
    //if this interval never has been painted <2 and it´s the second scale  paint background
   if(usedCurrentInterval<2 && scalesNumber>1){
    //  console.log("entra en 1!!!!!!")
     //console.log("usedCurrentInterval-> " +usedCurrentInterval ); 
    d3Functions.updateLateralRect(string,interval,usedCurrentInterval,numberScaledPainted);
  }else if(usedCurrentInterval==2){
    // console.log("entra en 2!!!!!!")
      d3Functions.updateColumRect(string,interval);
  }  
    d3.select("#string-"+string+"-"+interval).attr("data-used",parseInt(usedCurrentInterval)+1);
    return ;
 }, 

  getNoteNameFromInterval: function(interval,tonica){
    var intervaloPosition = '';
    var tonicaPosition = '';
    var notePosition = '';
    /* console.log("interval->" +interval);
    console.log("tonica->" +tonica); */
    for(var key in this.$store.getters.intervalsInfo) {
        if(this.$store.getters.intervalsInfo[key].name == interval)  {
          intervaloPosition = this.$store.getters.intervalsInfo[key].intervalo;
          break;

        }
    }   
  for(var keyNote in this.$store.getters.mastilNotes) {
      if(this.$store.getters.mastilNotes[keyNote].label == tonica)  {
         //console.log("Label->" +this.$store.getters.mastilNotes[keyNote].label);
      tonicaPosition = this.$store.getters.mastilNotes[keyNote].id;
      break;

      }
    }

  notePosition = parseInt(intervaloPosition) + parseInt(tonicaPosition);
  if(notePosition>11) notePosition = notePosition -12;
    //console.log("notePosition->" +this.$store.getters.mastilNotes[notePosition].label);

  return this.$store.getters.mastilNotes[notePosition].label;

 },

   },

};
</script>

<style>

.fret {
    stroke:#ffc107;
    fill:#ffc107;
    stroke-width:1;
}

.circleNotes {
    stroke:none;
    fill:lightgrey;
}

.fretCircle {
    stroke:red;
    fill:lightgrey;
}
</style>
