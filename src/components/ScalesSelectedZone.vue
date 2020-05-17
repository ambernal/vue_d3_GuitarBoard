<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    --{{ this.$store.getters.scalesPainted[index]}}--{{index}}--
      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Panel de Control <span class="sr-only">(current)</span></a>
          <div v-if="this.$store.getters.scalesPainted[index].used">
            <div v-if="this.$store.getters.scalesPainted[index].mode<2" class='scale-empty'>
                yeyeahh pentatonicaa--{{this.mode}}--{{this.$store.getters.scalesPainted[this.index].mode}}
                <div class="btn-group-vertical"  role="group">
                  <button  type='button'  @click="showBox(1)"  class='btn btn-outline-dark'>Box 1</button>
                  <button  type='button'  @click="showBox(2)"  class='btn btn-outline-dark'>Box 2</button>
                  <button  type='button'  @click="showBox(3)"  class='btn btn-outline-dark'>Box 3</button>
                  <button  type='button'  @click="showBox(4)"  class='btn btn-outline-dark'>Box 4</button>
                  <button  type='button'  @click="showBox(5)"  class='btn btn-outline-dark'>Box 5</button>
                  <button  type='button'  @click="showBox(0)"  class='btn btn-outline-dark'>All </button>
             </div>
            </div>
            <div v-else>
              modo griegooo
            </div>    
          </div>
            <div v-else>
              <div class='scale-empty'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vitae quaerat, quas, consequatur explicabo illum quia officiis placeat omnis aliquam saepe ullam ipsam enim repellat ratione? Commodi sint laudantium iure.
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div>
</div>
    </nav>


</template>
<script>
import { mapState } from 'vuex';
//import * as d3 from "d3";
/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "ScalesSelectedZone",
  computed: mapState(['scalesPainted']),
 /*  created() {
    this.unwatch = this.$store.watch(
      (state, getters) => getters.scalesPainted,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`);

        // Do whatever makes sense now
        if (newValue === 'success') {
          this.complex = {
            deep: 'some deep object',
          };
        }
      },
    );
  }, 
  beforeDestroy() {
    this.unwatch();
  }, */
  //props: ['index'],
  props: {
    scale: { type: Object, default: () => {} },
    index:{}
  },  
     data() {
    return {
      
      mode : this.$store.getters.scalesPainted[this.index].mode

    };
  }, 
  mounted() {
    //console.log("scale", this.scale);
  },
   beforeUpdate(){
      console.log('igual no me chupa los huevos vue ScalesSelectedZone');
  },
  update(){
      console.log('igual no me chupa los huevos vue 2 ScalesSelectedZone');
  },
/*    computed:{
      scaledPainted:function() {
        console.log('index->' +this.index);
        var used =this.$store.getters.scalesPainted[this.index].used
        var mode =this.$store.getters.scalesPainted[this.index].mode
        var scale = this.$store.getters.scalesPainted
        console.log('scale->' +scale);
         return scale[this.index]
      }
  },
 */
  methods: {
   showBox: function(box){
     console.log('showBox ' +this.mode + 'box '+box )
   }

   },

};
</script>

<style>

.scale-empty {
     background-color: lightblue;
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
