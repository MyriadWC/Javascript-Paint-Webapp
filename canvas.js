var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        canvasWidth = 500,
        canvasHeight = 500;

    var coords = document.getElementById('co-ordinates'),
        canvas_div = document.getElementById('canvas_div'),
        arrow_right = document.getElementById('arrow_right'),
        radius = 5,
        clicking = false,
        mode = 'paint',
        clickingWindow = false,
        resize_interval = 1,
        currentColor = 'black',
        mD = false,
        objClicked;

var Canvas = (function () {

    return {
        setWidthHeight: function (){
            canvas.height = canvasHeight;
            canvas.width = canvasWidth;
            document.getElementById('cw_tb').value = canvasWidth;
            document.getElementById('ch_tb').value = canvasHeight;
        },
        positionArrows: function(){
            arrow_right.style.left = canvasWidth+'px';
            arrow_right.style.top = canvasHeight/2-10+'px'; 
            arrow_down.style.left = canvasWidth/2-10+'px';
            arrow_down.style.top = canvasHeight+'px';
        },
        putPoint: function(e){
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
        },
        resizeCanvasRight: function(e){
            if(mD == true  && canvasWidth>1){
                var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
                canvasWidth = e.clientX - 10;
                canvas.width = canvasWidth;
                Canvas.positionArrows();
                //arrow_right.style.left = canvasWidth+5+'px';
                ctx.putImageData(save,0,0);
                cw_tb.value = canvasWidth;
            }
        },
        resizeCanvasDown: function(e){
            if(mD == true && canvasHeight>1){
                var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
                canvasHeight = e.clientY - 10;
                canvas.height = canvasHeight;
                this.positionArrows();
                ctx.putImageData(save,0,0);
                ch_tb.value = canvasHeight;
            }
        },
        clickTrue: function (event) {
            clicking = true;
            this.putPoint(event);
        },
        clickFalse: function(){
            clicking = false;
            ctx.beginPath();
        },
        events: function () {
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
        },
        init: function () {
            this.setWidthHeight();
            this.positionArrows();
            this.events();
        },
    }
})();
Canvas.init();