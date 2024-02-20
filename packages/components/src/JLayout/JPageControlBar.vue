<template>
  <div class="j-page-control-bar" v-if="showSelectInfo || showColumnConfig">
    <div class="info">
      <span v-if="showSelectInfo">{{ '已选择' }}
        <a class="tip">{{ value }}</a>{{ '项' }} </span>
    </div>
    <div class="bar">
      <template>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  value: {
    type: [String, Number, null],
    default: null,
  },
  showSelectInfo: {
    type: Boolean,
    default: true,
  }
});

</script>
<style lang="less" scoped>
.j-page-control-bar{
  flex: 1;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  .info{
    flex: 1;
    padding-bottom: 2px;
    margin-right: 5%;
    .tip{
      font-weight: 600;
    }
  }
  .bar{
    text-align: right;
    margin-left: 10px;
  }
}
</style>
