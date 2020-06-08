import * as d3 from "d3";
//import  {chordsFretToPaintEnum}  from "./enums.js";


export const ChordsFunctions = {
    getChords: function(chordsToUse,scalesBoxData,stringTranslateStart, stringTranslateSeparator) {
      for (let i = 0; i < chordsToUse.length; i++) {
        let chordsToPaint = scalesBoxData[chordsToUse[i]["jsonName"]];
        //console.log("chordsToPaint" + ' - ' + JSON.stringify(chordsToPaint, null, 2));
        
        for (let j = 0; j < chordsToPaint.length; j++) {
          let chord = chordsToPaint[j];
            for (let key in chordsToPaint[j]) {
              let chordPosition = chord[key];
              let coordenates = [];
              for (let m = 0; m < chordPosition.length; m++) {
            
               // console.log("datosCuerda" + ' - ' + JSON.stringify(chordPosition[m], null, 2));
                let interval = '';
                if(chordPosition[m]["intervalo"]=="7") interval = "7"+chordsToUse[i]["seventh"]
                else if(chordPosition[m]["intervalo"]=="3") interval = "3"+chordsToUse[i]["third"]
                else interval = chordPosition[m]["intervalo"]
                let stringNote = "string-"+chordPosition[m]["cuerda"] +"-"+interval;
                let stringNote12 = "string-"+chordPosition[m]["cuerda"] +"-12-"+interval;
                //console.log("stringNote "+stringNote +"12 -" +stringNote12);
               
                coordenates.push(this.getChordCoordenates(stringNote,chordPosition[m],stringNote12));
              }

              this.paintLines(coordenates,stringTranslateStart, stringTranslateSeparator,j);
          }
        }
       }
    },
    getChordCoordenates(stringNote,chordPosition,stringNote12){
      let chord = {};
      
      chord ["id"] = stringNote
      chord ["string"] = chordPosition["cuerda"]
      chord ["origin"] = chordPosition["origin"]
      chord ["x"] = d3.select("#"+stringNote).attr("cx")
      chord ["y"] = d3.select("#"+stringNote).attr("cy")
      if(!d3.select("#"+stringNote12).empty()){
        chord ["x12"] = d3.select("#"+stringNote12).attr("cx")
        chord ["y12"] = d3.select("#"+stringNote12).attr("cy")
    } else {
        chord ["x12"] = -1;
        chord ["y12"] = -1;
    }
      //console.log("chord " + JSON.stringify(chord, null, 2));
      return chord
    },
    paintLines(coordenates,stringTranslateStart, stringTranslateSeparator,chordNumber){
      console.log("Empezamos a pintar el chord " + JSON.stringify(coordenates, null, 2));
  
      for (let key in coordenates) {
          if(key < coordenates.length-1){

              console.log("id "+coordenates[key]["id"]);

              let nextKey = parseInt(key)+1;
              let useZeroOrTwelveOrBoth = this.paintTwelveFrets(coordenates,key,nextKey);
              console.log("useZeroOrTwelveOrBoth ->" +JSON.stringify(useZeroOrTwelveOrBoth, null, 2));

              let x1 = this.calculateXOrigin(useZeroOrTwelveOrBoth["xOrigin"],useZeroOrTwelveOrBoth["xDestiny"]);
              let y1 = this.calculateYOrigin(coordenates[key]["y"],coordenates[key]["string"],stringTranslateStart, stringTranslateSeparator);
              let x2 = this.calculateXDestiny(useZeroOrTwelveOrBoth["xOrigin"],useZeroOrTwelveOrBoth["xDestiny"]);
              let y2 = this.calculateYDestiny(coordenates[nextKey]["y"],coordenates[nextKey]["string"],stringTranslateStart, stringTranslateSeparator);
              console.log("x1 "+x1 +" x2 "+x2 +" y1 "+y1 +" y2 "+y2);
              d3.select("#dashboard").append("line")
             .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2) 
              .attr('class', 'chord'+chordNumber )
              //.attr('stroke', 'red')
              //.attr('stroke-width','3')

          }

      }

    },
    paintTwelveFrets(coordenates, key, nextKey){
          var scale = {};
          
          const maxDistance = 210
          console.log("paintTwelveFrets x->"+(parseInt(coordenates[key]["x"])));
          console.log("paintTwelveFrets xKey->"+(parseInt(coordenates[nextKey]["x"])));
          let x = parseInt(coordenates[key]["x"]);
          let x12 = parseInt(coordenates[key]["x12"]);
          let nextX = parseInt(coordenates[nextKey]["x"]);
          let nextX12 = parseInt(coordenates[nextKey]["x12"]);
          let distancia = 0

        if(x > nextX){
          distancia =x - nextX ;
        }else if( x < nextX){
          distancia =  nextX - x ;
        }
      if(distancia > maxDistance){
        console.log("distancia > maxDistance asi q probamos con los x12");
          if (nextX12==-1) {
            console.log("nextX12==-1");
            if(x12 > nextX){
              distancia =x12 - nextX ;
            }else if( x12 < nextX){
              distancia = nextX - x12  ;
            }
            if(distancia <maxDistance){
              console.log("distancia < maxDistance con origen x12");
              // origin in Fret 12 and destiny 0 Fret
              scale ["xOrigin"] = x12;
              scale ["xDestiny"] = nextX;
            }

          }else{
            console.log("nextX12 no es -1");
            if(x > nextX12){
              distancia =x - nextX12 ;
            }else if( x < nextX12){
              distancia =nextX12 - x  ;
            }
            if(distancia <maxDistance){
              console.log("nextX12==-1 y distancia < maxDistance");
              // origin in Fret 0 and destiny 12 Fret
              scale ["xOrigin"] = x;
              scale ["xDestiny"] = nextX12;
            }else if(x12 !=-1){
              if(x12 > nextX12){
                distancia =x12 - nextX12 ;
              }else if( x12 < nextX12){
                distancia =nextX12 - x12  ;
              }
              if(distancia <maxDistance){
                console.log("nextX12==-1 y distancia < maxDistance");
                // origin in Fret 12 and destiny 12 Fret
                scale ["xOrigin"] = x12;
                scale ["xDestiny"] = nextX12;

            }
          }

        }

      } else{
        console.log("Normal situation");
        // normal situation 
        scale ["xOrigin"] = x;
        scale ["xDestiny"] = nextX;
      }
      console.log("Return scale" + +JSON.stringify(scale, null, 2));
      return scale;

    },
    calculateXOrigin(originX,destinyX){
      if(originX > destinyX) {
        return originX-10
      }else if(originX < destinyX) {
        return originX+10
      }else if(originX == destinyX) {
        return originX
      }
    },
    calculateXDestiny(originX,destinyX){
      if(originX > destinyX) {
        return destinyX+10
      }else if(originX < destinyX) {
       return destinyX-10
     }else if(originX == destinyX) {
       return destinyX
     }
     },
     calculateYOrigin(originY,string,stringTranslateStart, stringTranslateSeparator){
        let originBase = parseInt(originY)  + (stringTranslateStart+(string-1)*stringTranslateSeparator);
        return originBase +10;
    },
    calculateYDestiny(destinyY,string,stringTranslateStart, stringTranslateSeparator){
      let destinyBase = parseInt(destinyY)  + (stringTranslateStart+(string-1)*stringTranslateSeparator);
      return destinyBase -10;
  }  
  }