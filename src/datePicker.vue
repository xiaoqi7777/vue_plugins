<template>
  <div >
    <sgCatePicker v-model="value"/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>