<template>
  <div class="container">
    <div class="title">
      <div class="back-login">
        <el-icon>
          <Back />
        </el-icon>
        <el-link class="back-button" @click="handleBackLogin">返回登录</el-link>
      </div>
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>请填写注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form :model="formData" :rules="rules" ref="submitFormRef" label-position="top">
        <el-form-item label="请输入用户名或者邮箱" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" size="large"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" size="large"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname" placeholder="请输入昵称（可选）" size="large"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.phone" placeholder="请输入手机号（可选）" size="large"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" size="large" type="password"
            show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" placeholder="请再次输入密码" size="large" type="password"
            show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" size="large" @click="submitForm(submitFormRef)">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { register } from '../api/frontend'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const formData = ref({
  username: '',
  email: '',
  nickname: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: 0,
  userType: 1
})
const passwordValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
    return
  }
  if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
    return
  }
  if (formData.value.confirmPassword && submitFormRef.value) {
    submitFormRef.value.validateField('confirmPassword')
  }
  callback()
}

const confirmPasswordValidator = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入确认密码'))
    return
  }
  if (!formData.value.password) {
    callback(new Error('请先输入密码'))
    return
  }
  if (value !== formData.value.password) {
    callback(new Error('两次输入的密码不一致'))
    return
  }
  callback()
}
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
  password: [
    { validator: passwordValidator, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: confirmPasswordValidator, trigger: 'blur' }
  ]
})
// 表单提交
const submitFormRef = ref(null)
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (!valid) return
    const result = await register(formData.value)
    if (!result.data) {
      ElMessage.success('注册成功')
      router.push('/auth/login')
    }
    if (result.data?.code === 'BUSINESS_ERROR') {
      ElMessage.error(result.data?.msg)
    }
  })
}
// 返回登录
const handleBackLogin = () => {
  router.push('/auth/login')
}
</script>
<style scoped lang="scss">
.container {
  width: 384px;

  .flex-box {
    display: flex;
    align-items: center;
  }

  .title {
    .back-login {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      .back-button {
        margin-top: 2px;
        margin-left: 10px;
      }
    }

    .title-text {
      text-align: center;

      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }

      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }

  .form-container {
    margin-top: 30px;

    .btn {
      margin-top: 40px;
      width: 100%;
    }

    .footer {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
