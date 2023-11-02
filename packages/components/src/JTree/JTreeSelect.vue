<template>
  <a-spin :spinning="loading">
    <a-tree-select
      :fieldNames="fieldNames"
      :value="value"
      v-bind="$attrs"
      style="width:100%"
      :tree-data="treeData"
      :treeDefaultExpandAll="treeDefaultExpandAll"
      @change="handleChange"
    />
  </a-spin>
</template>
<script setup>

import {ref} from "vue"

const emits = defineEmits(['update:value','change'])
//定义属性
const props = defineProps({
  value:{
    type:[String,Number,Array]
  },
  fieldNames:{
    type:Object,
    default:null
  },
  data:{
    type:Function,
    default:null
  },
  treeDefaultExpandAll:{
    type:Boolean,
    default:true
  }
})

//loading
const loading =ref(false)
//树数据列表
const treeData = ref([])

/**
 * change
 * @param value
 * @param option
 */
const handleChange = (value, label, extra)=> {
  emits('update:value',value)
  emits('change',value,label,extra)
}

/**
 * 拉去数据
 */
const init =()=>{
  if(typeof props.data == 'function'){
    loading.value = true

    props.data().then((data)=>{
      treeData.value = data
      loading.value = false
    })

  }
}

init()


</script>
