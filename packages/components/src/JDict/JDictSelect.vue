<template>
  <div style="min-width:100px;">
    <dict-select
        v-if="type=='select'"
        :value="modelValue"
        :multiple="multiple"
        :disabled="disabled"
        :allowClear="allowClear"
        :placeholder="placeholder"
        :date-source="dateSource"
        @change="handleSelectChange"
    />
    <dict-checkbox
        v-if="type=='checkbox'"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :date-source="dateSource"
        @change="handleCheckChange"
    />
    <dict-radio
        v-if="type=='radio'"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :date-source="dateSource"
        @change="handleRadioChange"
    />
  </div>
</template>

<script setup>
import DictSelect from "./DictSelect.vue";
import DictCheckbox from "./DictCheckbox.vue";
import DictRadio from "./DictRadio.vue";
import {computed} from "vue";

const props = defineProps({
  //显示类型,select,radio,checkbox
  type:{
    type: String,
    default: 'select'
  },
  //数据源
  dateSource: {
    type: Function
  },
  // 传递进来的字典值
  value: {
    required: true
  },

  // 是否可以多选
  multiple: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  placeholder:{
    type: String,
    required: true,
    default: '请选择'
  },
  allowClear: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emits = defineEmits( ['update:value','change'])

const modelValue = computed({
  get: () => {
    if (props.value && props.value.indexOf(',') !== -1) {
      return props.value.split(',')
    }
    if ((props.value == null || props.value === '') && props.multiple) {
      return []
    }
    return props.value
  },
  set: (newValue) => {
    if (Array.isArray(newValue)) {
      newValue = newValue.toString();
    }
    emits('update:value', newValue)
    emits('change', newValue)
  },
})

/**
 * 下拉回调
 * @param value
 */
const handleSelectChange=(value)=>{
  console.log('change',value)
  emits('update:value', value)
  emits('change', value)
}

/**
 * 多选回调
 * @param value
 */
const handleCheckChange=(value)=>{
  emits('update:value', value)
  emits('change', value)
}

/**
 * 单选回调
 * @param value
 */
const handleRadioChange=(value)=>{
  emits('update:value', value)
  emits('change', value)
}

</script>
