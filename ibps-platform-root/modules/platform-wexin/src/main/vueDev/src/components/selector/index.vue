<template>
<div>
  <group :title="title">
    <x-button :text="selectorText" action-type='button' @click.native="showDialog()" :disabled='false'>
      <img src="../../assets/people_edit.png" alt="" style="float:right;padding-top: .05rem;padding-bottom: .05rem">
      <div style="float: left;">{{selectorText}}</div>
    </x-button>
  </group>

</div>
</template>

<script>
import {
  Group,
  XButton
} from 'vux';
export default {
  components: {
    Group,
    XButton
  },
  props: [
    'obj',
    'id',
    'data',
    'index'
  ],
  data() {
    return {
      title: this.obj.label,
      value: this.obj.inputValue,
      id_: this.id ? this.id : "selector",
      selectorType: this.obj.field_options.selector_type
    }
  },
  mounted() {
    // console.log(this.obj);
  },
  computed: {
    isRequired: function() {
      return this.field_options && this.field_options.required == true;
    },
    isDisabled: function() {
      return !(this.obj.permission && this.obj.permission.indexOf('e') >= 0);
    },
    field_options: function() {
      return this.obj.field_options;
    },
    selectorText: function() {
      var text = '';
      try {
        if (!this.obj.inputValue) {
          text = "";
        } else {
          var arr = JSON.parse(this.obj.inputValue);
          for (var i = 0; i < arr.length; i++) {
            if (text.length > 0) {
              text += "，";
            }
            text += arr[i].name;
          }
        }
        return text;
      }
      catch (err) {
        text = this.obj.inputValue
      }

    },
    selectorValue: function() {
      var text = '';
      if (!this.obj.inputValue) {
        text = "";
      } else {
        var arr = JSON.parse(this.obj.inputValue);
        for (var i = 0; i < arr.length; i++) {
          if (text.length > 0) {
            text += "，";
          }
          text += arr[i].id;
        }
      }
      return text;
    }

  },
  methods: {
    showDialog() {
      var routeName = '';
      localStorage.setItem("waitingHandleTaskData", JSON.stringify(this.data));
      switch (this.selectorType) {
        case "org":
          routeName = 'selectorOrg';
          break;
        case "position":
          routeName = 'selectorOrg';
          break;
        case "role":
          routeName = 'selectorRole';
          break;
        case "user":
          routeName = 'selectorUser';
          break;
        default:

      }
      this.$router.push({
        name: routeName,
        params: {
          "isSingle": this.obj.field_options.is_single==true||this.obj.field_options.is_single=="true",
          "index": this.index,
          "selectorType": this.selectorType
        }
      });
    }
  }
};
</script>
