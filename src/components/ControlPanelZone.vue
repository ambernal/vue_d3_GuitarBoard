<template>
<!-- <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
 --> <nav class="navbar navbar-expand-lg navbar-dark bg-dark curved-box "> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
          <ul class="navbar-nav">
            <li>
                <select class="select-css" v-on:change="changeTonicNote($event)">
                  <option>select tunning</option>
                  <option
                      v-for="mode in notes" 
                      :key="mode.id"
                      :value="mode.label"
                      >{{mode.label}}
                  </option>
                  </select>
                  <p>{{this.$store.getters.tonica}}</p>
            </li>
            <li class="nav-item active control-panel">
              <div class="nav-link"> Panel de control</div>
            </li>
            <li class="nav-item ">
                <select class="select-css" v-on:change="changeItem(rowId, $event)">
                    <option>select Display </option>
                    <option value="interval">Interval</option>
                    <option value="notes">Notes</option>
                  </select>
            </li>
          </ul>
        </div>
      </nav>



</template>
<script>
import * as d3 from "d3";
 /*const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
 */
export default {
  name: "ControlPanelZone",
  
  data() {
    return {
      notes: this.$store.getters.notes,
      modesNames : this.$store.state.initialData.modesNames
    };
  },
   computed:{
      scaledPainted:function() {
         return this.$store.getters.scalesPainted
      }
  },
 
  beforeUpdate(){
      console.log('igual no me chupa los huevos vue ControlPanelZone ');
  },
  update(){
      console.log('igual no me chupa los huevos vue 2 ControlPanelZone');
  },
  methods: {
  
    changeTonicNote: function changeItem( event) {
     this.$store.commit('changeTonicNote',event.target.value);
    },
    changeItem: function changeItem(rowId, event) {
      this.selected = event.target.value;
      if(this.selected=="interval") {
        this.showInterval();
      }else{
        this.showNotes();
      }
    },
    showInterval:function(){
        for (var string=1; string<7; string++) {
          d3.select("#string"+string).selectAll('text').filter(function() {
               return d3.select(this).text() != "";
           }).each(function(){
            d3.select(this).text(d3.select(this).attr("data-interval"));
           });
      }
   },
    showNotes:function(){
        for (var string=1; string<7; string++) {
          d3.select("#string"+string).selectAll('text').filter(function() {
              return d3.select(this).text() != "";
           }).each(function(){
            d3.select(this).text(d3.select(this).attr("data-note"));
           });
      }
   }
  }
};
</script>

<style>
.control-panel{
    margin-right: 45px;
    margin-left: 45px;
}

.curved-box{
  box-sizing: border-box
}
.select-css {
 
 color: #444;
 line-height: 1.3;
 padding: .4em 1.4em .3em .8em;
 box-sizing: border-box;
 margin: 0;
 border: 1px solid #aaa;
 box-shadow: 0 1px 0 1px rgba(0,0,0,.03);
 border-radius: .3em;
 background-color: #fff;
 background-repeat: no-repeat, repeat;
 background-position: right .7em top 50%, 0 0;
 background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
 display: none;
}
.select-css:hover {
 border-color: #888;
}

.select-css option {
 font-weight:normal;
}
</style>
