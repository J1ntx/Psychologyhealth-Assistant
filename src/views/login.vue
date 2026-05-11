<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon>
          <Back />
        </el-icon>
        <el-link class="back-button" @click="handleBack">返回首页</el-link>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form :model="formData" ref="ruleFormRef" :rules="rules" label-position="top">
        <el-form-item prop="username" label="用户名或邮箱">
          <el-input size="large" v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input size="large" v-model="formData.password" placeholder="请输入密码" type="password"
            show-password></el-input>
        </el-form-item>
        <el-button class="btn" type="primary" size="large" @click="submitForm">登录账户</el-button>
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>

    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const ruleFormRef = ref(null)
const formData = ref({
  username: '',
  password: ''
})
const validatorUsername = (rule, value, callback) => {
  if (value.length < 5) {
    callback(new Error('用户名的长度必须大于等于5位'))
  } else {
    callback()
  }
}
const validatorPassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码的长度必须大于等于6位'))
  } else {
    callback()
  }
}
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { required: true, message: '用户名的长度必须大于等于5位', trigger: 'blur', validator: validatorUsername }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { required: true, message: '密码的长度必须大于等于6位', trigger: 'blur', validator: validatorPassword }
  ]
})
const submitForm = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      login(formData.value).then(data => {
        if (!data.token) {
          ElMessage({
            type: 'error',
            message: `${data.data.message}`
          })
          ruleFormRef.value.clearValidate()
          return
        }
        // 登录成功，将token存储到localStorage中
        localStorage.setItem('token', data.token)
        // 登录成功，将userInfo存储到localStorage中
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
        // 根据用户角色 决定跳转的路径
        if (data.userInfo.userType === 2) {
          router.push('/back/dashboard')
        } else {
          router.push('/')
        }
      })
    } else {
      ElMessage({
        type: 'error',
        message: '表单验证失败'
      })
    }
  })
}
// 返回首页
const handleBack = () => {
  router.push('/')
}
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  padding: 40px 36px 34px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    0 28px 60px rgba(103, 129, 152, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);

  .title {
    .back-home {
      display: flex;
      align-items: center;
      margin-bottom: 48px;
      color: #4c6274;

      .back-button {
        margin-top: 2px;
        margin-left: 10px;
        font-weight: 600;
        color: #4c6274;
        transition: color 0.25s ease, transform 0.25s ease;
      }

      .back-button:hover {
        color: #2f6fd6;
        transform: translateX(2px);
      }

    }

    .title-text {
      text-align: center;

      h2 {
        font-size: 36px;
        margin-bottom: 10px;
        color: #162535;
      }

      p {
        font-size: 20px;
        color: #6f7f92;
      }
    }
  }

  .form-container {
    margin-top: 96px;

    .btn {
      margin-top: 25px;
      width: 100%;
      height: 52px;
      border: none;
      border-radius: 16px;
      background: linear-gradient(135deg, #6ea8ff 0%, #5386eb 100%);
      box-shadow: 0 16px 30px rgba(83, 134, 235, 0.24);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.04em;
      transition:
        transform 0.28s ease,
        box-shadow 0.28s ease,
        filter 0.28s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 22px 40px rgba(83, 134, 235, 0.32);
        filter: brightness(1.03);
      }

      &:active {
        transform: translateY(-1px);
      }
    }

    .footer {
      padding: 30px;
      text-align: center;
      color: #344256;

      a {
        margin-left: 6px;
        color: #4f73dd;
        font-weight: 600;
        transition: color 0.25s ease;
      }

      a:hover {
        color: #2f59d1;
      }
    }
  }
}

:deep(.el-form-item__label) {
  color: #4a5a6e;
  font-weight: 600;
}

:deep(.el-input__wrapper) {
  border-radius: 14px;
  background: rgba(247, 250, 255, 0.82);
  box-shadow: inset 0 0 0 1px rgba(183, 198, 220, 0.7);
  transition: box-shadow 0.28s ease, background-color 0.28s ease, transform 0.28s ease;
}

:deep(.el-input__wrapper:hover) {
  background: rgba(250, 252, 255, 0.94);
  box-shadow: inset 0 0 0 1px rgba(126, 163, 226, 0.95);
}

:deep(.el-input__wrapper.is-focus) {
  background: rgba(255, 255, 255, 0.98);
  box-shadow:
    inset 0 0 0 1px rgba(97, 145, 232, 1),
    0 0 0 4px rgba(111, 164, 255, 0.12);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .container {
    width: min(100%, 384px);
    padding: 28px 22px 24px;

    .title {
      .title-text {
        h2 {
          font-size: 30px;
        }

        p {
          font-size: 18px;
        }
      }
    }

    .form-container {
      margin-top: 56px;
    }
  }
}
</style>
