<template>
  <div style="display: inline">
    <div class="img-box" v-for="(item,n) in imgValue" :key="n" :style="{width: width+'px'}" @click="showImage(item)">
      <img style="width: 100%" :src="item" />
    </div>
    <a-modal :width="800" :visible="visible" title="大图预览" :footer="null" @cancel="visible=false">
      <img style="width: 100%" :src="bigImage" />
    </a-modal>
  </div>
</template>
<script setup name="JImageView">
import {ref, watch,computed } from "vue"
const props = defineProps({
  value:{
    type: String,
    default: null
  },
  width:{
    type:Number,
    default:120
  }
})


const  visible=ref(false)
const  bigImage=ref('')



const imgValue = computed(()=>{
  let arr = []
  const nVal = props.value
  if(typeof nVal=='string' && nVal!=''){
    const newValue = JSON.parse(nVal)
    for (let i = 0; i < newValue.length; i++) {
      const url = newValue[i].fileUrl.replace('&amp;','&')
      arr.push(url)
    }
  }
  return arr
})
//显示大图
const showImage =(item)=>{
  bigImage.value = item
  visible.value = true
}

</script>
<style lang="less" scoped>
.img-box{
  padding: 10px;
  display: inline-block;
  border: 1px solid #ffffff;
  cursor: pointer;
  overflow: hidden;
  &:hover{
    border: 1px solid #f3f3f3;
  }
}
</style>
