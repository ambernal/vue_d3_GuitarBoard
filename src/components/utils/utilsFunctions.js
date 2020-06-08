export const utilsFunctions = {
adaptScaleIntervalToChordTonic(scaleInterval,bluesChord,intervalsInfo){

    let TonicDistance = 0;
    let scaleIntervalWithNewTonic = []
    //console.log("bluesChord -> " + bluesChord);
    if(bluesChord == 'IV') {
        TonicDistance = 5
    }else  TonicDistance = 7 
  
    let newInterval = '';
    for(var key in scaleInterval) {
      //console.log(" interval to change -> " + scaleInterval[key]);
         for(var intervalName in intervalsInfo) {
          if(intervalsInfo[intervalName].name == scaleInterval[key] )  {
              newInterval = intervalsInfo[intervalName].intervalo;
                  //console.log("new interval -> " + + newInterval);
                  var total = parseInt(newInterval) + parseInt(TonicDistance)
                  // console.log( "total ->" +total);
                  if(total>11) total = total -12 
                  // console.log( "total definitivo->" +total);
                    scaleIntervalWithNewTonic.push(intervalsInfo[total].name)
  
            break;
  
          }
      }   
      
    }
  //console.log(" scaleIntervalWithNewTonic -> " + scaleIntervalWithNewTonic);
  return scaleIntervalWithNewTonic;
  },

  getIntervalFretZeroFromTonicByString: function(cuerda,tonica,noteZero,mastilNotes){
    
    //let tonica = this.$store.getters.tonica
    let diferencia=0;
    let tonicaPosition =0;
    let zeroPosition = 0;
    let isTonicaBeforeZeroFretNote=false
    //let cuerdaArrayPosition = cuerda -1;
    //let noteZero =this.$store.getters.afinacion[cuerdaArrayPosition].label;

   // var cuerdaLog =4

  /* console.log('getIntervalFretZeroFromTonicByString !!');
   console.log('getIntervalFretZeroFromTonicByString string-> '+cuerdaArrayPosition);
    console.log('getIntervalFretZeroFromTonicByString noteZero '+noteZero );
    console.log('getIntervalFretZeroFromTonicByString tonica '+tonica );   */
  
    for(var key in mastilNotes) {
           // console.log('comparamos con'+mastilNotes[key].label);
       
          if (mastilNotes[key].label ==  tonica) {
             //console.log('getIntervalFretZeroFromTonicByString tonica ejecutado ');
            tonicaPosition= diferencia;
            // diferencia++;
            isTonicaBeforeZeroFretNote=true;
         
        }if (mastilNotes[key].label ===  noteZero) {
         //console.log('getIntervalFretZeroFromTonicByString noteZero ejecutado');
            break;

          }else {
          //console.log('getIntervalFretZeroFromTonicByString diferencia++');
                diferencia++;
        }

      
    }

    if(isTonicaBeforeZeroFretNote){
        // console.log('getIntervalFretZeroFromTonicByString diferencia ' +diferencia +'- tonicaPosition '+tonicaPosition);
        var diferenciaFinal = diferencia-tonicaPosition;
        //console.log('getIntervalFretZeroFromTonicByString  diferenciaFinal ->' + diferenciaFinal);     
        return diferenciaFinal;

     
    }else if(!isTonicaBeforeZeroFretNote){
       //How we have got the zeroFret but not the tonicNote that means that rootNote is before TonicNote so we
      //only have to know the diference between both notes
      diferencia = 0;

      //console.log('getIntervalFretZeroFromTonicByString como no se ha llegado a la tonica  y si al fretZero quiere decir volvemos a recorrer para calcular simplemente la distancia entre las 2');
        for(var keySecondLoop in mastilNotes) {
            //console.log('isTonicaBeforeZeroFretNote ====================mastilNotes !tonica '+mastilNotes[keySecondLoop].label );
            if (mastilNotes[keySecondLoop].label ==  noteZero){
              //console.log('isTonicaBeforeZeroFretNote noteZero true ');
                  zeroPosition = diferencia;
                  diferencia++;
                  
            }else if (mastilNotes[keySecondLoop].label ==  tonica) {
               //console.log('isTonicaBeforeZeroFretNote tonica true ');
                isTonicaBeforeZeroFretNote=true;
                //tonicaPosition= diferencia;
                break;
            }else if (mastilNotes[keySecondLoop].label !=  tonica) {
              //console.log('isTonicaBeforeZeroFretNote diferencia++');
                    diferencia++;
             }
        }
         //console.log('getIntervalFretZeroFromTonicByString diferencia->' + diferencia +"zeroPosition "+zeroPosition);     
  var diferencia12 = 12 - (diferencia-zeroPosition);
   //console.log('getIntervalFretZeroFromTonicByString con Fret12->' + diferencia12);     

        return diferencia12;
    }


},  

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




}