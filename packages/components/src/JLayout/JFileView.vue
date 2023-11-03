<template>
  <div style="display: inline">
    <div class="file-box" v-for="(item,n) in fileValue" :key="n" @click="showFile(item)">
      <span>{{ item.fileOriginName }}</span>
    </div>
    <a-modal :width="800" :visible="visible" title="文件下载" :footer="null" @cancel="visible=false">
      <div class="down-box">
        <div>{{ fileSelect.fileOriginName }}</div>
        <a-button type="primary" class="down-btn" @click="download(fileSelect.fileUrl)">立即下载</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import {ref, computed} from "vue"

const visible=ref(false)
const fileSelect = ref({})


const props = defineProps({
  value:{
    type: String,
    default: null
  }
})


const fileValue = computed(()=>{
  let arr = []
  const nVal = props.value
  if(typeof nVal=='string' && nVal!=''){
    const newValue = JSON.parse(nVal)
    for (let i = 0; i < newValue.length; i++) {
      newValue[i].fileUrl= newValue[i].fileUrl.replace('&amp;','&')
      arr.push(newValue[i])
    }
  }
  return arr
})


const showFile = (item)=>{
  fileSelect.value = item
  visible.value = true
}
const download = (fileName)=>{
  window.location.href=fileName

}
</script>
<style lang="less" scoped>

</style>
