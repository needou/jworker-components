<template>
  <a-empty :image="simpleImage" />
</template>
<script>
import { defineComponent } from 'vue';
import { Empty } from 'ant-design-vue';
export default defineComponent({
  setup() {
    return {
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    };
  },
});
</script>
