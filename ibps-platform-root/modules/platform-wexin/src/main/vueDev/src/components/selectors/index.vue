<template>
<div>
  <group :title="title">
    <x-button :text="valueText?valueText:'选择器'" action-type='button' @click.native="showDialog()" >
      <img src="../../assets/people_edit.png" alt="" style="float:right;padding-top: .05rem;padding-bottom: .05rem">
      <div style="float: left;font-size: 17px !important;">{{valueText?valueText:''}}</div>
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
    'id',
    'type',
    'form',
    'value',
    'title',
    'isDisabled',
    'isSingle',
    'valueText',
    'returnUrlName',
    'other'
  ],
  data() {
    return {
    }
  },
  mounted() {
    // console.log(this.$props);
  },
  computed: {
  },
  methods: {
    showDialog() {
      var routeName = '';
      localStorage.setItem("formData", JSON.stringify(this.form));
      switch (this.type) {
        case "org":
          routeName = 'orgSelector';
          break;
        case "position":
          routeName = 'orgSelector';
          break;
        case "role":
          routeName = 'roleSelector';
          break;
        case "user":
          routeName = 'userSelector';
          break;
        default:
      }
      this.$router.push({
        name: routeName,
        params: {
          props:this.$props
        }
      });
    }
  }
};
</script>
