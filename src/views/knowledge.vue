<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit">新增</el-button>
        <el-button type="primary">编辑</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%;margin-top:25px">
      <el-table-column label="文章标题" width="300" fixed="left">
        <template #default="{ row }">
          <div style="display:flex;align-items: center;">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="300">
        <template #default="{ row }">
          <div style="display:flex;align-items: center;">
            <el-icon>
              <Timer />
            </el-icon>
            <span>{{ categoryMap[row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" width="300" label="作者"></el-table-column>
      <el-table-column prop="readCount" width="200" label="阅读量"></el-table-column>
      <el-table-column prop="updatedAt" min-width="150" label="发布时间"></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" text @click="handleEdit(row)">编辑</el-button>
          <el-button @click="handlePublish(row)" v-if="row.status === 0 || row.status === 2" type="success"
            text>发布</el-button>
          <el-button @click="handleUnPublish(row)" v-if="row.status === 1" type="warning" text>下线</el-button>
          <el-button text type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:25px" layout="prev,pager,next" :total="pagination.total"
      :page-size="pagination.size" @change="handleChange"></el-pagination>
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categories="categories"
      @success="handleSuccess">
    </ArticleDialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import ArticleDialog from '../components/ArticleDialog.vue'
import { categoryTree, articlePage } from '@/api/admin'
import { changeArticleStatus, deleteArticle, getArticleDetail } from '../api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
// 
const formItem = ref([{ comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
{ comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类', options: [] },
{
  comp: 'select', prop: 'status', label: '状态', placeholder: '请输入文章内容', options: [{ label: '草稿', value: '0' },
  { label: '已发布', value: '1' }, { label: '已下线', value: '2' }]
}
])
// 分页参数
const pagination = ref({
  currentPage: 1,
  size: 10,
  total: 0
})
// 分类映射
const categoryMap = ref({})
// 分类列表
const categories = ref([])
// 列表数据
const tableData = ref([])
// 新增和编辑
const dialogVisible = ref(false)
const currentArticle = ref(null)
// 用来保存 TableSearch 传过来的查询条件
const searchForm = ref({})
const handleSearch = async (formData) => {
  searchForm.value = formData
  const params = {
    ...pagination.value,
    ...formData
  }
  const { records, total } = await articlePage(params)
  tableData.value = records
  pagination.value.total = total
}
handleSearch()
const handleChange = (page) => {
  pagination.value.currentPage = page
  handleSearch(searchForm.value)
}
const handleSuccess = () => {
  dialogVisible.value = false
  // 刷新列表
  handleSearch(searchForm.value)
}
// 编辑
const handleEdit = async (row = {}) => {
  if (!row.id) {
    // 新增
    currentArticle.value = null
    dialogVisible.value = true
  } else {
    const result = await getArticleDetail(row.id)
    currentArticle.value = result
    dialogVisible.value = true
  }

}
// 发布
const handlePublish = (row) => {
  ElMessageBox.confirm(
    `确认发布文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认发布',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    changeArticleStatus(row.id, { status: 1 }).then(() => {
      ElMessage({
        type: 'success',
        message: '发布成功'
      })
      handleSearch(searchForm.value)
    })
  })
}
const handleUnPublish = (row) => {
  ElMessageBox.confirm(
    `确认下线文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认下线',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    changeArticleStatus(row.id, { status: 2 }).then(() => {
      ElMessage({
        type: 'waring',
        message: '发布成功'
      })
      handleSearch(searchForm.value)
    })
  })
}
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确认删除文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'danger'
    }
  ).then(() => {
    deleteArticle(row.id).then(() => {
      ElMessage({
        type: 'waring',
        message: '删除成功'
      })
      handleSearch(searchForm.value)
    })
  })
}
onMounted(async () => {
  const data = await categoryTree()
  categories.value = data.map(item => {
    categoryMap.value[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem.value[1].options = categories.value
})
</script>
