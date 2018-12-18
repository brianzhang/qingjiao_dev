<template>
  <div :id="id_">
    <group :title="title">
      <radio :options="getOptionsList()" v-model="value" direction='rtl' ></radio>
    </group>

  </div>
</template>

<style></style>

<script>
  import { Group,Radio,XInput } from 'vux';
  export default{
    components: {
      Group,
      Radio,
      XInput
    },
    props:[
      'obj',
      'id'
    ],
    data () {
      return {
        title: this.obj.label,
        value: this.obj.inputValue,
        other: "",
        id_: this.id?this.id:"radio"
      }
    },
    mounted(){
      console.log(this.obj);
//      if(this.isDisabled){
//        let va = document.getElementById(this.id_).getElementsByTagName("input");
//        for(var i=0;i<va.length;i++){
//          va[i].setAttribute("disabled", "disabled");
//        }
//      }
    },
    computed : {
      isRequired:function(){
        return this.field_options&&this.field_options.required==true;
      },
      isDisabled:function(){
        return !(this.obj.permission&&this.obj.permission.indexOf('e')>=0);
      },
      field_options:function(){
        return this.obj.field_options;
      },
      getCheckedText(){
        var options = this.obj.field_options.options;
        for(var i=0;i<options.length;i++){
          if(this.obj.inputValue==options[i].val){
            return options[i].label;
          }
        }
      }
    },
    methods: {
      getOptionsList(){
        var options = this.field_options.options;
        var optionSize = options.length;
        for(var i=0;i<optionSize;i++){
          options[i]['key'] = options[i].val;
          options[i]['value'] = options[i].label;
        }
        return options;
      }

    }
  };
</script>
