<template>
  <div class="down-box">
    <a :href="url" target="_blank">下载模板</a>
  </div>
</template>

<script>

export default {
  name: "JDownload.vue",
  props:{
    url:{
      type:String,
      default:''
    }
  }
}
</script>

<style lang="less" scoped>
.down-box{
  position: absolute;
  left: 100px;
  top:0;
  z-index:100;
  a{
    display: block;
    border: 1px solid #d0d0d0;
    padding: 4px 10px;
    border-radius: 3px;
    color: #333;
    &:hover{
      border-color: #1BB5F5;
      color: #1BB5F5;
    }
  }
}
</style>
