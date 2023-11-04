<!--字典选择组件-->
<template>
  <a-radio-group :disabled="disabled" :value="value" @change="selectOption">
    <a-radio
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-radio>
  </a-radio-group>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'DictRadio',
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
    disabled: {
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
      context.emit('update:value', value.target.value);
      context.emit('change', value.target.value);
    };

    return {
      ...toRefs(data),
      selectOption
    };
  }
};
</script>
