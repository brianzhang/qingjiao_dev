<template>
  <div>
    <div :id="id_">
      <checklist :title="title" label-position="right" :check-disabled=true :options="getOptionsList()" v-model="value" :max="max" :min="min" ></checklist>
    </div>
  </div>
</template>

<style></style>

<script>
  import { Group,Selector,Checklist } from 'vux';
  export default{
    components: {
      Group,
      Selector,
      Checklist
    },
    props:[
      'obj',
      'id'
    ],
    data () {
      return {
        title: this.obj.label,
        value: this.obj.inputValue.split(","),
        other: "",
        id_: this.id?this.id:"checklist"
      }
    },
    mounted(){
      /*if(this.isDisabled){
        let va = document.getElementById(this.id_).getElementsByTagName("input");
        for(var i=0;i<va.length;i++){
          va[i].setAttribute("disabled", "disabled");
        }
      }*/
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
        var options = this.field_options.options;
        for(var i=0;i<options.length;i++){
          if(this.obj.inputValue==options[i].val){
            return options[i].label;
          }
        }
      },
      checkedList:function(){
        return this.value?this.value.split(","):'';
      },
      max:function(){
        if(this.field_options.max_mum){
          return parseInt(this.field_options.max_mum);
        }else{
          return 99999;
        }
      },
      min:function(){
        if(this.field_options.max_mum){
          return parseInt(this.field_options.min_mum);
        }else{
          return 0;
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
