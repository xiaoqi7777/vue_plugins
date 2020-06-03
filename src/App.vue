<template>
  <div class="div">
    message 組件
    <Btn />
    <br/>
    <br/>
    <br/>
    form 組件
    <Form />
    <br/>
    <br/>
    <br/>
    Cascader 組件
    <Cascader/>
    <br/>
    <br/>
    <br/>
    datePicker 組件
    <DatePicker/>
  </div>
</template>

<script>
import Btn from './btn.vue'
import Form from './form.vue'
import Cascader from './cascader.vue'
import DatePicker from './datePicker'
  export default {
    beforeCreate(){
      console.log(this.$dataInfo)
    },
    components:{
      Btn,
      Form,
      Cascader,
      DatePicker
    }
  }
</script>

<style lang="scss" scoped>
.div{
  color:red
}
</style>