<template>
  <div>
    <div v-if="!isDisabled">
      <datetime :title="title" v-model="inputValue" confirm-text="完成" cancel-text="取消" :format="formatString"></datetime>
    </div>
    <div v-if="isDisabled">
      <x-input :title="title" v-model="inputValue" :disabled="true"  text-align='right'></x-input>
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
      "obj",
      "label",
      "value",
      "format",
      "required",
      "isDisabled"
    ],
    data () {
      return {
        title: this.label||'日期',
        inputValue:this.value,
        dateFormat:''
      }
    },
    computed : {
      max:function(){
        return '';
      },
      min:function(){
        return '';
      },
      formatString:function(){
        if("YYYY-MM-DD".length>=this.format.length){
          this.dateFormat=this.format.toUpperCase();
        }else{
          this.dateFormat=this.format.replace(/yyyy-MM-dd/,"YYYY-MM-DD");
        }
      }
    },
    mounted(){
      
    },
    created(){
      this.formatDate();
    },
    methods: {
      formatDate:function(){
        if (this.value) {
          let v = this.value;
          this.inputValue = v.substring(0,this.format.length);
        }
      }
    }
  };
</script>
