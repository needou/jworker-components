<template>
  <div class="page-search">
    <a-row :gutter="[10,10]">
      <a-col
          :xs="searchLeftCol.xs" :sm="searchLeftCol.sm" :md="searchLeftCol.md" :lg="searchLeftCol.lg" :xl="searchLeftCol.xl"
      >
        <a-form
            class="search-form"
            @keyup.enter="handleSearchQuery"
            :model="queryParam">

          <a-row :gutter="[20,20]">
            <!--前面扩展字段-->
            <slot name="extendBefore" :model="queryParam" :expand="expand"></slot>
            <template v-for="(item,i) in columns" :key="item.key">
              <a-col
                  v-show="expand || (item.search && item.search.first)"
                  :xs="24" :sm="24" :md="24" :lg="8" :xl="8"
              >
                <a-form-item
                    :labelCol="{style:{width:`${labelWidth}px`}}"
                    class="search-form-item"
                    :label="item.title"
                >
                  <!--select-->
                  <a-select
                      v-if="item.search && item.search.options && item.search.type=='select'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      style="width: 100%"
                      @change="(value, option)=>{item.search.change?item.search.change(value,option):null}"
                  >
                    <a-select-option v-for="op in item.search.options" :value="op.value">{{ op.label }}</a-select-option>
                  </a-select>

                  <!--switch-->
                  <a-switch
                      v-else-if="item.search && item.search.type=='switch'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:checked="queryParam[item.key]"
                      :checked-children="item.search.labelOn"
                      :un-checked-children="item.search.labelOff"
                      @change="(checked, event)=>{item.search.change?item.search.change(checked,event):null}"
                  >

                  </a-switch>

                  <!--date-->
                  <a-date-picker
                      v-else-if="item.search && item.search.type=='date'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      format="YYYY-MM-DD"
                      valueFormat="YYYY-MM-DD"
                      style="width: 100%"
                      @change="(date, dateString)=>{item.search.change?item.search.change(date,dateString):null}"
                  >
                  </a-date-picker>

                  <!--month-->
                  <a-date-picker
                      v-else-if="item.search && item.search.type=='month'"
                      picker="month"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      format="YYYY-MM"
                      valueFormat="YYYY-MM"
                      style="width: 100%"
                      @change="(date, dateString)=>{item.search.change?item.search.change(date,dateString):null}"
                  >

                  </a-date-picker>


                  <!--datetime-->
                  <a-date-picker
                      v-else-if="item.search && item.search.type=='datetime'"
                      show-time
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :format="item.search.format??'YYYY-MM-DD HH:mm:ss'"
                      :valueFormat="item.search.format??'YYYY-MM-DD HH:mm:ss'"
                      style="width: 100%"
                      @change="(date, dateString)=>{item.search.change?item.search.change(date,dateString):null}"
                  >
                  </a-date-picker>

                  <!--time-->
                  <a-time-picker
                      v-else-if="item.search && item.search.type=='time'"
                      style="width: 100%"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :value-format="item.search.format??'HH:mm:ss'"
                      @change="(time, timeString)=>{item.search.change?item.search.change(time,timeString):null}"
                  >

                  </a-time-picker>

                  <!--number-->
                  <a-input-number
                      v-else-if="item.search && item.search.type=='number'"
                      style="width: 100%"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :min="item.search.min??0"
                      :max="item.search.max??10000000000" >

                  </a-input-number>

                  <!--float-->
                  <a-input-number
                      v-else-if="item.search && item.search.type=='float'"
                      style="width: 100%"
                      :step="item.search.pos??'0.1'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :min="item.search.min??0"
                      :max="item.search.max??10000000000"
                      @change="(value)=>{item.search.change?item.search.change(value):null}"
                  >

                  </a-input-number>

                  <!--treeSelect-->
                  <j-tree-select
                      v-else-if="item.search && item.search.type=='treeSelect'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :fieldNames="item.search.fieldNames??{children:'children', label:'title', value: 'value' }"
                      :data="item.search.data??null"
                      style="width: 100%"
                  >

                  </j-tree-select>

                  <!--relationship-->
                  <j-relationship
                      v-else-if="item.search && item.search.type=='relationship'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :selectType="item.search.selectType??'select'"
                      :options="item.search.options??null"
                      style="width: 100%"
                  >

                  </j-relationship>

                  <!--j-dict-->
                  <j-dict-select
                      v-else-if="item.search && item.search.type=='j-dict'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      :dateSource="item.search.dateSource"
                      :type="item.search.selectType??'select'"
                      :multiple="item.search.multiple??false"
                      style="width: 100%"
                  >

                  </j-dict-select>
                  <!--radio-->
                  <a-radio-group
                      v-else-if="item.search && item.search.options && item.search.type=='radio'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      style="width: 100%"
                      @change="(value, option)=>{item.search.change?item.search.change(value,option):null}"
                  >
                    <a-radio v-for="op in item.search.options" :value="op.value">{{ op.label }}</a-radio>
                  </a-radio-group>

                  <!--j-range-picker-->
                  <j-range-picker
                      v-else-if="item.search && item.search.type=='j-range-picker'"
                      :format="item.search.format??'YYYY-MM-DD HH:mm'"
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      @change="(value)=>{item.search.change?item.search.change(value):null}"
                      style="width: 100%"
                  >
                  </j-range-picker>

                  <!--default-->
                  <a-input
                      v-else
                      :allowClear="true"
                      :placeholder="item.placeholder"
                      v-model:value="queryParam[item.key]"
                      @change="(value)=>{item.search.change?item.search.change(value):null}"
                  ></a-input>

                </a-form-item>
              </a-col>
            </template>
            <!--后面扩展字段-->
            <slot name="extendAfter" :model="queryParam" :expand="expand"></slot>
          </a-row>
        </a-form>
      </a-col>
      <a-col
          :xs="searchRightCol.xs" :sm="searchRightCol.sm" :md="searchRightCol.md" :lg="searchRightCol.lg" :xl="searchRightCol.xl"
      >
        <a-form-item :style="{'margin-left':expand?`${labelWidth+17}px`:'0'}" :class="expand?'ele-text-left':'ele-text-right'">
          <a-space>
            <a-button type="primary" @click="handleSearchQuery">查询</a-button>
            <a-button @click="handleSearchReset">重置</a-button>
            <a-button v-if="columns && columns.length>expandNumber" type="link" @click="handleExpand">更多筛选<double-right-outlined :rotate="expand?270:90"  /></a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import {ref} from "vue"

const emits = defineEmits(['search','reset'])

const props = defineProps({
  columns:{
    type:[Object,null],
    default:[]
  },
  labelWidth:{
    type:Number,
    default:100
  },
  //更多筛选隐藏数量
  expandNumber:{
    type:Number,
    default:2
  }
})
//是否展开
const expand = ref(false);
//查询参数
const queryParam = ref({});
//左侧大小
const searchLeftCol=ref({
  'xs':24,
  'sm':24 ,
  'md':24,
  'lg':18,
  'xl':18
})
//右侧代销
const searchRightCol=ref({
  'xs':24,
  'sm':24 ,
  'md':24,
  'lg':6,
  'xl':6
})

/**
 * 搜索按钮
 */
const handleSearchQuery = () => {
  //console.log(queryParam.value)
  emits('search',queryParam.value)
}
/**
 * 重置按钮
 */
const handleSearchReset = () => {
  queryParam.value = {}
  emits('reset')
}
/**
 * 展开更多
 */
const handleExpand=()=>{
  expand.value = !expand.value;
  if(expand.value==true){
    searchLeftCol.value.lg=24;
    searchLeftCol.value.xl=24;

    searchRightCol.value.lg=24;
    searchRightCol.value.xl=24;
  }else{
    searchLeftCol.value.lg=18;
    searchLeftCol.value.xl=18;

    searchRightCol.value.lg=6;
    searchRightCol.value.xl=6;
  }
}

</script>
<style lang="less" scoped>
.page-search{
  padding:25px 10px 0 10px;
  background-color: #fff;
  .search-form-item{
    margin-bottom: 10px !important;
  }
}
</style>
