<template>
  <a-range-picker
      :value="getValueObject"
      :ranges="ranges"
      :show-time="showTime"
      :disabledDate="disabledDate"
      :format="format"
      :Style="styles"
      :placeholder="getPlaceholder"
      @change="handleChange"
  />

</template>

<script setup name="JRangePicker">
import dayjs from 'dayjs'
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"

dayjs.extend(weekday)
dayjs.extend(localeData)

import {computed, defineEmits, ref} from "vue"

const emits = defineEmits(['update:value','change'])
const props = defineProps({
  value:{
    type:[Array , null],
    default: null
  },
  showTime:{
    type: Boolean,
    default: true
  },
  disabledDate:{
    type:Function
  },
  format:{
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  styles: {
    type: String,
    default: 'width:100%;'
  },
  placeholder:{
    type:[Array,null],
    default:null
  }
});

const ranges =ref({
  '今天': [dayjs().startOf('day'), dayjs().endOf('day')],
  '最近7天': [dayjs('2022-10-01 00:00:00'), dayjs('2022-10-30 23:59:59')],
  '最近30天':[ dayjs().add(-30,'day').startOf('day'),dayjs().endOf('day')],
  '最近60天':[ dayjs().add(-60,'day').startOf('day'),dayjs().endOf('day')]
});

const defaultVal=ref([dayjs().startOf('day'), dayjs().endOf('day')]);

const getPlaceholder = computed(()=>{
  if(props.placeholder!=null){
    return props.placeholder;
  }
  return ['开始日期','结束日期']
});

const getValueObject = computed(()=>{
  if( props.value != null && props.value!="" ){
    let arr = props.value.split(",");
    let dayjsStart = dayjs( arr[0],props.format);
    let dayjsEnd = dayjs( arr[1],props.format);
    let result = [dayjsStart,dayjsEnd];
    return result;
  }else{
    return null;
  }
});

const handleChange = (dates, dateStrings)=>{
  let value = null;
  if(dateStrings!=null && dateStrings.length==2){
    value = dateStrings.join(",");
  }
  value=value==','?null:value;
  emits('update:value', value);
  emits('change', value);
}
</script>
