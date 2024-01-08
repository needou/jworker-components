<template>
  <!--  <div class="greetings">-->
  <!--    <j-file-view-->
  <!--        :value="test"-->
  <!--    />-->

  <!--  </div>-->

  <j-page-container>

    <j-page-search
        :columns="query.columns"
        @search="handleSearch"
        @reset="handleReset"
    >
      <template v-slot:extend="{model}">
        <a-col
            :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
        >
          <a-form-item
              :labelCol="{style:{width:`100px`}}"
              class="search-form-item"
              label="扩展"
          >
            <a-select
                v-model:value="model.extend"
                show-search
                placeholder="Select a person"
                style="width: 200px"
                :options="options"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
          </a-form-item>
        </a-col>
      </template>
    </j-page-search>
  </j-page-container>
</template>

<script setup>
import {reactive, ref} from "vue"
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const test =ref('[{"fileId": "1720074528500817921", "fileUrl": "https://pm.yanchee.com.cn/api/sysFileInfo/previewByObjectName?fileBucket=default&fileObjectName=1697188808308559873.png", "fileBucket": "default", "fileSizeKb": "682", "fileStatus": "1", "fileSuffix": "png", "secretFlag": "N", "fileVersion": 1, "fileLocation": 4, "fileSizeInfo": "681.69 KB", "fileObjectName": "1720074528500817921.png", "fileOriginName": "image_1680409743_D7tvww8K.png"}]')

const query = reactive({
  //搜索栏
  columns: [
    {
      title: '场次名称',
      key: 'title',
      placeholder:'请输入场次名称',
      search: {
        first: true,
        type: 'string'
      },
    },
  ]
})

const options = ref([{
  value: 'jack',
  label: 'Jack',
}, {
  value: 'lucy',
  label: 'Lucy',
}, {
  value: 'tom',
  label: 'Tom',
}]);

const handleChange = value => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log('blur');
};
const handleFocus = () => {
  console.log('focus');
};
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
/**
 * 搜索
 */
const handleSearch = (where)=>{
  console.log(where)
  //tableRef.value.searchData(where)
}

const handleReset=()=>{
  console.log('reset')
}
</script>



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
