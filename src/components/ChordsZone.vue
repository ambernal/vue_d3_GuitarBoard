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
//import * as d3 from "d3";
/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "ChordsZone",
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
      console.log('beforeUpdate ChordsZone');
  },
  update(){
      console.log('update ModesZone');
  },
  methods: {
   
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
