<template>
  <div>
    <PageHead title="咨询记录"></PageHead>
    <el-table :data="tableData" style="width:100%">
      <el-table-column label="会话ID" width="100">
        <template #default="{ row }">
          <el-avatar>{{ row.userNickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="情绪日志">
        <template #default="{ row }">
          <div class="session-title">
            {{ row.sesstionTitle }}
          </div>
          <div class="session-preview">
            {{ row.lastMessageContent }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="消息数" prop="messageCount" width="100"></el-table-column>
      <el-table-column label="时间" prop="lastMessageTime" width="100"></el-table-column>
      <el-table-column label="宽度" width="100">
        <template #default="{ row }">
          <el-button type="primary" size="small" text @click="viewSessionDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:20px" :page-size="pagination.size" layout="prev,pager,next"
      :total="pagination.total" @change="handelChange"></el-pagination>
    <el-dialog v-model="showDetailDialog" title="咨询会话详情" width="70%" :close-on-click-modal="false">
      <div class="session-detail">
        <div class="detail-header">
          <div class="detail-row">
            <div class="detail-label">用户：</div>
            <div class="detail-value">{{ sessionDetail.userNickname }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">开始时间：</div>
            <div class="detail-value">{{ sessionDetail.startedAt }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">消息数：</div>
            <div class="detail-value">{{ sessionDetail.messageCount }}</div>
          </div>
        </div>
        <div class="messages-container">
          <div class="messages-header">
            <h4>对话记录</h4>
          </div>
          <div class="messages-list" v-loading="loadingMessage">
            <div v-for="message in sessionMessages" :key="message.id" class="message-item"
              :class="message.senderType === 1 ? 'user-message' : 'ai-message'">
              <div class="message-header">
                <span class="sender">{{ message.senderType === 1 ? '用户' : 'AI助手' }}</span>
                <span class="time">{{ message.createdAt }}</span>
              </div>
              <div class="message-content">{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showDetailDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import PageHead from '@/components/PageHead.vue'
import { onMounted, ref, reactive } from 'vue';
import { getConsultationPage, getSessionDetail } from '../api/admin';
const tableData = ref([])
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})
// 详情弹窗
const showDetailDialog = ref(false)
// 会话详情
const sessionDetail = ref({})
// 详情会话列表
const sessionMessages = ref([])
// 加载会话列表loading效果
const loadingMessage = ref(false)
const viewSessionDetail = async (row) => {
  showDetailDialog.value = true
  loadingMessage.value = true
  const result = await getSessionDetail(row.id)
  sessionMessages.value = result
  sessionDetail.value = row
  loadingMessage.value = false
}
const handelChange = (pagenum) => {
  pagination.currentPage = pagenum
  handleChange()
}
const handleChange = async () => {
  const result = await getConsultationPage(pagination)
  pagination.total = result.total
  tableData.value = result.records
}

onMounted(() => {
  handleChange()
})

</script>
<style scoped lang="scss">
.session-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.session-preview {
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.session-detail {
  max-height: 70vh;
  overflow-y: auto;

  .detail-header {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .detail-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    :last-child {
      margin-bottom: 0;
    }

    .detail-label {
      font-weight: 500;
      color: #495057;
      min-width: 80px;
      margin-right: 8px;
    }

    .detail-value {
      color: #333;
    }
  }
}

.messages-container {
  margin-top: 20px;

  .messages-header {
    margin-bottom: 16px;

    h4 {
      margin: 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .messages-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    background: #fff;

    .message-item {
      margin-bottom: 12px;
      padding: 12px;
      border-radius: 8px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;

      :last-child {
        margin-bottom: 0;
      }

      &.user-message {
        background: #e8f4fd;
      }

      &.ai-message {
        background: #f0f9f0;
      }
    }

    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .sender {
        font-weight: 500;
        color: #333;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .time {
        font-size: 12px;
        color: #999;
      }

      .message-content {
        color: #333;
        line-height: 1.6;
        white-space: pre-wrap;
        margin-top: 8px;
        font-size: 14px;
      }
    }
  }
}
</style>
