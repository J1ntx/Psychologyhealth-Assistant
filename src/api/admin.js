import service from '@/utils/request'
// 登录接口
export const login = (data) => {
  return service.post('/user/login', data)
}
// 获取分类
export const categoryTree = () => {
  return service.get('/knowledge/category/tree')
}
// 获取知识文章列表
export const articlePage = (params) => {
  return service.get('/knowledge/article/page', { params })
}
// 文件上传
export const uploadFile = (file, businessInfo) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessId', businessInfo.businessId)
  formData.append('businessField', 'cover')

  return service.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 文章新增
export const createArticle = (data) => {
  return service.post('/knowledge/article', data)
}
// 获取知识文章详情
export const getArticleDetail = (id) => {
  return service.get('knowledge/article/' + id)
}

// 编辑知识文章
export const updateArticle = (id, data) => {
  return service.put(`/knowledge/article/${id}`, data)
}
// 更新文章状态
export const changeArticleStatus = (id, data) => {
  return service.put(`/knowledge/article/${id}`, data)
}
// 删除知识文章
export const deleteArticle = (id) => {
  return service.delete(`/knowledge/article/${id}`)
}

// 咨询会话页面
// 获取会话列表
export const getConsultationPage = (params) => {
  return service.get('/psychological-chat/sessions', { params })
}
// 获取会话详情
export const getSessionDetail = (sessionId) => {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`)
}
// 获取情绪日志列表
export const getEmotionalPage = (params) => {
  return service.get('/emotion-diary/admin/page', { params })
}
// 删除情绪日志
export const deleteEmotional = (id) => {
  return service.delete(`/emotion-diary/admin/${id}`)
}
// 获取综合数据分析
export const getAnalyticsOverview = () => {
  return service.get('/data-analytics/overview')
}
// 用户退出登录
export const logout = () =>{
  return service.post('/user/logout')
}