<templete>
  <div>
    <a v-for="(item,index) in 30" :key="index" class="weui-cell_title">{{item}}</a>
  </div>
</templete>

<script>
// import { getScrollTop,getVisibleHeight,getScrollHeight} from './util';
export default{
  methods:{
    doCheck:function(force){
      var me = this;
      var options = me._oprions;
      // me.scrollTop = getScrollTop(me);
      // var downTrigger = getVisibleHeight(me)+me.scrollTop+5>=getScrollHeight(me);
      // if(downTrigger&&options.loadDownFn&&me.isData){
      //   options.domDown.loadingCall();
      //   directive.vm.$get(options.loadDownFn);
      // }
    }
  },
  data(){
    return {
      _oprions: ''
    }
  },
  mounted(){

  }
}

</script>

<style>

</style>
