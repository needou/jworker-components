<template>
  <a-select
    v-if="selectType=='select'"
    :mode="mode"
    :value="valueString"
    @change="handleChange">
    <a-select-option v-for="item in dataSource" :key="item.value" :value="item.value">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script setup>

import {computed, ref} from "vue"

const props = defineProps({
  value:{
    type: [String , Array , Number , null],
    default: null
  },
  selectType:{
    type:String,
    default:'select'
  },
  mode:{
    type: String,
    default: 'default'
  },
  options:{
    type: [ Function , null],
    default: null
  }
})
//定义事件
const emit = defineEmits(['update:value','change'])
//定义数据源
const dataSource = ref( [])


//init data
const init = ()=>{
  if (typeof props.options === 'function') {
      props.options().then((data)=>{
        dataSource.value = data
      })
  }
}

//结果字符串
const valueString = computed(() => {
  // 当有 null 或 "" 时，placeholder 不显示
  return props.value != null ? props.value.toString() : undefined;
});

//event
const handleChange = (value, option) => {
  emit('update:value', value);
  emit('change', value, option);
};

//初始化
init();
</script>
