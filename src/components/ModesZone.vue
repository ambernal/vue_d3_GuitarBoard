<template>
<div class="btn-group-vertical"  role="group">
   <button
    v-for="mode in modesNames" 
    :key="mode.id"
    type='button'
    @click="showMode(mode.index,$event)" 
    class='btn btn-outline-dark'
   >{{mode.name}}
</button>
{{this.scalesUsed}}
{{ this.paintAllScales()}}
</div>
</template>

<script>
import * as d3 from "d3";
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
      scalesBoxData :''
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
    showMode: function(mode,$event){
      //console.log('showMode se ejecuta ' + mode)
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
      this.resetCircles();
        for(var index in this.scaledPainted) {
          console.log("Pinto el scaledPainted !!!!" + index);
          if(this.scaledPainted[index].used) this.paintScale(this.scaledPainted[index].onlyBoxes,this.scaledPainted[index].mode,used,index);

        }
      return;
  },
   paintScale:function(onlyBoxes,indexMode,used,numberScaledPainted){
      //console.log("scaleNotes->" +JSON.stringify(this.$store.state.getter.scalesPainted, null, 2))
     //console.log("paintScale-> Pintamos el indexMode ->"+indexMode +"used-> " +used);
      var scaleInterval ="";
     if(onlyBoxes.length==0 ||onlyBoxes[0]==0){
       //console.log("Hay que pintar escala completa");
        scaleInterval = this.getScaleIntervals(parseInt(indexMode)-1);
        for(var key in scaleInterval) {
        //  console.log("Pintamos el interval ->" +scaleInterval[key]);
          for (var string=1; string<7; string++) {
            this.paintInterval(string,scaleInterval[key],used,numberScaledPainted);
          }
        }
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

},
 getScaleIntervals: function( scaleType) {
  //console.log("getScaleIntervals->" +scaleType);
  var scaleNotes = this.$store.getters.scaleIntervals[scaleType].intervals;
  //console.log("scaleNotes->" +JSON.stringify(scaleNotes, null, 2))
  return scaleNotes;
   },

 paintInterval: function(string,interval,scalesNumber,numberScaledPainted){
  var name="#string-"+string+"-"+interval;
   // console.log("paintInterval-> interval-> " +interval +" string-> "+string + " scalesNumber-> "+scalesNumber + " numberScaledPainted-> "+numberScaledPainted+" name=>"+name);

  var usedCurrentInterval =d3.select(name).attr("data-used");
  // var dataInterval =d3.select(name).attr("data-interval");
  //console.log("name-> "+name +" - usedCurrentInterval-> " +usedCurrentInterval + " dataInterval-> "+dataInterval);
  
  //if this interval never has been painted and it´s the first scale dont paint background
  if(usedCurrentInterval==0){
    //console.log("entra en 0!!!!!!")
    this.updateCircles(string,interval);
    this.updateText(string,interval);

  }
    //if this interval never has been painted <2 and it´s the second scale  paint background
   if(usedCurrentInterval<2 && scalesNumber>1){
    /*  console.log("entra en 1!!!!!!")
     console.log("usedCurrentInterval-> " +usedCurrentInterval ); */
    this.updateLateralRect(string,interval,scalesNumber,usedCurrentInterval,numberScaledPainted);
  }else if(usedCurrentInterval==2){
    // console.log("entra en 2!!!!!!")
      this.updateColumRect(string,interval);
  }  
    d3.select("#string-"+string+"-"+interval).attr("data-used",parseInt(usedCurrentInterval)+1);
    return ;
 },
 updateSingleRect: function(string,interval){
    d3.select("#string-"+string+"-"+interval+"-left" ).attr("class","rect-active")
   return string + interval
 },
 updateColumRect: function(string,interval){
   return string + interval
 },
 updateLateralRect: function(string,interval,scalesNumber,usedCurrentInterval,numberScaledPainted){

var leftPart = ""
var rightPart = ""
if(usedCurrentInterval==0){
    if(numberScaledPainted ==0) {
        leftPart ="rect-active-one-used";
        rightPart="rect-active-one-used";
    }else  if(numberScaledPainted ==1) {
        leftPart ="rect-active-two-used";
        rightPart="rect-active-two-used";
    } 
}else if(usedCurrentInterval==1){
      leftPart ="rect-active-one-used";
      rightPart="rect-active-two-used";
}else console.log("OJO QUE NO SE HA CUMPLIDO CONDICION")
 
   // console.log("usedTwoTimesClass-> "+usedTwoTimesClass +"porque used= " +usedCurrentInterval);
    d3.select("#string-"+string+"-"+interval+"-left" ).attr("class",leftPart)
    d3.select("#string-"+string+"-12-"+interval+"-left").attr("class",leftPart)
    d3.select("#string-"+string+"-"+interval+"-right" ).attr("class",rightPart)
    d3.select("#string-"+string+"-12-"+interval+"-right").attr("class",rightPart)

    return;

 },
 resetCircles: function(){
 for (var string=1; string<7; string++) {
    d3.select("#string"+string).selectAll('circle').each(function() {
    d3.select(this).attr("data-used",0);
    //
    d3.select(this).attr("class","circle-hidden");
  });
    d3.select("#string"+string).selectAll('text').each(function() {
    d3.select(this).text("");
  });
 d3.select("#string"+string).selectAll('rect').each(function() {
    d3.select(this).attr("class","rect-hidden");
  });
   

 }
    return
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
 //console.log("updateText->");
 var tonica = this.$store.getters.tonica
// console.log("tonica->" +tonica);
 var notaName = this.getNoteNameFromInterval(interval,tonica)
  d3.select("#string"+string).selectAll('text').filter(function() {
      return d3.select(this).attr("data-interval") == interval;
  }).each(function(){
        d3.select(this).attr("data-note",notaName);
        d3.select(this).text(notaName);

  });

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
