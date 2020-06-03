<template>
  <div>
    选中总数据=>{{value}}
    <sg-cascader :option.sync="options" v-model="value" :lazyload="lazyload"></sg-cascader>
  </div>
</template>

<script>
import cityList from './data.json'
const fetchData = (pid) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(cityList.filter(item => item.pid == pid))
    }, 100)
  })
}

export default {
  async mounted () {
    this.options = await fetchData(0)
  },
  methods: {
    btn () {
      this.$Message.info({
        data: 1
      })
    },
    async lazyload (id, cb) {
      let rs = await fetchData(id)
      cb(rs)
    },
  },
  data () {
    return {
      options: [],
      value:[]
    }
  }

}
</script>

<style>

</style>