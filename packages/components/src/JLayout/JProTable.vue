<template>
  <div class="j-pro-table">
    <!-- 操作按钮区域 -->
    <div class="control-box">
      <a-row>
        <!--左侧-->
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="16">
          <div class="left-action">
            <a-space>
              <slot name="headerButton"></slot>
            </a-space>
          </div>
        </a-col>
        <!--右侧-->
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8">
          <div class="right-action">
            <!--右侧控制按钮-->
            <j-page-control-button
                v-model:columns="columnsConfig"
                v-model:size="configSize"
                v-model:type="configType"
                :enableType="enableType"
                :enableControl="enableControl"
                :reloadList="loadData" />
          </div>

        </a-col>
      </a-row>

    </div>

    <div class="content-box">
      <a-spin :spinning="loading">
        <a-table
            :scroll="{ x: 'max-content' }"
            v-if="configType=='list'"
            :columns="columnsConfig"
            :size="configSize"
            :data-source="data"
            :pagination="false"
            :row-selection="enableSelectAll?rowSelection:null"
            v-bind="$attrs"
        >

          <!-- 定义 headerCell 插槽 -->
          <template v-slot:headerCell="{ column }">
            <slot name="headerCell" :column="column"></slot>
          </template>
          <!-- 定义 bodyCell 插槽 -->
          <template v-slot:bodyCell="{ column, record }">
            <slot name="bodyCell" :column="column" :record="record"></slot>
          </template>
        </a-table>

        <div v-if="configType=='card'" class="card-box">
          <a-row v-if="data && data.length>0" :gutter="[10,10]">
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" v-for="item in data">
              <slot name="cardCell" :record="item"></slot>
            </a-col>
          </a-row>

          <j-empty v-else/>
        </div>
      </a-spin>
      <a-row style="margin-top:20px;">
        <template v-if="enableSelectAll">
          <a-col v-if="pageLeftSpan>0" :span="pageLeftSpan">
            <div class="j-table-select-row">
              <j-page-control-bar
                  :value="selectItems.length??0"
                  :show-select-info="enableSelectAll">
              </j-page-control-bar>
            </div>
          </a-col>
          <a-col v-else :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <div class="j-table-select-row">
              <j-page-control-bar
                  :value="selectItems.length??0"
                  :show-select-info="enableSelectAll"
                  :show-column-config="enableControl">
              </j-page-control-bar>
            </div>
          </a-col>
        </template>

        <template v-if="pagination">
          <a-col v-if="pageRightSpan>0" :span="pageRightSpan">
            <div class="j-table-page" v-if="ipage!=false">
              <a-pagination
                  :size="configSize"
                  :total="ipage.total"
                  :defaultPageSize="ipage.defaultSize"
                  :show-size-changer="ipage.showSizeChanger"
                  :show-quick-jumper="ipage.showQuickJumper"
                  :pageSizeOptions="ipage.pageSizeOptions"
                  @change="handlePageChange"
                  @showSizeChange="handlePageSizeChange"
                  :show-total="total => `${(ipage.current-1)*ipage.pageSize+1}-${ipage.current*ipage.pageSize}`+('共')+`${total}`+('条')"
              />
            </div>
          </a-col>
          <a-col v-else :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
            <div class="j-table-page" v-if="ipage!=false">
              <a-pagination
                  :size="configSize"
                  :total="ipage.total"
                  :defaultPageSize="ipage.defaultSize"
                  :show-size-changer="ipage.showSizeChanger"
                  :show-quick-jumper="ipage.showQuickJumper"
                  :pageSizeOptions="ipage.pageSizeOptions"
                  @change="handlePageChange"
                  @showSizeChange="handlePageSizeChange"
                  :show-total="total => `${(ipage.current-1)*ipage.pageSize+1}-${ipage.current*ipage.pageSize}`+('共')+`${total}`+('条')"
              />
            </div>
          </a-col>
        </template>

      </a-row>


    </div>

  </div>
</template>
<script setup>
import {ref,computed} from "vue"

//定义事件
const emits = defineEmits(['select','update:columns'])

const props = defineProps({
  //数据源
  dataSource: {
    type: Function,
    default: null,
  },
  //是否允许全选
  enableSelectAll: {
    type: Boolean,
    default: true,
  },
  //是否显示控制栏
  enableControl: {
    type: Boolean,
    default: true,
  },
  //显示列表还是card
  type:{
    type: String,
    default: 'list',
  },
  size:{
    type: String,
    default: 'default',
  },
  pageLeftSpan:{
    type: Number,
    default: 0,
  },
  pageRightSpan:{
    type: Number,
    default: 0,
  },
  //是否允许列表切换
  enableType:{
    type: Boolean,
    default: true,
  },
  columns:{
    type:Array
  },
  //分页配置
  pagination:{
    type: [Object,Boolean],
    default: true,
  }
})

//默认分页
const ipage=ref({
  current: 1,
  pageSize: 10,
  defaultSize:10,
  pageSizeOptions: ['10','20','30','40','50','100','200','500','1000'],
  showTotal: (total, range) => {
    return range[0] + "-" + range[1] + this.tt("共") + total + this.tt("条")
  },
  showQuickJumper: true,
  showSizeChanger: true,
  total: 0
})

//代理栏目,不能直接绑定属性
const columnsConfig = ref(props.columns)
//代理size,不能直接绑定属性
const configSize = ref(props.size)
//代理size,不能直接绑定属性
const configType = ref(props.type)
//数据源
const data =ref([])
//搜索条件
const where = ref({})
//loading
const loading=ref(false)
//选中的对象
const selectItems = ref([])

/**
 * 配置选择项目
 */
const rowSelection = ref({
  checkStrictly: false,
  //选项类型
  type:'select',

  onSelect: (record, selected, selectedRows) => {
    changeSelect(record,selected)
    //console.log('onSelect',record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    if(selected){
      selectItems.value = selectedRows
      emits('select',selectedRows)
    }else{
      selectItems.value = []
      emits('select',[])
    }

    //console.log('onSelectAll',selected, selectedRows, changeRows);
  },
});

/**
 * 处理选择行的回调函数
 * @param record
 * @param selected
 */
const changeSelect = (record, selected) => {
  let list = JSON.parse(JSON.stringify(selectItems.value))
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
  selectItems.value = list
  emits('select',list)
};

/**
 * 加载数据
 */
const loadData=(arg=null)=>{

  if(typeof props.dataSource==='function'){
    //第一页
    if (arg === 1) {
      ipage.value.current = 1
    }
    //分页处理
    let params = {
      pageNo : ipage.value.current,
      pageSize : ipage.value.pageSize
    }

    params = Object.assign(where.value,params)
    loading.value =true
    props.dataSource(params).then((res)=>{
      data.value = res.rows
      ipage.value.total = res.totalRows

    }).finally(() => {
      loading.value = false
    });
  }
}

/**
 * 搜索
 * @param where
 */
const searchData = (param)=>{
  where.value = param
  loadData()
}
/**
 * 分页操作
 */
const handlePageChange=(current, size)=>{
  ipage.value.current=current
  ipage.value.pageSize=size
  loadData()
}
/**
 * 页数改变
 */
const handlePageSizeChange=(current, size)=>{
  ipage.value.current=current
  ipage.value.pageSize=size
  loadData()
}

//默认加载数据
loadData()

defineExpose({
  loadData,
  searchData
})


</script>
<style lang="less" scoped>
.j-pro-table{
  .control-box{
    width: 100%;
    padding-bottom: 20px;
    .left-action{
      text-align: left;
    }
    .right-action{
      text-align: right;
    }

  }
  .card-box{
    width: 100%;
  }
  .j-table-select-row{
    height: 32px;
    line-height: 32px;
    text-align: left;
  }
  .j-table-page{
    height: 32px;
    line-height: 32px;
    text-align: right;
  }

}
</style>
