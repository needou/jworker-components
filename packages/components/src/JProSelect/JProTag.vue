<template>
  <a-popover
    :placement="placement"
    :destroyTooltipOnHide="destroyTooltipOnHide"
    v-model:visible="visible"
    trigger="click"
  >
    <!--弹窗-->
    <template #content>
      <div class="pro-popover-table">
        <div class="receptionist_search">
          <a-input-search
            v-model:value="keyWord"
            :placeholder="placeholder"
            style="width: 600px"
            @search="onSearch"
          />
        </div>

        <div class="pro-popover-table__wrap">
          <a-spin :spinning="loading">
            <a-table
              :rowSelection="rowSelection"
              :dataSource="data"
              :pagination="{position:['bottomCenter']}"
              :columns="columns"
              :size="size" />
          </a-spin>
        </div>
        <div class="pro-popover-table__footer">
          <a-space>
            <a-button @click="handleCancel">{{ cancelBtnTxt }}</a-button>
            <a-button type="primary" @click="handleOk">{{ okBtnTxt }}</a-button>
          </a-space>
        </div>
      </div>
    </template>
    <!--内容显示-->
    <div class="pro-popover-table__content">
      <template  v-for="it in modelValue">
        <a-popover
          placement="right"
          v-model:visible="visibleConfirm"
          trigger="manual"
          :getPopupContainer="getContainer">
          <template #content>
            <div class="remove-box">
              <h5>
                <question-circle-outlined />
                {{deleteTitle}}
              </h5>
              <div class="remove-box-btn">
                  <a-button  :size="size"  @click="visibleConfirm=false">{{ deleteCancelBtn }}</a-button>
                  <a-button type="primary"  :size="size" danger @click="handleDelete(it)">{{ deleteOkBtn }}</a-button>
              </div>
            </div>
          </template>
          <a-tooltip class="item" color="blue"  placement="topLeft" :title="it[remarkField]" >
            <span class="ant-tag ant-tag-blue item">
               {{ it[labelField] }}
               <close-outlined @click="visibleConfirm=true"/>
            </span>

          </a-tooltip>
        </a-popover>
      </template>
      <a-button
        v-if="selectType === 'select' || (selectType === 'radio' && !modelValue?.length)"
        class="item"
        type="primary"
        :size="size"
        ghost
        @click="handleShow">
        {{ labelBtnTxt }}
      </a-button>
    </div>

  </a-popover>
</template>
<script setup name="j-pro-tag">

import {computed, defineEmits, defineProps, ref} from 'vue'

const emits = defineEmits(['update:value','ok','cancel','delete']);

const props = defineProps({

  value: {
    type: [Array,Object],
    default: []
  },
  placement:{
    type: String,
    default:'right'
  },
  //上下文，主要用于用户传递数据
  context:{
    type: Object,
    default: null
  },
  //是否释放
  destroyTooltipOnHide:{
    type: Boolean,
    default: false
  },
  //显示字段设置
  labelField:{
    type: String,
    required:true
  },
  //提醒字段设置
  remarkField:{
    type: String,
    required:true
  },
  placeholder:{
    type: String,
    default: ''
  },
  selectType:{
    type: String,
    default: 'radio'
  },
  size:{
    type: String,
    default: 'small'
  },
  columns:{
    type: Array,
    default: []
  },
  dataSource:{
    type: [Function,null],
  },
  labelBtnTxt:{
    type: String,
    default: '选择'
  },
  cancelBtnTxt:{
    type: String,
    default: '取消'
  },
  okBtnTxt:{
    type: String,
    default: '确定'
  },
  deleteTitle:{
    type: String,
    default: '确定要删除该数据?'
  },
  deleteOkBtn:{
    type: String,
    default: '删除'
  },
  deleteCancelBtn:{
    type: String,
    default: '取消'
  }
})
//状态切换
const visible = ref(false)
//删除确认
const visibleConfirm = ref(false)
//loading
const loading = ref(false)
//数据选项
const data = ref([])
//搜索词
const keyWord = ref("")
//选择临时缓存项
const selectedTmpRows = ref([])

//计算取值
const modelValue =  computed(()=>{
  if (Array.isArray(props.value)) {
    return props.value
  }else if(props.value){
    return [props.value]
  }else{
    return []
  }
})

/**
 * 设置挂在对象
 * @param trigger
 */
const getContainer=(trigger)=>{
  return  trigger.parentNode;
}
/**
 * 确定事件
 */
const handleOk = () => {
  visibleConfirm.value=false
  visible.value = false
  if(props.selectType=='radio'){
    let result = null
    if(selectedTmpRows.value && selectedTmpRows.value.length>0){
      result = selectedTmpRows.value[0]
    }
    emits('update:value',result)
    emits('ok',result,props.context)
  }else{
    emits('update:value',selectedTmpRows.value)
    emits('ok',selectedTmpRows.value,props.context)
  }


}
/**
 * 取消事件
 */
const handleCancel = () => {
  visible.value = false
  emits('cancel',props.context)
}

/**
 * 回调搜索事件
 */
const onSearch = () => {
  if( typeof props.dataSource === 'function' ){
    props.dataSource(keyWord.value,loading).then((da)=>{
      if(da){
        data.value = da
      }
    })
  }

}

/**
 * 处理选择行的回调函数
 * @param record 记录
 * @param selected 选择状态
 */
const changeSelect = (record, selected) => {
  let list = JSON.parse(JSON.stringify(modelValue.value))
  if(!list){
    list=[]
  }
  if (selected) {
    // 当行被选中时
    if (!list.some(item => item.key === record.key)) {
      // 如果缓存数组中不存在该行数据，则添加到缓存数组
      list.push(record);
    }
  } else {
    // 当行取消选中时
    const index = list.findIndex(item => item.key === record.key);
    if (index !== -1) {
      // 如果缓存数组中存在该行数据，则从缓存数组中删除
      list.splice(index, 1);
    }
  }
  selectedTmpRows.value = list

};

/**
 * 配置选择项
 */
const rowSelection = ref({
  checkStrictly: false,
  //选项类型
  type:props.selectType,
  //选择事件
  onSelect: (record, selected, selectedRows) => {
    if(props.selectType=='radio'){
      if(selected){
        selectedTmpRows.value = [record]
      }

    }else{
      changeSelect(record,selected)
    }

    console.log('onSelect',record, selected, selectedRows);
  },
  //全选事件
  onSelectAll: (selected, selectedRows, changeRows) => {
    if(selectedRows && selectedRows.length>0){
      selectedRows.forEach((row)=>{
        changeSelect(row,selected)
      })
    }
    console.log('onSelectAll',selected, selectedRows, changeRows);
  },
})

/**
 * 显示窗口
 */
const handleShow=()=>{
  visible.value = true
  onSearch()
}
/**
 * 删除单条记录
 */
const handleDelete=(item)=>{
  if(props.selectType=='radio'){

    selectedTmpRows.value=[]
    emits('update:value',null)
    //返回删除对象
    emits('delete',item,props.context)
  }else{
    changeSelect(item,false)
    emits('update:value',selectedTmpRows.value)
    emits('delete',item,props.context)
  }
}

</script>

<style lang="less">
//覆盖table为空状态下的下边框信息
.pro-popover-table__wrap {
  .ant-table-placeholder{
    .ant-table-cell{
      border-bottom: 0!important;
    }
  }
}
//覆盖边距样式
.ant-popover-inner-content {
  padding: 0 !important;
}
</style>
<style lang="less" scoped>

.pro-popover-table {
  .receptionist_search {
    padding: 16px 12px 14px 12px;
  }

  .pro-popover-table__list__item {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;

    .pro-popover-table__table__item__cell {
      padding: 9px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 30px;

      &:first-child {
        padding-left: 36px;
      }
    }
  }

  .pro-popover-table__table__header {
    background: #f5f5f5;
  }

  .pro-popover-table__wrap {
    max-width: 800px;
    min-height: 480px;

    .pro-popover-table__list {
      height: 200px;
      overflow-y: auto;
      position: relative;
      color: rgba(0, 0, 0, .65);
      font-size: 14px;

      .pro-popover-table__list__item {
        display: flex;
        align-items: center;
        height: 40px;

        .name {
          width: 140px;
          padding-left: 0;
        }

        .company {
          width: 112px;
        }

        .group {
          width: 6em;
        }

        .remark {
          width: 160px;
        }
      }

      .pro-popover-table__list__loading {
        div {
          font-size: 14px;
          color: #8c8c8c;
          text-align: center;
          line-height: 22px;
          padding: 0 0 10px 0;
        }
      }
    }
  }
  .pro-popover-table__footer {
    height: 64px;
    box-shadow: 0 -3px 6px -4px #c1c8dd;
    text-align: right;
    line-height: 64px;
    padding-right: 24px;
  }

}

.pro-popover-table__content{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item{
    margin: 5px;
  }
}

.remove-box{
  padding: 10px;
  min-width: 160px;
  max-width: 300px;
  h5{
    font-size: 14px;
    font-weight: normal;
    padding: 10px 0;
    color: var(--primary-color);
    text-align: center;
  }
  .remove-box-btn{
    text-align: center;
    .ant-btn{
      margin: 0 5px;
    }
  }
}

</style>
