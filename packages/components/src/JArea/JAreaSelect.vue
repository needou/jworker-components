<template>
  <div class="j-area-linkage">
    <a-cascader v-model:value="getValue" :options="options" v-bind="$attrs" :placeholder="placeholder" @update:value="handleUpdate"/>
  </div>
</template>

<script setup name="JAreaSelect">
import Area from './Area.js';
import {computed, onMounted, ref} from "vue";

const emits = defineEmits(['update:value']);
const props = defineProps({
  value: {
    type: [String,Array,null],
    default:null
  },
  placeholder:{
    type: String,
    default:"请选择区域"
  }
})
const options = ref();

const getValue=computed(()=>{
  if(props.value && props.value!='') {
    if (Array.isArray(props.value)) {
      return props.value;
    }else{
      console.log(JSON.parse(props.value))
      return JSON.parse(props.value);
    }
  }else{
    return null;
  }
})
onMounted(()=>{
  const area = new Area();
  const data = area.getOption();
  options.value = data;
});

const handleUpdate=(value)=>{
  emits('update:value',value);
}

</script>
