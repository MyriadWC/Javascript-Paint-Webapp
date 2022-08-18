var positionArrows = function(){
          arrow_right.style.left = canvasWidth+'px';
          arrow_right.style.top = canvasHeight/2-10+'px';
          
          arrow_down.style.left = canvasWidth/2-10+'px';
          arrow_down.style.top = canvasHeight+'px';
       }
       positionArrows();

//the toolbar
var toolbarHandle = document.getElementById('move_toolbar'),
    toolbar = document.getElementById('toolbar'),
    mD = false,
    objClicked;
    
var moveToolbar = function(e){
    if(mD == true){
        toolbar.style.top = (e.clientY-10)+'px';
        toolbar.style.left = (e.clientX-10)+'px';
    }
}
var resizeCanvasRight = function(e){
    if(mD == true  && canvasWidth>1){
        var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
        canvasWidth = e.clientX - 10;
        canvas.width = canvasWidth;
        positionArrows();
        //arrow_right.style.left = canvasWidth+5+'px';
        ctx.putImageData(save,0,0);
        cw_tb.value = canvasWidth;
    }
}
var resizeCanvasDown = function(e){
    if(mD == true && canvasHeight>1){
        var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
        canvasHeight = e.clientY - 10;
        canvas.height = canvasHeight;
        positionArrows();
        ctx.putImageData(save,0,0);
        ch_tb.value = canvasHeight;
    }
}

toolbarHandle.addEventListener('mousedown',function(){
    mD = true;
    objClicked = toolbarHandle.id;
});
arrow_right.addEventListener('mousedown',function(){
    mD = true;
    objClicked = arrow_right.id;
});
arrow_down.addEventListener('mousedown',function(){
    mD = true;
    objClicked = arrow_down.id;
});
window.addEventListener('mouseup',function(){
    mD = false;
});
window.addEventListener('mousemove',function(){
    if(objClicked == arrow_right.id){
        resizeCanvasRight(event);
    }
    else if(objClicked == toolbarHandle.id){
        moveToolbar(event);
    }
    else if(objClicked == arrow_down.id){
        resizeCanvasDown(event);
    }
});

//changing the width of the canvas with the textboxes using jquery for ease
$('#cw_tb').change(function(){
           var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
           if(this.value>0){
               canvasWidth = this.value;
           }
           else{
               canvasWidth = 1;
               this.value = 1;
           }
    
           canvas.width = canvasWidth;
           positionArrows();
           ctx.putImageData(save,0,0);
});
$('#ch_tb').change(function(){
           var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
            if(this.value>0){
               canvasHeight = this.value;
            }
            else{
               canvasHeight = 1;
               this.value = 1;
            }
    
           canvas.height = canvasHeight;
           positionArrows();
           ctx.putImageData(save,0,0);
});