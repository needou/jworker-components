<template>
  <div class="page-container">
    <slot></slot>
  </div>
</template>
<script setup>
import {ref, onMounted} from "vue"
import {message} from 'ant-design-vue'

let demo = ref(0)

const handleOk = () => {
  demo.value = 1
}

</script>
<style lang="less" scoped>
.page-container{
  padding: 10px;
}
</style>
