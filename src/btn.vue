<template>
  <div>
    <button @click="warn">warn</button>
    <button @click="info">info</button>
  </div>
</template>

<script>
  export default {
    beforeCreate(){
      console.log(this.$dataInfo)
    },
    methods:{
      warn(){
        this.$message({
          type:'warn',
          message:'warn'
        })
      },
      info(){
        this.$message({
          type:'info',
          message:'info'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>