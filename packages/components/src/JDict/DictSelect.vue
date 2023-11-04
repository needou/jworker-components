<!--字典选择组件-->
<template>
  <!--带多选-->
  <a-select :disabled="disabled" :allowClear="allowClear" :value="value" @change="changeOption" :placeholder="placeholder" mode="multiple" v-if="multiple">
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
  <!--不带多选-->
  <a-select :disabled="disabled" :allowClear="allowClear" :value="value" @select="selectOption" :placeholder="placeholder" v-else>
    <a-select-option
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-select-option>
  </a-select>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';

export default {
  name: 'DictSelect',
  props: {
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
  },
  emits: ['update:value', 'change'],
  setup(props, context) {
    const data = reactive({
      dictList: null
    });

    onMounted(async () => {
      //渲染数据
      if(typeof props.dateSource === 'function' ){
        data.dictList = await props.dateSource()
      }
    });

    const selectOption = value => {
      context.emit('update:value', value);
      context.emit('change', value);
    };

    const changeOption = value => {
      context.emit('update:value', value);
      context.emit('change', value);
    };

    return {
      ...toRefs(data),
      selectOption,
      changeOption
    };
  }
};
</script>
