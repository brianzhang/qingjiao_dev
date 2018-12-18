<template>
  <div>
    <div v-if="!isDisabled">
      <datetime :title="title" v-model="value" confirm-text="完成" cancel-text="取消" :format="format"></datetime>
    </div>
    <div v-if="isDisabled">
      <x-input :title="title" v-model="value" :disabled="true"  text-align='right'></x-input>
    </div>
  </div>
</template>

<style></style>

<script>
  import { Datetime,XInput } from 'vux';
  export default{
    components: {
      Datetime,
      XInput
    },
    props:[
      'obj'
    ],
    data () {
      return {
        title: this.obj.label||'日期',
        value: this.obj.inputValue||"2017-06-06",
        format: this.field_options||"YYYY-MM-DD"
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
        return '';
      },
      min:function(){
        return '';
      },
      field_options:function(){
        return this.obj.field_options;
      }
    },
    mounted(){
      console.log(this.obj);
    },
    methods: {

    }
  };
</script>
