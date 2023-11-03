<script setup>
import {ref} from "vue"
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const test =ref('[{"fileId": "1720074528500817921", "fileUrl": "https://pm.yanchee.com.cn/api/sysFileInfo/previewByObjectName?fileBucket=default&fileObjectName=1697188808308559873.png", "fileBucket": "default", "fileSizeKb": "682", "fileStatus": "1", "fileSuffix": "png", "secretFlag": "N", "fileVersion": 1, "fileLocation": 4, "fileSizeInfo": "681.69 KB", "fileObjectName": "1720074528500817921.png", "fileOriginName": "image_1680409743_D7tvww8K.png"}]')
</script>

<template>
  <div class="greetings">
   <j-file-view
       :value="test"
   />

  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
