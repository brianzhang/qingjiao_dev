<template>
  <div>
    <div>
        <div class="weui-cells__title">数据字典</div>
        <x-button :text="valueText?valueText:''" action-type='button' @click.native="showDialog()">
          <img src="../../assets/people_edit.png" alt="" style="float:right;padding-top: .05rem;padding-bottom: .05rem">
          <div style="float: left;font-size: 17px!important;">{{valueText?valueText:''}}</div>
        </x-button>
    </div>
  </div>
</template>
<style></style>
<script>
  import {
    Group,
    XButton
  } from 'vux';
  export default{
    components: {
      Group,
      XButton
    },
    props:[
      "obj",
      "label",
      "id",
      "value",
      "valueText",
      "returnUrlName",
      "data"
    ],
    data () {
      return {
        title: this.label,
        inputValue:this.value,
      }
      },
    computed : {

    },
    mounted(){

    },
    created(){
    },
    methods: {
      showDialog() {
        this.$router.push({
          name: 'dictionaryTarget',
          params: {
            props:this.$props
          }
        });
      },
    }
  };
</script>
