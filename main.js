var canvas = document.getElementById('canvas');
       var ctx = canvas.getContext('2d');

       canvasWidth = 500;
       canvasHeight = 500;
       var setWidthHeight = function(){
       canvas.height = canvasHeight;
       canvas.width = canvasWidth;
       }
       var cw_tb = document.getElementById('cw_tb');
       var ch_tb = document.getElementById('ch_tb');
       ch_tb.value = canvasHeight;
       cw_tb.value = canvasWidth;
       setWidthHeight();
       canvas.style.background = 'white';

       var coords = document.getElementById('co-ordinates');
       var canvas_div = document.getElementById('canvas_div');
       var arrow_right = document.getElementById('arrow_right');

       var radius = 5;
       var clicking = false,
       mode = 'paint';
       clickingWindow = false;
       resize_interval = 1;
       var currentColor = 'black';
       
       var recordOffset = function(e){
           coords.innerHTML = 'X: '+e.clientX+' | Y: '+e.clientY;
           //starting a new path if the brush leaves the canvas
          if(e.clientX>=canvas.width){
              ctx.beginPath();
               if(clickingWindow == false){
                   clicking = false;
               }
           }
           if(e.clientY>=canvas.height || 0>e.offsetY){
              ctx.beginPath();
              if(clickingWindow == false){
                   clicking = false;
               }
           }
       }

       var putPoint = function(e){
           
           if(clicking == true){
              ctx.lineTo(e.offsetX,e.offsetY);
              ctx.stroke();
              ctx.lineWidth = radius*2;
              ctx.beginPath();
              ctx.fillStyle = currentColor;
              ctx.strokeStyle = currentColor;
              ctx.arc(e.clientX,e.clientY,radius,0,Math.PI*2);
              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(e.clientX,e.clientY);
           }
       }

       var clickTrue = function(){
           clicking = true;
           putPoint(event);
       }

       var clickFalse = function(){
           clicking = false;
           ctx.beginPath();
       }
       //function that measures the position on the entire screen's event listener 
       window.addEventListener('mousemove',recordOffset);
       window.addEventListener('mousedown',function(){
           clickingWindow = true;
       });
       window.addEventListener('mouseup',function(){
           clickingWindow = false;
       });

       canvas.addEventListener('mousedown',clickTrue);
       canvas.addEventListener('mouseup',clickFalse);
       canvas.addEventListener('mousemove',putPoint);
       
       canvas.addEventListener('mouseenter',function(){
           if(clickingWindow == true){
               clicking = true;
           }
       });