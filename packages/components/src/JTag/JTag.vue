<template>
  <a-space>

    <a-button type="dashed" v-for="(tag, index) in tags" :key="tag" :size="size" >
      {{ tag }}<close-outlined @click="handleClose(tag)"/>
    </a-button>

    <a-input
      v-if="inputVisible"
      ref="inputRef"
      v-model:value="inputValue"
      type="text"
      :size="size"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-button v-else :size="size" @click="showInput">
      <plus-outlined />
      添加
    </a-button>
  </a-space>
</template>


<script setup>
import { ref, nextTick,watch } from 'vue'

const emits = defineEmits(['update:value','change'])

const props = defineProps({

  value:{
    type:String,
    default:''
  },
  //尺寸
  size:{
    type:String,
    default:'default'
  }

})

//输入框对象
const inputRef = ref()
//标签对象
const tags = ref([])
//输入框状态
const inputVisible=ref(false)
//输入值
const inputValue=ref('')


/**
 * 删除tag
 * @param removedTag
 */
const handleClose = (removedTag) => {
  const tagsTmp = tags.value.filter((tag) => tag !== removedTag)
  tags.value = tagsTmp
  emits('update:value',tagsTmp?tagsTmp.join(','):'')
  emits('change',tagsTmp?tagsTmp.join(','):'')
}

/**
 * 显示输入框
 */
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

/**
 * 删除确认
 */
const handleInputConfirm = () => {
  const inputValueTmp = inputValue.value
  let tagsTmp = tags.value
  if (inputValueTmp && tagsTmp.indexOf(inputValueTmp) === -1) {
    tagsTmp = [...tagsTmp, inputValueTmp]
  }

  tags.value = tagsTmp
  inputVisible.value = false
  inputValue.value = ''

  emits('update:value',tagsTmp?tagsTmp.join(','):'')
  emits('change',tagsTmp?tagsTmp.join(','):'')
}

/**
 * 监听绑定值
 */
watch(()=>props.value,(val,old)=>{

  if (Array.isArray(val)) {
    tags.value = val
  } else if(val && val.length>0){
    tags.value = val.split(',')

  }

},{deep:true,immediate:true})

</script>
