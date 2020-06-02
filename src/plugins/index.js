import { Message } from './components/message/index.js';
import {Form,FormItem,Input} from './components/form'
import {Cascader} from './components/cascader'
export default {
  install(_Vue,options){
      // _Vue.component('sg-catePicker', DatePicker)
      _Vue.component('sg-cascader', Cascader)
      _Vue.component('sgFormItem',FormItem)
      _Vue.component('sgInput',Input)
      _Vue.component('sgForm',Form)
      if (!_Vue) {
        _Vue.prototype.$Message = Message
    }
  }
}

export {Message}
