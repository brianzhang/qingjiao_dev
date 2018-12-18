<template>
  <div :id="id_">
    <selector :title="title" :options="getOptionsList()" v-model="value" :readonly="false" ></selector>
  </div>
</template>
<style></style>

<script>
  import { Group,Selector } from 'vux';
  export default{
    components: {
      Group,
      Selector
    },
    props:[
      'obj',
      'id'
    ],
    data () {
      return {
        title: this.obj.label,
        value: this.obj.inputValue,
        type: "text",
        id_: this.id?this.id:new Date()
      }
    },
    mounted(){

    },
    computed : {
      isRequired:function(){
        return this.field_options&&this.field_options.required==true;
      },
      isDisabled:function(){
        //console.log(this.obj.permission);
        return !(this.obj.permission&&this.obj.permission.indexOf('e')>=0);
      },
      field_options:function(){
        return this.obj.field_options;
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
