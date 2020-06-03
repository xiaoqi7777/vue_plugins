import { Message } from './components/message/index.js';
import {Form,FormItem,Input} from './components/form'
import {Cascader} from './components/cascader'
import {DatePicker} from './components/datePicker'
export default {
  install(_Vue,options){
      if (_Vue) {
        _Vue.component('sgCatePicker', DatePicker)
        _Vue.component('sgCascader', Cascader)
        _Vue.component('sgFormItem',FormItem)
        _Vue.component('sgInput',Input)
        _Vue.component('sgForm',Form)
        _Vue.prototype.$message = Message
    }
  }
}

export {Message}
