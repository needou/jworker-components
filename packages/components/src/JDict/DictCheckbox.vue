<!--字典选择组件-->
<template>
  <a-checkbox-group :disabled="disabled" :value="value" @change="changeOption">
    <a-checkbox
      v-for="dict in dictList"
      :key="valueType === 'dictId' ? dict.dictId : dict.dictCode"
      :value="valueType === 'dictId' ? dict.dictId : dict.dictCode"
    >
      {{ dict.dictName }}
    </a-checkbox>
  </a-checkbox-group>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'

export default {
  name: 'DictCheckbox',
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
    })

    onMounted(async () => {
      //渲染数据
      if(typeof props.dateSource === 'function' ){
        data.dictList = await props.dateSource()
      }
    })
    /**
     * 返回结果
     * @param value
     */
    const changeOption = value => {
      let result = ''
      if(value && value.length>0){
        result = value.join(',')
      }

      context.emit('update:value', result)
      context.emit('change', result)
    }

    return {
      ...toRefs(data),
      changeOption
    }
  }
};
</script>
