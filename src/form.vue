<template>
  <div>
    form
    <sgForm :model="form" :rules="rules" ref="form">
      <sgFormItem label='测试' prop='username'>
        <sgInput type="text" value=""></sgInput>
      </sgFormItem>
      <sgFormItem label='test' prop='password'>
        <sgInput type="text" value=""></sgInput>
      </sgFormItem>
      <button @click="validate">确认提交</button>
    </sgForm>
  </div>
</template>

<script>
  export default {
    data () {
      const a = (rule, value, cb) => {
        // console.log('value', value)
        if (value.length === 2) {
          cb('长度不能为二')
        } else {
          cb()
        }
      }
      const b = (rule, value, cb) => {
        console.log('value', value)
        if (value.length != 2) {
          cb('长度只能是2')
        } else {
          cb()
        }
      }
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { validator: b, trigger: 'change' }
          ],
          password: [
            { validator: a, message: '请输入密码', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
    validate () {
      this.$refs.form.validator((valid, data) => {
        if (valid) {
          console.log('yes', data)
        } else {
          console.log('no', data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>