<template>
  <x-textarea :title="title" :placeholder="placeholder_" v-model="value" :readonly="false" :max="max" inline-desc=""></x-textarea>
</template>

<style>
</style>

<script>
  import { XTextarea } from 'vux';
  export default{
    components: {
      XTextarea
    },
    props:[
      'obj'
    ],
    data () {
      return {
        title: this.obj.label+'：',
        placeholder_: this.obj.placeholder||"请输入",
        value: this.obj.inputValue
      }
    },
    computed : {
      isRequired:function(){
        return this.field_options&&this.field_options.required==true;
      },
      isDisabled:function(){
        return !(this.obj.permission&&this.obj.permission.indexOf('e')>=0);
      },
      max:function(){
        if(this.field_options.max_length){
          return parseInt(this.field_options.max_length);
        }else{
          return 99999;
        }
      },
      min:function(){
        if(this.field_options.min_length){
          return parseInt(this.field_options.min_length);
        }else{
          return 0;
        }
      },
      field_options:function(){
        return this.obj.field_options;
      }
    },
    methods: {

    }
  };
</script>
