import * as d3 from "d3";

export const d3Functions = {
  
  updateLateralRect: function(string,interval,usedCurrentInterval,numberScaledPainted){

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
/*      updateSingleRect: function(string,interval){
      d3.select("#string-"+string+"-"+interval+"-left" ).attr("class","rect-active")
     return string + interval
   }, */
   updateColumRect: function(string,interval){

 
            let downPart ="rect-active-one-used";
            let middlePart="rect-active-two-used";
            let upPart="rect-active-three-used";
      
     
       // console.log("usedTwoTimesClass-> "+usedTwoTimesClass +"porque used= " +usedCurrentInterval);
        d3.select("#string-"+string+"-"+interval+"-up" ).attr("class",upPart)
        d3.select("#string-"+string+"-12-"+interval+"-up").attr("class",upPart)
        d3.select("#string-"+string+"-"+interval+"-middle" ).attr("class",middlePart)
        d3.select("#string-"+string+"-12-"+interval+"-middle").attr("class",middlePart)
        d3.select("#string-"+string+"-"+interval+"-down" ).attr("class",downPart)
        d3.select("#string-"+string+"-12-"+interval+"-down").attr("class",downPart)
    
        return;
   },
   resetCircles: function(){
    for (var string=1; string<7; string++) {
       d3.select("#string"+string).selectAll('circle').each(function() {
       d3.select(this).attr("data-used",0);
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
    updateCircles: function(string,interval,bluesChord){
   
     d3.select("#string"+string).selectAll('circle').filter(function() {
         return d3.select(this).attr("data-interval") == interval;
     }).each(function(){

      if(typeof bluesChord !== "undefined" && interval === '4J' && bluesChord == 'IV'){
        d3.select(this).attr("class",'circle-active-tonica-iv');
      }else if(typeof bluesChord !== "undefined" &&  interval === '5J' &&  bluesChord == 'V'){
        d3.select(this).attr("class",'circle-active-tonica-v'); 
      }else if(interval === 'F'){
           d3.select(this).attr("class",'circle-active-tonica');
       }else   d3.select(this).attr("class",'circle-active');
       
     });
   
    },
   
   
     updateText: function(string,interval,notaName){
    //console.log("updateText->");
    // console.log("notaName->" +notaName);
     d3.select("#string"+string).selectAll('text').filter(function() {
         return d3.select(this).attr("data-interval") == interval;
     }).each(function(){
           d3.select(this).attr("data-note",notaName);
           d3.select(this).text(notaName);
   
     });
   
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