<template>
  <div class="info">
    <div class="fg"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup name="JLabelTip">
defineProps({
  title:String
});
</script>

<style lang="less" scoped>
.info{
  width: 100%;
  padding: 3px 0 3px 0;
  background-color: #ECF5FF;
  border: 1px solid rgba(0,173,255,0.3);
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .fg{
    background-color:rgba(0,173,255,0.8) ;
    width: 3px;
    height: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .title{
    flex: 1;
  }
}
</style>
