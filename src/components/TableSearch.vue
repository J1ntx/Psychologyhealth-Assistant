<template>
  <el-form ref="ruleFormRef" :model="formData">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <component :is="isComp(item.comp)" v-model="formData[item.prop]" :placeholder="item.placeholder">
              <template v-if="item.comp === 'select'">
                <el-option label="全部" value="" />
                <el-option v-for="opt in item.options" :key="opt.value" :label="opt.label"
                  :value="opt.value"></el-option>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button @click="handleSearch" type="primary">查询</el-button>
      <el-button @click="handleReset(ruleFormRef)">重置</el-button>
    </el-row>
  </el-form>
</template>
<style scoped lang="scss"></style>
<script setup>
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  formItem: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['search'])
const formItemAttrs = computed(() => {
  return props.formItem.map(item => {
    return {
      ...item,
      col: { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }
    }
  })
})
// 表单数据
const ruleFormRef = ref(null)
const formData = reactive({})
const isComp = (comp) => {
  return {
    input: 'el-input',
    select: 'el-select',
  }[comp]
}
const handleSearch = () => {
  emit('search', formData)
}
const handleReset = (formEl) => {
  // 先重置表单，然后再触发查询
  if (!formEl) return
  formEl.resetFields()
  emit('search', formData)
}
</script>