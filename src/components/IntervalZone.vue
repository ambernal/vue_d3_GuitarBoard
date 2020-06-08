<template>
<div class="btn-group-vertical"  role="group">
   <button
    v-for="interval in intervalsInfo" 
    :key="interval.id"
    type='button'
    @click="showInterval(interval.name,$event)" 
    class='btn btn-outline-dark'
   >{{interval.name}}
   </button>
</div>
</template>

<script>
//import * as d3 from "d3";
/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "IntervalZone",
  props: {
    intervalsUsed: {type: Array, default: () => []}
  },  
  data() {
    return {
     // intervalsUsed : this.$store.getters.intervalsUsed,
      intervalsInfo: this.$store.getters.intervalsInfo,
      //scalesBoxData :''

    };
  },
   computed:{
      /*  intervalsUsed:function() {
         return  this.$store.getters.intervalsUsed
      },  */
  }, 
  beforeUpdate(){
      console.log('beforeUpdate ChordsZone');
  },
  update(){
      console.log('update ModesZone');
  },
  methods: {
   showInterval: function(name,$event){
     // console.log('showChord se ejecuta mode-> ' + mode +"idChord->" +idChord)
     $event.target.classList.toggle('btn-warning')
      console.log("intervalsUsed->" +JSON.stringify(this.intervalsUsed, null, 2))

    /*  if(this.scaledPainted.length<4){
        var id=0;
        //var used = 0;
        var freeSpace = false;
        for(var key in this.scaledPainted) {

            if(this.scaledPainted[key].used==false &&!freeSpace){
                id= this.scaledPainted[key].id
                freeSpace=true;
                //console.log("Id selected "+this.scaledPainted[key].id);
            } 
        }
        if(freeSpace){
      var scale = {};
              scale ["id"] = id
              scale ["mode"] = parseInt(mode)+1; //TODO _ Fix this : add one because -1 when get a scale mode in getScaleIntervals
              scale ["used"] = true;
              scale ["onlyBoxes"] = []; //chords dont have onlyBoxes option
              scale ["chord"] = true
              scale ["idChord"] = idChord
              scale ["chordInitialString"] = initialString
              scale ["chordFinalString"] = finalString
              
              this.$store.commit('addScalePainted',scale);
              console.log("Chord added "+scale);
      }
    } */


    }
  }
};
</script>

<style>

.prueba {
    stroke:#ffc107;
    fill:#ffc107;
    stroke-width:1;
}

</style>
