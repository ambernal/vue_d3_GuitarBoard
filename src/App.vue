<template>
<div class="container">
    <div class='row'>
      <div class="col-12">
   <svg id="gtr"
      :height='height'
      :width='width'
    >
    <g id="dashboard" transform="translate(0 0) scale(1 1)" class="fretboard">
    <rect id="fret_backdrop" transform="translate(85, 25) scale(1, 1)"
     x=0
     y=0 
      :height='fretBoardHeight'
      :width='fretBoardWidth'
      class=fretboard>
      </rect> 
        <g id="frets">
           <rect
            v-for="index in 16" :key="index"
            :x=getFretXposition(index) 
            y=35
            width=5
            height=210
            class=fret
            >
           </rect>
        </g>
         <g id="signalFret">
           <circle
            v-for="c in signalFretCoordenates"
            :key="c.id"
            :cx= "c.x"
            cy=275
            r=10
            class='fretCircle'
            >
           </circle>
        </g>
        <g id="strings">
          <g
            v-for="index in 6" :key="index"
            :id="getStringId(index)"
            :transform="getTransformString(index)"
          >
          <line
            x1=90
            y1=20
            x2=1160
            y2=20
            class='guitarString'
          ></line>
             <circle
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getCircleId(interval,index)
              :cx=getCircleOrTextXposition(interval)
              r=15
              cy=20
              class='circle-hidden'
              :data-interval=getIntervalName(interval,index)
              >
              </circle> 
              <text
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getTextId(interval,index)
              :x=getCircleOrTextXposition(interval)
              :fret=interval
              :transform=getTransformText()
              text-anchor=middle
              y=25
              :data-interval=getIntervalName(interval,index)
              >
              </text>
              <rect
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getRectangleId(interval,index,up)
              :fret=interval
              :x=getRectangleXposition(interval)
              :y=getRectangleYposition(interval,up)									
              rx=10						
              ry=10							
              width=65				
              height=10
              :data-interval=getIntervalName(interval,index)	
              class='rect-hidden'	
              >
             </rect>
              <rect
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getRectangleId(interval,index,middle)
              :fret=interval
              :x=getRectangleXposition(interval)	
              :y=getRectangleYposition(interval,middle)							
              rx=0						
              ry=0							
              width=65				
              height=10	
              :data-interval=getIntervalName(interval,index)	
              class='rect-hidden'		
              >
             </rect>
             <rect
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getRectangleId(interval,index,down)
              :fret=interval
              :x=getRectangleXposition(interval)	
              :y=getRectangleYposition(interval,down)							
              rx=10						
              ry=5							
              width=65				
              height=10
              :data-interval=getIntervalName(interval,index)			
              class='rect-hidden'		
              >
             </rect>
             <rect
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getRectangleId(interval,index,left)
              :fret=interval
              :x=getRectangleXposition(interval)	
              :y=5							
              rx=10						
              ry=5							
              width=32				
              height=30
              :data-interval=getIntervalName(interval,index)			
              class='rect-hidden'	
              >
             </rect>
             <rect
              v-for="interval in fretIntervals"
              :key="interval.id"
              :id=getRectangleId(interval,index,right)
              :fret=interval
              :x=getRectangleXposition(interval,right)	
              :y=5							
              rx=10						
              ry=5							
              width=32				
              height=30
              :data-interval=getIntervalName(interval,index)		
              class='rect-hidden'		
              >
             </rect>
         </g> 
     </g>    
    </g> 
   
    </svg>

</div>

</div>
<div class="row">
<!-- <div>
    <GuitarBoard :initdata=loadData />

  </div>-->
  <div class="col-3">
    <ModesZone />
  </div> 
</div>  
  </div>
</template>

<script>
import ModesZone from './components/ModesZone.vue';
//import GuitarBoard from './components/GuitarBoard.vue';

//import * as d3 from 'd3';

export default {
  name: 'App',
  components: {
  /*   HelloWorld, */
    //GuitarBoard,
    ModesZone
  },

 data: function() {
    return {
      up: 'up',
      middle: 'middle',
      down: 'down',
      left:'left',
      right:'right',
      height: this.$store.state.initialData.boardSize.height,
      width: this.$store.state.initialData.boardSize.width,
      fretBoardHeight: this.$store.state.initialData.boardSize.fretBoardHeight,
      fretBoardWidth: this.$store.state.initialData.boardSize.fretBoardWidth, 
      signalFretCoordenates: this.$store.state.initialData.signalFretCoordenates,
      fretIntervals: this.$store.state.initialData.fretIntervals,
      stringTranslateStart : this.$store.state.initialData.boardSize.stringTranslateStart,
      stringTranslateSeparator : this.$store.state.initialData.boardSize.stringTranslateSeparator,
      loadData: []
    };
  },
  created() {
    console.log("App loaded");
    //this.fetchData();
      console.log("App loaded<-");
  },
computed: {

},
  methods: {
  /*  incrementIntervalToPaint : function(){
    this.$store.dispatch('incrementIntervalToPaint')
   },
    incrementIresetIntervalToPaintntervalToPaint(){
    this.$store.dispatch('resetIntervalToPaint')
   }, */
   
   getComplexInterval: function(interval){
     var complexInterval = 0;
      if(interval.startsWith("12-")){
        var arrayDeCadenas = String(interval).split("-");
        for (var i=0; i < arrayDeCadenas.length; i++) {
              complexInterval = complexInterval +parseInt(arrayDeCadenas[i]);
        }
        return complexInterval;
      }else return interval;
   },
   getFretXposition: function(index){
      return this.$store.getters.fretTranslateStart+(this.$store.getters.fretTranslateSeparator*(index-1))
   },
   getRectangleYposition: function(interval,position){
    
      if(position === 'up'){
          return  this.$store.getters.rectangleUpPosition
      }else if(position === 'middle'){
          return  this.$store.getters.rectangleMiddlePosition
      }else    return this.$store.getters.rectangleDownPosition 
   }, 
   getRectangleXposition: function(interval,position){
      var xBasePosition = '';
      interval = this.getComplexInterval(interval);
      if(position === 'right'){
        xBasePosition = this.$store.getters.rectangleRightTranslateStart
      }else{
        xBasePosition = this.$store.getters.rectangleLeftTranslateStart
      }
      return xBasePosition  + (this.$store.getters.rectangleTranslateSeparator*interval) 
   },
    getCircleOrTextXposition: function (interval) {
      
      interval = this.getComplexInterval(interval);
      return this.$store.getters.circleAndTextTranslateStart+ (this.$store.getters.circleAndTextTranslateSeparator*interval) 
    },
    getStringId: function(index){
      return "string"+index
    },
    getTransformString: function(index){
      return "translate(0, "+ (this.stringTranslateStart+((index-1)*this.stringTranslateSeparator))+")"
    },
    getTransformText: function(){
      return "translate(0, 0) scale(1, 1)"
    },
    getRectangleId: function (interval,cuerda,position) {
      //console.log("getRectangleId-> interva- " +interval +"cuerda-> "+cuerda);
        var rectangleName ='';
       if(position === 'up'){
          rectangleName ='-rectUp'
      }else   if(position === 'middle'){
         rectangleName = '-middle'
      }else   if(position === 'down'){
         rectangleName = '-down'   
      }else   if(position === 'left'){
         rectangleName = '-left'   
      }else  rectangleName = '-right'
      return this.getBaseId(interval,cuerda)+rectangleName
    },
    getTextId: function (interval,cuerda) {
     //console.log("getTextId-> interva- " +interval +"cuerda-> "+cuerda);
      return this.getBaseId(interval,cuerda)+'-text'
    },
    getCircleId: function (interval,cuerda) {
      //console.log("getCircleId-> interva- " +interval +"cuerda-> "+cuerda);
      return this.getBaseId(interval,cuerda)
    },
    getIntervalName :function(interval,cuerda){
      console.log("getCircleId-> interva- " +interval +" cuerda-> "+cuerda);
       var currentInterval=  this.getInterval(interval,cuerda)
         console.log("currentInterval-> "+currentInterval);
        for(var key in this.$store.getters.intervalsInfo) {
          console.log("bucle-> "+this.$store.getters.intervalsInfo[key].intervalo);
                if (this.$store.getters.intervalsInfo[key].intervalo ==  currentInterval){
                    return this.$store.getters.intervalsInfo[key].name
                }
        }
        return ''
    },
    getInterval: function(interval,cuerda){

        if(interval.startsWith("12-")){
            interval = interval.substring(3)
             //console.log("fret interval 12->"+interval);
        } 
       var stringRootInterval = this.getIntervalFretZeroFromTonicByString(cuerda);
        //console.log("stringRootInterval->"+stringRootInterval);
       var currentIntervalToPaint = parseInt(stringRootInterval) +(parseInt(interval));
      //console.log("currentIntervalToPaint->"+currentIntervalToPaint);
     
      if(currentIntervalToPaint>11)         currentIntervalToPaint = currentIntervalToPaint - 12; 
     return currentIntervalToPaint;
   },
    getBaseId: function(interval,cuerda) {
      //console.log("getBaseId START cuerda->"+cuerda +' intervalo ->'+interval);

     var idGenerated = '';
     var octava = '';
     if(interval.startsWith("12-"))     octava= '12-';
     idGenerated = 'string-'+cuerda +'-'+ octava +this.$store.getters.intervalsInfo[this.getInterval(interval,cuerda)].name

      //console.log("getBaseId END idGenerated->"+idGenerated); 
     return idGenerated
    },
     getIntervalFretZeroFromTonicByString: function(cuerda){

    var tonica = this.$store.getters.tonica
    var diferencia=0;
    var tonicaBoolean=false
    var cuerdaArrayPosition = cuerda -1;
    var noteZero =this.$store.getters.afinacion[cuerdaArrayPosition].label;

/*  console.log('getIntervalFretZeroFromTonicByString string-> '+cuerdaArrayPosition);
    console.log('getIntervalFretZeroFromTonicByString noteZero '+noteZero );
    console.log('getIntervalFretZeroFromTonicByString tonica '+tonica ); */  
  for(var key in this.$store.getters.mastilNotes) {
        if (this.$store.getters.mastilNotes[key].label ===  noteZero) {
          //console.log('getIntervalFretZeroFromTonicByString noteZero true');
            noteZero=true;
            break;
        }else
        if (this.$store.getters.mastilNotes[key].label ==  tonica) {
             //console.log('getIntervalFretZeroFromTonicByString tonica true ');
            diferencia++;
            tonicaBoolean=true;

       // }else  if (noteZero && this.$store.getters.mastilNotes[key].label !=  tonica) {
          }else{
          //console.log('getIntervalFretZeroFromTonicByString diferencia++');
                diferencia++;
        }
    }
    // TODO porque se repite

    if(!tonicaBoolean){
      //console.log('getIntervalFretZeroFromTonicByString como no se ha llegado a la tonica volvemos a recorrer');

      //si no se ha encontrado la tonica aun volvemos a recorrer el array desde el ppio para ver el num de notas que faltan

        for(var keySecondLoop in this.$store.getters.mastilNotes) {
    //  console.log('getIntervalFretZeroFromTonicByString ====================mastilNotes !tonica '+this.$store.getters.mastilNotes[keySecondLoop].label );
            if (this.$store.getters.mastilNotes[keySecondLoop].label ===  tonica) {
               //console.log('getIntervalFretZeroFromTonicByString tonica true ');
                tonicaBoolean=true;
                break;
            }else if (this.$store.getters.mastilNotes[keySecondLoop].label !=  tonica) {
             // console.log('getIntervalFretZeroFromTonicByString diferencia++');
                    diferencia++;
             }

        }

    }

    //console.log('getIntervalFretZeroFromTonicByString diferencia ' +diferencia);

return diferencia;

}
  }
};

</script>

<style>



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   margin-top: 60px;
}
.circleNotes {
    stroke:none;
    fill:lightgrey;
}
.fret {
  fill:lightgrey;
} 
.fretCircle {
    stroke:black;
    fill:lightgrey;
}
.guitarString {
    stroke:#868e96;
    stroke-width:2;
}
.fretboard{
fill:#212529
}
.circle-active{
  fill:white;
  stroke:lightgrey;
  stroke-width:2;
}

.circle-active-tonica{
  fill:yellowgreen;
  stroke:lightgrey;
  stroke-width:2;
}

.circle-hidden{
   fill:rgba(255, 255, 255, 0.01);
  stroke:none;
  stroke-width:0;  
}
.rect-hidden{
   fill:rgba(255, 255, 255, 0.01);
  stroke:none;
  stroke-width:0;  
}	
.rect-active{
  fill:none;
  stroke:red;
  stroke-width:2;
}
</style>
