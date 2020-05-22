<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<!--     --{{ this.$store.getters.scalesPainted[index]}}--{{index}}--
 -->      <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav">
          <div v-if="this.$store.getters.scalesPainted[index].used" >
          <li :class=getClassByPosition() >
            <a class="nav-link" href="#">{{this.$store.state.initialData.modesNames[mode].name}}</a>
            <div v-if="this.$store.getters.scalesPainted[index].mode<3" class='scale-used' >
                <div class="  btn-group-vertical"  role="group button-not-used">
                  <button  type='button'  @click="showBox(1,$event)"  class='btn btn-outline-dark '>Box 1</button>
                  <button  type='button'  @click="showBox(2,$event)"  class='btn btn-outline-dark'>Box 2</button>
                  <button  type='button'  @click="showBox(3,$event)"  class='btn btn-outline-dark'>Box 3</button>
                  <button  type='button'  @click="showBox(4,$event)"  class='btn btn-outline-dark'>Box 4</button>
                  <button  type='button'  @click="showBox(5,$event)"  class='btn btn-outline-dark'>Box 5</button>
                  <button  type='button'  @click="showBox(0,$event)"  class='btn btn-outline-dark'>All </button>
             </div>
            </div>
            <div v-else>
              modo griegooo
            </div> 
          </li>     
          </div>
          
            <div v-else>
              <li class="nav-item " >
              <div class='scale-empty'>
                  Select one scale , chords or arppegios
              </div>
              </li>
            </div>
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

   beforeUpdate(){
      console.log('beforeUpdate ScalesSelectedZone');
  },
  update(){
      console.log('update ScalesSelectedZone');
  },

  methods: {
    getClassByPosition: function(){
        if (this.index==0){
            return "active-first-used align"
        }else if (this.index==1){
            return "active-second-used align"
        }else if(this.index==2){
            return "active-third-used align"
        }

    },
   showBox: function(box,$event){
     console.log('showBox ' +this.mode + 'box '+box )
    $event.target.classList.toggle('btn-warning')

     var scale = this.$store.getters.scalesPainted[this.mode];
              /* scale ["id"] = id
              scale ["mode"] = mode;
              scale ["used"] = true; 
              scale ["name"] = this.$store.state.initialData.modesNames[this.mode].name;*/
              scale ["onlyBoxes"].push(box);
              /*scale ["mayorRelative"] = this.$store.state.initialData.modesNames[mode].mayorRelative;
              scale ["minorRelative"] = this.$store.state.initialData.modesNames[mode].minorRelative; */
              this.$store.commit('addScalePainted',scale);


   }
//btn-warning
   },

};
</script>

<style>
.align{
 display: flex;
 align-items: center;

}
.button-not-used{
  background-color: #f8f9fa;
}
.scale-empty {
     background-color: lightblue;
}

.scale-used {
     background-color: #fff;
}

.active-first-used {
     background-color: #CD5C5C;
}
.active-second-used {
     background-color: #fff9d9;
}
.active-third-used {
     background-color: greenyellow;
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
