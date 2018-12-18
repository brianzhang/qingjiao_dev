<template>

    <div class="loadDiv" ref="loadDiv" v-show="shows">
      <span>{{text}}</span>
      <!--{{canvasShow()}}-->
    </div>
</template>
<script>
  export default {
    name: 'loading',
    props: [
      'shows',
      'id',
      'text'
    ],
    /*computed:{
      show(){
        return this.shows
      }
    },*/
    data() {
      return{
        show:this.shows
      }
    },
   /* watch:{
      shows(val){
        if(val){
          this.canvas.style.display='black'
        }else{
          this.canvas.style.display='none'
        }
      }
    },*/
    mounted() {
//      console.log(this.shows)
      this.$refs.loadDiv.appendChild(this.canvasShow())
      /*this.canvas=this.canvasShow();
      document.body.appendChild(this.canvas)*/
    },
    methods:{
      canvasShow: function() {
        var M = Math,
          PI = M.PI,
          TWOPI = PI * 2,
          HALFPI = PI / 2,
          canvas = document.createElement( 'canvas'),
//          canvas.id = "canvas_2d",
          ctx = canvas.getContext( '2d' ),
          width = canvas.width = 350,
          height = canvas.height = 350,
          cx = width / 2,
          cy = height / 2,
          count = 40,
          sizeBase = 0.1,
          sizeDiv = 5,
          tick = 0;
//          shows = this.shows;

        ctx.translate( cx, cy );
        (function loop() {
          requestAnimationFrame( loop );
          ctx.clearRect( -width / 2, -height / 2, width, height );
          ctx.fillStyle = '#fff';
          var angle = tick / 8,
            radius = -50 + M.sin( tick / 15 ) * 100,
            size;
          for( var i = 0; i < count; i++ ) {
            angle += PI / 64;
            radius += i / 30;
            size = sizeBase + i / sizeDiv;
            ctx.beginPath();
            ctx.arc( M.cos( angle ) * radius, M.sin( angle ) * radius, size, 0, TWOPI, false );
            ctx.fillStyle = 'hsl(200, 70%, 50%)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc( M.cos( angle ) * -radius, M.sin( angle ) * -radius, size, 0, TWOPI, false );
            ctx.fillStyle = 'hsl(320, 70%, 50%)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc( M.cos( angle + HALFPI ) * radius, M.sin( angle + HALFPI ) * radius, size, 0, TWOPI, false );
            ctx.fillStyle = 'hsl(60, 70%, 50%)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc( M.cos( angle + HALFPI ) * -radius, M.sin( angle + HALFPI ) * -radius, size, 0, TWOPI );
            ctx.fillStyle = 'hsl(0, 0%, 60%)';
            ctx.fill();
          }

          tick++;
        })();
       /* document.body.appendChild( canvas );*/
       /* if(this.shows) {
          canvas.style.display = 'block'
        } else {
          canvas.style.display = 'none'
        }*/
        return canvas;
      }

    },


  }
</script>
<style>
  canvas {
    display: block;
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 111;
  }
  .loadDiv span{
    width: 100%;
    text-align: center;
    height: 20px;
    display: inline-block;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    position: fixed;
    z-index: 222;
    font-size: 17px;
    color: #af0388;
    font-weight: bold;
  }
</style>
