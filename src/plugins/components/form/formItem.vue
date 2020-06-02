<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div v-if="validateStatus == 'error'" :class="$style.warn">
      {{validateContent}}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.prototype.$bus = new Vue()
export default {
  props: {
    label: String,
    prop: String
  },
  data () {
    return {
      /**
        *  当前表单是否通过校验
        */
      validateStatus: '',
      /**
       *  当前校验后的信息
       */
      validateContent: '',
      /**
       * 存放所有校验的信息
       * field 当前的prop项
       * type 校验的类型
       * isError 是否显示错误
       * content 错误提示
       */
      valiStatus: [],
      /**
       * 存放当前输入的内容
       */
      getinputData: '',
      /**
       * 当前是触发的事件
       */
      trigger: null
    }
  },
  methods:{
    // 添加校验的错误提醒
    handleAddValidate(type,content){
      // 处理多次加入同一个
      for (let [i, k] of this.valiStatus.entries()) {
        if (k && (k.type === type)) {
          this.valiStatus[i].isError = true
          return
        }
      }
      this.valiStatus.push({
        field: this.prop,
        type,
        content,
        isError: true
      })
    },
    // 删除错误提醒
    handleDelValidate(type){
      if(this.valiStatus.length<1) return;
      for(let [i,k] of this.valiStatus.entries()){
        if(k.type === type){
          this.valiStatus&&this.valiStatus.splice(i,1)
        }
      }
    },
    // 显示错误状态
    handleStatus(){
      this.valiStatus.forEach(item => {
        // 处理有提示的情况
        if (item.isError) {
          this.validateStatus = 'error'
          this.validateContent = item.content
        }
      })
      let isShow = this.valiStatus.some(item=> item.isError)
      if (!isShow) {
        this.validateStatus = false
      }
    },
    // validate
    validate(value){
      let rules = this.rules
      rules.forEach(rule=>{
        // 默认配置目前只写required 如果必填 并且没有值，那就出错
        if(rule.required){
          if(!value){
            this.handleAddValidate('required', rule.message)
          }else{
            this.handleDelValidate('required')
          }
        }
        // 如果是自定义配置 也就是传入 validator
        if(rule.validator){
          let { validator } = rule
          validator('rule',value,(data)=>{
            if(data){
              this.handleAddValidate('validator', data.toString())
            }else{
              this.handleDelValidate('validator')
            }
          })
        }
      })
      // 更新错误
      this.handleStatus()
    },
    getTriggerMethod(){
      this.trigger = this.rules && this.rules.map(item => {
        if(item.trigger === 'change'){
          item.trigger = 'input'
        }
        return item.trigger
      });
    },
    bindTrigger(){
      this.trigger && this.trigger.forEach(item => {
        this.$bus.$on(item,(data)=>{
          if(this._uid === data.id){
            this.getinputData ={[this.prop]:data.value} 
            // 校验
            this.validate(data.value)
          }
        })
      })
    }
  },
  inject: ['form'], // 注入父级的实例
  mounted () {
    // 获取所有的rules
    this.rules = this.form.rules[this.prop]
    // 获取触发的方式
    this.getTriggerMethod()
    // // 绑定事件
    this.bindTrigger()
  }
}
</script>

<style lang="scss" module>
.warn{
  color: red;
}
</style>