<template>
  <div style="min-width:100px;">
    <dict-select
        v-if="type=='select'"
        :value-type="valueType"
        :multiple="multiple"
        :disabled="disabled"
        :allowClear="allowClear"
        v-model:value="modelValue"
        :placeholder="placeholder"
        :date-source="dateSource" />
    <dict-checkbox
        v-if="type=='checkbox'"
        :value-type="valueType"
        :disabled="disabled"
        v-model:value="modelValue"
        :placeholder="placeholder"
        :date-source="dateSource" />
    <dict-radio
        v-if="type=='radio'"
        :value-type="valueType"
        :disabled="disabled"
        v-model:value="modelValue"
        :placeholder="placeholder"
        :date-source="dateSource" />
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
  // 传递进来的值是字典编码还是字典id
  valueType: {
    type: String,
    required: true,
    default: 'dictCode'
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
    if (modelValue.value && modelValue.value.indexOf(',') !== -1) {
      return modelValue.value.split(',');
    }
    if ((modelValue.value == null || modelValue.value === '') && multiple) {
      return [];
    }
    return modelValue.value;
  },
  set: (newValue) => {
    if (Array.isArray(newValue)) {
      newValue = newValue.toString();
    }
    emits('update:value', newValue);
    emits('change', newValue);
    modelValue.value = newValue;
  },
})
</script>
