<template>
  <form onsubmit="return false">
    <slot></slot>
  </form>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  methods: {
    // 给用户调用的
    validator (cb) {
      let errorObj = {}
      let getinputData = this.$children.map(child=>child.getinputData).reduce((a,b)=>{
        for(let [i,k] of Object.entries(b)){
          a[i]=k
        }
        return a
      },{})
      // 获取检验是否成功
      let flag = this.$children.every(child => child.validateStatus !== 'error')

      // 获取formItem校验信息
      let errorData = this.$children.map(children => children.valiStatus).flat()
      for (let i = 0; i < errorData.length; i++) {
        let data = errorData[i]
        let name = data['field']
        errorObj[name] = data
      }
      if(!flag){
       cb(flag, errorObj)
      }else{
       cb(flag, getinputData)
      }
    }
  },
  provide () {
    return {
      form: this
    }
  }

}
</script>
