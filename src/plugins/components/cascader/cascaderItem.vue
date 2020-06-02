<template>
  <div :class="$style.layout">
    <div :class="$style.children">
      <div class="parent">
        <div :class="$style.left" v-for='(item,index) in option' :key="'cascadetItem'+index">
          <div @click="click(item)">
            {{item.label}}
          </div>
        </div>
      </div>
    </div>

    <div :class="$style.right" v-if="lists&&lists.length">
      <Child :option='lists' :value='value' @change='change' :level='level+1'/>
    </div>
 
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
  export default {
    name:'Child',
    props:{
      option: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    computed:{
      lists(){
        if (this.value[this.level] && this.value[this.level].id) {
          let o = this.option.find(item => item.id === this.value[this.level].id)
          console.log(o)
          return o.children
        }
      }
    },
    mounted(){
      
    },
    methods:{
      change (item) {
        this.$emit('change', item)
      },
      click(item){
        console.log('====')
        let newValue = cloneDeep(this.value)
        newValue[this.level] = item
        newValue.splice(this.level + 1)
        this.$emit('change',newValue)
      }
    },
    data(){
      return{
        
      }
    }
  }
</script>

<style lang="scss" module>
.layout{
  display: flex;
  .children{
    width: 200px;
  }
}

</style>