<template>
  <a-popover
    :placement="placement"
    :visible="visible"
    trigger="click"
    :title="notice"
  >
    <template #content>
      <!--内容区域-->
      <div style="min-width: 90px;max-width:300px;">
        <a-space>
          <a-button size="small" @click="visible=false">{{ cancelBtn }}</a-button>
          <a-button size="small" danger @click="handleOk">{{ okBtn }}</a-button>
        </a-space>
      </div>

    </template>

    <!--删除按钮-->
    <span @click="visible=true">
      <slot name="title" v-if="!!$slots.title"></slot>
      <a v-else >{{ title }}</a>
    </span>

  </a-popover>
</template>
<script setup>
import {ref} from "vue"
const props= defineProps({
  title:{
    type:String,
    default:'删除'
  },
  placement:{
    type:String,
    default:'bottomRight'
  },
  notice:{
    type:String,
    default:'确定要删除?'
  },
  okBtn:{
    type:String,
    default:'确定'
  },
  cancelBtn:{
    type:String,
    default:'取消'
  },
})
//事件
const emits=defineEmits(['ok'])
//状态
const visible = ref(false)
/**
 * 确定
 */
const handleOk = () => {
  visible.value = false
  emits('ok')
}

</script>
