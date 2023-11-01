<template>
  <a-checkbox v-model:checked="checked" @change="handleChange">
    {{title}}
  </a-checkbox>
</template>
<script setup>
import {computed} from "vue"

const props = defineProps(
  {
    "title":String,
    "value":{
      type:Number,
      default:0
    }
  }
)
const emits = defineEmits(['update:value'])

let checked = computed(() => {
  if(props.value==1){
    return true
  }
  return false
})
const handleChange = (e) => {
  const checked = e.target.checked
  if(checked){
    emits('update:value',1)
  }else{
    emits('update:value',0)
  }
  //console.log('value',e.target.checked)
}

</script>
<style lang="less" scoped>

</style>
