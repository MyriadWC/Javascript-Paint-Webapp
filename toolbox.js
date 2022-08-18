//handling the showing of new tabs when the button is clicked
var changeTab = function(clickedTab){
    $('.tab_buttons').css('background','#a6a6a6');
    document.getElementById(clickedTab).style.background = '#d6d6d6';
    $('.tabs').css('visibility','hidden');
    var tab = clickedTab.slice(0,clickedTab.length-7);
    tab = document.getElementById(tab);
    tab.style.visibility = 'visible';
}
/*$('.tab_buttons').each(function(){
    $('#'+this.id).hover(function(){
      alert(gfhjk);
    });
});*/
$("#brush_tab_button").click(function(){
    changeTab(this.id);
});
$("#color_tab_button").click(function(){
    changeTab(this.id);
});
$("#shapes_tab_button").click(function(){
    changeTab(this.id);
});

var resize_dec = document.getElementById('resize_dec'),
           resize_inc = document.getElementById('resize_inc'),
           size_box = document.getElementById('size_box');

//the brush panel 
    //the brush resize tool
       //the preview
var preview = document.getElementById('resize_preview');
preview.width = 200;
preview.height = 200;
preview.style.background = 'white';
var prevCtx = preview.getContext('2d');

var showPreview = function(){
       prevCtx.clearRect(0, 0, preview.width, preview.height);
       prevCtx.fillStyle = currentColor;
       prevCtx.strokeStyle = currentColor;
       prevCtx.beginPath();
       prevCtx.arc(preview.width/2,preview.height/2,radius,0,Math.PI*2);
       prevCtx.stroke();
       prevCtx.fill();
}
prevCtx.clearRect(0, 0, preview.width, preview.height);
showPreview();
        
       resize_dec.addEventListener('click',function(){
              if(radius>1){
                  radius -= resize_interval;
              }
              size_box.value = radius;
              showPreview();

       });
       resize_inc.addEventListener('click',function(){
              if(radius<99){
                  radius += resize_interval;
              }
              size_box.value = radius;
              showPreview();
       });
       $('#size_box').change(function(){
           radius = parseInt($('#size_box').val());
           size_box.value = radius;
           showPreview();
       });
//the general panel
    //the color chooser
       var randColors      = Array(),
           grayscaleColors = Array('#000000','#696969','#808080','#a9a9a9','#c0c0c0','#d3d3d3','#dcdcdc','#f5f5f5','#ffffff');
           standardColors = Array('red','orange','yellow','green','blue','indigo','violet'),
           recentColors = Array();
       
       var renderColors = function(toAppendTo, arrayName){
           for(var i = 0;i<arrayName.length;i++){
               var nd = document.createElement('div');
               nd.style.background = arrayName[i];
               nd.style.display = 'inline-block';
               nd.style.width="15px";
               nd.style.height='15px';
               nd.id = arrayName+i;
               document.getElementById(toAppendTo).appendChild(nd);
               nd.addEventListener('click',function(e){
                   color = e.target;
                   currentColor = color.style.background;
                   //so the preview will be the correct color
                   showPreview();
                   document.getElementById('current_color_square').style.background = currentColor;
                   //do this here so it updates when user clicks
                   //use currentColor array so doesn't append all values in array each time, while still being able to use the same
                   //function. Just means they'll all have the same id.
                   var checkForExistence = recentColors.indexOf(currentColor);
                   if(checkForExistence == -1){
                       recentColors.push(currentColor);
                       renderColors('recent_color_display', Array(currentColor));
                       if(recentColors.length>13){
                           //will remove first value in array
                           recentColors.splice(0,1);
                           document.getElementById('recent_color_display').removeChild(
                               document.getElementById('recent_color_display').children[0]
                           );
                       }
                   }
               });
           }
       }

       var createRandColors = function(){
           //creates an array of random colors
           var counter = 0;
           var r = 0;
           var g = 0;
           var b = 0;
           while(counter<104){
               var r = Math.floor(Math.random()*255+1);
               var g = Math.floor(Math.random()*255+1);
               var b = Math.floor(Math.random()*255+1);
               counter++;
               var rgb = 'rgb('+r+','+g+','+b+')';
               if(randColors.indexOf(rgb) == -1){
                  randColors.push(rgb);
               }
           }
       randColors.sort();
       }
       
       createRandColors();
       renderColors('random_colors', randColors);
       renderColors('standard_colors', standardColors);
       renderColors('grayscale_colors', grayscaleColors);

document.getElementById('toolbar').addEventListener('mouseup',function(){
   clicking = false;
    ctx.beginPath();
});