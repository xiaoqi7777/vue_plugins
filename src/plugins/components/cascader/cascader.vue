<template>
  <!--  -->
  <div v-click-outside="close">
    <div class="top" @click="btn">
      {{rs}}
    </div>
    <div v-show="isShow">
      <CascaderItem :option='option' :level='0'  :value='value' @change="change" />
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import CascaderItem from './cascaderItem'
  export default {
  data(){
    return{
      isShow: true,
    }
  },
  props: {
    option: {
      type: Array,
      default: () => []
    },
    lazyload:{
      type:Function
    },
    value:{
      type: Array,
      default: () => []
    }
  },
  mounted(){

  },
  computed:{
    rs(){
      return this.value.map(item => item.label).join('/')
    }
  },
  methods:{
    handle(id,data){
      let cloneValue = cloneDeep(this.option)
      // 一层的情况
      // for(let i in cloneValue){
      //   if(cloneValue[i].id === id){
      //     cloneValue[i].children = data
      //   }
      // }
      let stack = [...cloneValue];
      let current=null
      let index = 0;
      while(current = stack[index++]){
        if(current.id === id){
          current.children = data
        }else{
          if(current.children){
            stack = stack.concat(current.children)
          }
        }
      }
      this.$emit('update:option',cloneValue)
    },
    change(item){
      let {id} = item[item.length-1]
       this.lazyload(id,(data)=>{
         this.handle(id,data)
       })
       this.$emit('input',item)
    },
    btn () {
      this.isShow = !this.isShow
    },
    close () {
      this.isShow = false
    },
  },
  directives: {
    // 此组件外点击取消
    clickOutside: {
      inserted (el, binding, vnode) {
        document.addEventListener('click', (e) => {
          let target = e.target
          if (target === el || el.contains(target)) {
            return false
          } else {
            binding.value()
          }
        })
      }
    }
  },
  components:{
    CascaderItem
  }  
}
</script>

<style lang="scss" scoped>

</style>