var BottomBar = (function () {
    return {
        recordOffset: function (e) {
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
        },
        events: function () {
            window.addEventListener('mousemove', this.recordOffset);

            window.addEventListener('mousedown',function(){
                clickingWindow = true;
            });

            window.addEventListener('mouseup',function(){
                clickingWindow = false;
            });

            canvas.addEventListener('mousedown', function () { Canvas.clickTrue(event) });
            canvas.addEventListener('mouseup', function () {Canvas.clickFalse(event) });
            canvas.addEventListener('mousemove', Canvas.putPoint);
             
            canvas.addEventListener('mouseenter',function(){
                if(clickingWindow == true){
                    clicking = true;
                }
            });

            $('#clear_canvas').click(function (e) {
                e.preventDefault();
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            });

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
                Canvas.positionArrows();
                ctx.putImageData(save,0,0);
            });

            $('#ch_tb').change(function () {
                var save = ctx.getImageData(0,0,canvasWidth,canvasHeight);
                if(this.value>0){
                    canvasHeight = this.value;
                }
                else {
                    canvasHeight = 1;
                    this.value = 1;
                }

                canvas.height = canvasHeight;
                Canvas.positionArrows();
                ctx.putImageData(save,0,0);
            });
        },
        init: function () {
            this.events();
        }
    }
})();

BottomBar.init();