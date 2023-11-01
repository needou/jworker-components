<template>
  <div class="money-box">
    <div v-if="showText && text!=''" class="money-txt">
      <span class="ttl">{{ text }}</span>
    </div>
    <a-input-number
        :value="value"
        @input="$emit('update:value', $event)"
        v-display
        v-bind="$attrs"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')" />
  </div>
</template>

<script setup name="JInputNumber">
import {ref,watch} from "vue"
import {convertCurrency} from "../utils/util"

const text = ref('')
const showText=ref(false)

const props = defineProps({
  value:Number
})
watch(()=>props.value,(newVal)=>{
  if(newVal && newVal>0) {
    text.value = convertCurrency(newVal)
  }else{
    text.value =''
  }
})
//定义指令
const vDisplay =(el) => {
  let mtinput = el.querySelector('input')
  mtinput.onfocus =  ()=> {
    showText.value = true
  }
  mtinput.onblur =  () =>{
    showText.value = false
  }
}

</script>

<style lang="less" scoped>
.money-box {
  position: relative;
  .money-txt {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 10;
    padding:5px 5px;
    letter-spacing:1px;
    background-color: #2db7f5;
    border-radius: 2px;
    color: #ffffff;
    .ttl{
      font-size: 18px;
    }

  }
}
</style>
