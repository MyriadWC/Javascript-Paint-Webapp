var Toolbox = (function () {
    var resize_dec  = document.getElementById('resize_dec'),
        resize_inc  = document.getElementById('resize_inc'),
        size_box    = document.getElementById('size_box');

    var preview = document.getElementById('resize_preview');
        preview.width = 200;
        preview.height = 200;
        preview.style.background = 'white';

    var randColors      = [],
        grayscaleColors = ['#000000','#696969','#808080','#a9a9a9','#c0c0c0','#d3d3d3','#dcdcdc','#f5f5f5','#ffffff'],
        standardColors  = ['red','orange','yellow','green','blue','indigo','violet'],
        recentColors    = [];

    var toolbarHandle = document.getElementById('move_toolbar'),
        toolbar = document.getElementById('toolbar');

    return {
        prevCtx: preview.getContext('2d'),

        changeTab: function(clickedTab){
            $('.tab_buttons').removeClass('current_button');
            $('#' + clickedTab).addClass('current_button');
            $('.tabs').css('visibility','hidden');
            var tab = clickedTab.slice(0,clickedTab.length-7);
            tab = document.getElementById(tab);
            tab.style.visibility = 'visible';
        },
        showPreview: function () {
            this.prevCtx.clearRect(0, 0, preview.width, preview.height);
            this.prevCtx.fillStyle = currentColor;
            this.prevCtx.strokeStyle = currentColor;
            this.prevCtx.beginPath();
            this.prevCtx.arc(preview.width/2,preview.height/2,radius,0,Math.PI*2);
            this.prevCtx.stroke();
            this.prevCtx.fill();
        },
        updateRecentColors: function () {
            var checkForExistence = recentColors.indexOf(currentColor);
            if(checkForExistence == -1){
                recentColors.push(currentColor);
                this.renderColors('recent_color_display', Array(currentColor));
                if(recentColors.length>13){
                    //will remove first value in array
                    recentColors.splice(0,1);
                    document.getElementById('recent_color_display').removeChild(
                        document.getElementById('recent_color_display').children[0]
                    );
                }
            }
        },
        renderColors: function (toAppendTo, arrayName){
            for(var i = 0;i<arrayName.length;i++){
                var nd = document.createElement('div');
                nd.style.background = arrayName[i];
                nd.style.display = 'inline-block';
                nd.style.width="15px";
                nd.style.height='15px';
                nd.id = arrayName+i;
                var that = this;
                document.getElementById(toAppendTo).appendChild(nd);
                nd.addEventListener('click',function(e){
                    color = e.target;
                    currentColor = color.style.background;
                    //so the preview will be the correct color
                    Toolbox.showPreview();
                    document.getElementById('current_color_square').style.background = currentColor;
                    that.updateRecentColors();
                });
            }
        },

        createRandColors: function(){
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
        },
        moveToolbar: function(e){
            if(mD == true){
                toolbar.style.top = (e.clientY-10)+'px';
                toolbar.style.left = (e.clientX-10)+'px';
            }
        },
        events: function () {
            var that = this;
            $("#brush_tab_button").click(function(){
                that.changeTab(this.id);
            });
            $("#color_tab_button").click(function(){
                that.changeTab(this.id);
            });
            $("#shapes_tab_button").click(function(){
                that.changeTab(this.id);
            });
            resize_dec.addEventListener('click',function(){
                if(radius>1){
                    radius -= resize_interval;
                }
                size_box.value = radius;
                that.showPreview();
            });
            resize_inc.addEventListener('click',function(){
                if(radius<99){
                        radius += resize_interval;
                    }
                    size_box.value = radius;
                    that.showPreview();
            });
            $('#size_box').change(function(){
                radius = parseInt($('#size_box').val());
                size_box.value = radius;
                that.showPreview();
            });
            $('#generate_more_colors').click(function (e) {
              e.preventDefault();
              $('#random_colors').html('Random: <br/>');
              randColors = [];
              that.createRandColors();
              that.renderColors('random_colors', randColors);
            });
            $('#hex_box').change(function(){
                var color = $('#hex_box').val();
                currentColor = '#' + color;
                Toolbox.showPreview();
                document.getElementById('current_color_square').style.background = currentColor;
                that.updateRecentColors();
            });
            window.addEventListener('mousemove',function(event){
                if(objClicked == arrow_right.id){
                    Canvas.resizeCanvasRight(event);
                }
                else if(objClicked == toolbarHandle.id){
                    that.moveToolbar(event);
                }
                else if(objClicked == arrow_down.id){
                    Canvas.resizeCanvasDown(event);
                }
            });
            document.getElementById('toolbar').addEventListener('mouseup',function(){
                clicking = false;
                    ctx.beginPath();
            });

            toolbarHandle.addEventListener('mousedown',function(){
                mD = true;
                objClicked = toolbarHandle.id;
            });
        },
        init: function () {
            this.showPreview();
            this.createRandColors();
            this.renderColors('random_colors', randColors);
            this.renderColors('standard_colors', standardColors);
            this.renderColors('grayscale_colors', grayscaleColors);
            this.events();
        }
    }
})();
Toolbox.init();