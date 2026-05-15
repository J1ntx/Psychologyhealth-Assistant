<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button>
        <el-icon @click="handleCollapse">
          <Expand />
        </el-icon>
      </el-button>
      <p class="page-title">{{ route.meta.title }}</p>
    </div>
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar :src="avatarUrl" />
          <p class="user-name">用户</p>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>

      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useAdminStore } from '../stores/admin'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '../api/admin'
const router = useRouter()
const route = useRoute()
const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      // 退出登录逻辑
      await ElMessageBox.confirm('确认退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      // 确认退出登录
      await logout()
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      router.push('/auth/login')
      ElMessage({
        message: '退出成功',
        type: 'success'
      })
    } catch (error) {
      if (error !== 'cancel' && error !== 'close') {
        ElMessage({
          message: '退出失败，请稍后重试',
          type: 'error'
        })
      }
    }
  }
}
// 切换侧边栏折叠状态
const handleCollapse = () => {
  useAdminStore().toggleCollapse()
}
const avatarUrl = new URL('@/assets/头像.jpg', import.meta.url).href
</script>
<style scoped lang="scss">
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #e5e6eb;

  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-title {
    margin-left: 20px;
    margin-bottom: 5px;
    font-size: 26px;
    font-weight: bold;
    color: #1f2937;
  }
}
</style>
