<template>
  <div class="div">
    <!-- message -->
    <!-- <Btn /> -->
    <!-- form -->
    <!-- <Form /> -->
    <!-- Cascader -->
    <Cascader/>
  </div>
</template>

<script>
import Btn from './btn.vue'
import Form from './form.vue'
import Cascader from './cascader.vue'
  export default {
    beforeCreate(){
      console.log(this.$dataInfo)
    },
    components:{
      Btn,
      Form,
      Cascader
    }
  }
</script>

<style lang="scss" scoped>
.div{
  color:red
}
</style>