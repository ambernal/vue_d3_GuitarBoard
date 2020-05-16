<template>

<div class="btn-group-vertical"  role="group">
   <button
    v-for="mode in modesNames" 
    :key="mode.id"
    type='button'
    @click="showMode(mode.index)" 
    class='btn btn-outline-dark'
   >{{mode.name}}
</button>
</div>

<!-- //btn-outline-secondary
    <button @click="guitarBoardPaint">YEahhh</button>
    {{this.$store.state.actividades.esqui }}-- {{esqui}}
    <div>
    </div>
-->
</template>

<script>
import * as d3 from "d3";
/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "ModesZone",
  
  data() {
    return {
      modesNames : this.$store.state.initialData.modesNames,
      msg: "?? from the ModesZone Component",
      height: 285,
      width: 1300,
      initdataClass :'',
      weight: ''
    };
  },
  
  methods: {
    incrementIntervalToPaint : function(){
    this.$store.dispatch('addScalePainted')
   },
    showMode: function(mode){
      console.log('chupame los huevos vue' +mode)
      var scale = {};
              scale ["mode"] = mode;
              scale ["onlyBoxes"] = 0;
              scale ["name"] = this.$store.state.initialData.modesNames[mode].name;
              scale ["mayorRelative"] = this.$store.state.initialData.modesNames[mode].mayorRelative;
              scale ["minorRelative"] = this.$store.state.initialData.modesNames[mode].minorRelative;
              this.$store.commit('addScalePainted',scale);
              //scalesPainted.push(scale);
                this.paintScale(mode);
  },
  paintScale:function(indexMode){
      //console.log("scaleNotes->" +JSON.stringify(this.$store.state.getter.scalesPainted, null, 2))

     /*  if(this.$store.state.getter.scalesPainted===1){
        console.log("ya hay una escala pintada");
      // stroke='#72ff00';
      }else if(this.$store.state.getter.scalesPainted===2){
        console.log("ya hay 2 escalas pintada");

      }else if(this.$store.state.getter.scalesPainted>=3){
        console.log("STOP!!! ya hay mas de 3 escala pintada");
      }
 */
      var scaleInterval = this.getScaleIntervals(indexMode);

      for(var key in scaleInterval) {

      //  console.log("Pintamos el interval ->" +scaleInterval[key]);

     for (var cuerda=1; cuerda<7; cuerda++) {

          /* var colour = 'white';
          if(this['note'] == this.$store.getters.tonica)colour='yellow'; */
          //pintaNote(cuerda,colour,this['note'],radioSizeCircle,strokeWidthCircle,stroke,this["interval"]);
        this.paintInterval(cuerda,scaleInterval[key]);
      


}
//console.log("Añadimos el intervalo a usedintervals");
//usedintervals(this["interval"]);
 }



//console.log("Ahora ya pintamos las opciones para el modo "+index);

//paintIntervals();



//con el scalesPainted updated volvemos a pintar el panel

//paintSelectModes();
//paintOptions(0, index);
//paintOptions(0);

//jsonObj = [];
  //pongo a uno que hay una escala ya pintada
 // isAScalePaint=1;
},
 getScaleIntervals: function( scaleType) {
 // console.log("getScaleIntervals->" +scaleType);
  var scaleNotes = this.$store.getters.scaleIntervals[scaleType].intervals;
  //console.log("scaleNotes->" +JSON.stringify(scaleNotes, null, 2))
  return scaleNotes;
   },

 paintInterval: function(string,interval){
  //console.log("paintInterval-> interval->" +interval +"string-> "+string);
  this.updateCircles(string,interval);
  this.updateText(string,interval);

    return string+interval;



 },
 updateCircles: function(string,interval){

  d3.select("#string"+string).selectAll('circle').filter(function() {
      return d3.select(this).attr("data-interval") == interval;
  }).each(function(){
    if(interval === 'F'){
        d3.select(this).attr("class",'circle-active-tonica');
    }else   d3.select(this).attr("class",'circle-active');

  });

 },


  updateText: function(string,interval){
 console.log("updateText->");
 var tonica = this.$store.getters.tonica
console.log("tonica->" +tonica);
var notaName = this.getNoteNameFromInterval(interval,tonica)
  d3.select("#string"+string).selectAll('text').filter(function() {
      return d3.select(this).attr("data-interval") == interval;
  }).each(function(){
        d3.select(this).text(notaName);

  });

 },
  getNoteNameFromInterval: function(interval,tonica){
var intervaloPosition = '';
var tonicaPosition = '';
var notePosition = '';
console.log("interval->" +interval);
console.log("tonica->" +tonica);
 for(var key in this.$store.getters.intervalsInfo) {
     if(this.$store.getters.intervalsInfo[key].name == interval)  {
      intervaloPosition = this.$store.getters.intervalsInfo[key].intervalo;
      break;

     }
 }   
  for(var keyNote in this.$store.getters.mastilNotes) {
      if(this.$store.getters.mastilNotes[keyNote].label == tonica)  {
         console.log("Label->" +this.$store.getters.mastilNotes[keyNote].label);
      tonicaPosition = this.$store.getters.mastilNotes[keyNote].id;
      break;

      }
    }

  notePosition = parseInt(intervaloPosition) + parseInt(tonicaPosition);
  if(notePosition>11) notePosition = notePosition -12;
console.log("notePosition->" +this.$store.getters.mastilNotes[notePosition].label);

  return this.$store.getters.mastilNotes[notePosition].label;

 },
guitarBoardPaint: function () {
  
var svgDashBoard = d3.select("#dashboard");
var mastil=  svgDashBoard;
 var trastes=  mastil.append("g");
for(var traste = 0 ; traste<16 ; traste ++){
 trastes.append("rect")
            .attr("x",85 +70*traste)
            .attr("y", 35)
            .attr("width", 5)
            .attr("height", 210)
            .attr("fill",function () {


             if(traste == 0){
                 return "black";
            }else{
                return "none";
            }

          })
          .attr("class", 'fretCircle') 

}
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
