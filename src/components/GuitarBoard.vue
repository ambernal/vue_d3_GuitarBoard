<template>
  <div>
    <h1>Dashboard in D3</h1>
    <h2>{{ msg }}</h2>
   

  </div>
</template>

<script>
//import * as d3 from "d3";
/* const d3 = {
  ...require('d3-geo'),
  ...require('d3-tile'),
}; */
export default {
  name: "GuitarBoard",
   props: ["initdata"],
  
  data() {
    return {
      msg: "👋 from the GuitarBoard Component",
      height: 285,
      width: 1300,
      initPaintData:[],
      initdataClass :''
    };
  },
  created() {
    console.log("GuitarBoard created");
    //this.$options.propsData.title
     this.fetchDataInitial();
     console.log("GuitarBoard created<-");
  },
   beforeCreate() {
    console.log("GuitarBoard beforeCreate");
    console.log("GuitarBoard beforeCreate<-");
    
  },
  methods: {
      fetchDataInitial(){
        //this.fetchData();
       // this.initPaintData = this.loadData.boardSize.fretClass;
       //this.initPaintData = this.initPaintData.boardSize.fretClass;
        console.log("initdata" + JSON.stringify(this.initdata.boardSize.fretClass, null, 2));
        this.initdataClass = this.initdata.boardSize.fretClass;
        console.log("initdataClass " + this.initdataClass);
        
      },
   /*   async fetchData() {
       let data = await d3.json("./tweets.json");
      console.log("data tras el await" + JSON.stringify(data, null, 2));
      this.initPaintData = data;
      this.initdataClass =this.initPaintData.boardSize.fretClass;
    }, */

 /*    packChart() {
        const output = '';
      return output ;  
    } */
  },
  computed: {
    
/*      guitarBoardPaint(){
      var svgDashBoard = d3.select("#dashboard");
      var mastil=  svgDashBoard;
        return mastil;
    }, 
    packData() {
    
      return this.initdata;
    },
    output() {
       // let init= this.initdata;
       // console.log("data2" + JSON.stringify(init, null, 2));
      return this.initdata;
    } */
  }
};
</script>

<style>
.guitarString {
    stroke:#868e96;
    stroke-width:2;
}

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
