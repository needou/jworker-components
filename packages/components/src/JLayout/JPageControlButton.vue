<template>
  <div class="j-page-control-button">
    <a-space :size="18">
      <a-tooltip :title="('刷新')">
        <span>
          <ReloadOutlined class="ico-size" @click="reloadData()" />
        </span>
      </a-tooltip>
      <a-dropdown trigger="click">
        <a-tooltip @click.prevent>
          <template #title>{{ ('密度') }}</template>
          <ColumnHeightOutlined class="ico-size" />
        </a-tooltip>
        <template #overlay>
          <ul class="j-page-control-button-size-list">
            <li :class="{active:size=='small'}">
              <a href="javascript:;" @click="handleChangeSize('small')">{{ ('紧凑') }}</a>
            </li>
            <li :class="{active:size=='default'}">
              <a href="javascript:;" @click="handleChangeSize('default')">{{ ('默认') }}</a>
            </li>
            <li :class="{active:size=='middle'}">
              <a href="javascript:;" @click="handleChangeSize('middle')">{{ ('中等') }}</a>
            </li>
          </ul>
        </template>
      </a-dropdown>
      <a-popover trigger="click" placement="topLeft" :title="('显示栏位')">
        <template #content>
          <div class="j-page-control-button-box">
            <p class="j-page-control-button-item"
               v-for="(item, n) in tableColumns"
               :key="n">
              <a-checkbox
                class="column-checkbox"
                :defaultChecked="item.checked"
                @change="(e) => handleSelectColumn(item, e)"
              >
                {{ item.title }}
              </a-checkbox>
            </p>
          </div>
        </template>
        <div>
          <a-tooltip>
            <template #title>{{ ('列设置') }}</template>
            <SettingOutlined class="ico-size" />
          </a-tooltip>
        </div>
      </a-popover>
      <a-tooltip :title="('全屏')">
        <span>
          <FullscreenOutlined v-if="!fullScreen" class="ico-size" @click="changeScreen(true)" />
          <FullscreenExitOutlined v-else class="ico-size" @click="changeScreen(false)" />
        </span>
      </a-tooltip>
      <div class="change-show-type" v-if="enableType">
        <div class="item" :class="{active:type=='list'}" @click="changeType('list')">
          <bars-outlined class="ico-size"/>
        </div>
        <div class="item" :class="{active:type=='card'}" @click="changeType('card')">
          <appstore-outlined class="ico-size"/>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  defineProps,
  defineEmits,
  watch
} from "vue";


const props = defineProps({
  columns: {
    type: [Array, null],
    default: null,
  },
  type: {
    type: String,
    default: "list",
  },
  enableType: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: "default",
  },
  reloadList: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(['update:columns','update:size','update:type']);

const showType=ref('');
const firstValue = ref(true);
const fullScreen = ref(false);
const tableColumns = ref([]);

const reloadData = () => {
  if (props.reloadList) {
    props.reloadList();
  }
};

/**
 * 初始化
 * @param newVal
 */
const init = (newVal) => {
  let columns = [];
  if (newVal != null && newVal.length > 0) {
    for (let i = 0; i < newVal.length; i++) {
      let item = newVal[i];
      item.checked = true;
      columns.push(item);
    }
  }
  firstValue.value = false;
  //console.log('columns',columns)
  tableColumns.value = columns;
};

/**
 * 切换栏显示
 * @param item
 * @param e
 */
const handleSelectColumn = (item, e) => {
  let check = e.target.checked;
  let columns = JSON.parse(JSON.stringify(tableColumns.value));
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].dataIndex == item.dataIndex) {
      columns[i].checked = check;
      break;
    }
  }
  tableColumns.value = columns;
  changeColumns(columns);
};

/**
 * 切换列显示
 * @param columns
 */
const changeColumns = (columns) => {
  let cls = [];
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].checked) {
      cls.push(columns[i]);
    }
  }
  emit("update:columns", cls);
};

/**
 * 全屏切换
 * @param value
 */
const changeScreen = (value) => {
  fullScreen.value = value;
  if (value) {
    const obj = document.querySelector(".j-pro-table");
    if (obj) {
      obj.classList.add("j-pro-table-fullscreen");
    }
  } else {
    const obj = document.querySelector(".j-pro-table");
    if (obj) {
      obj.classList.remove("j-pro-table-fullscreen");
    }
  }
};

/**
 * 切换尺寸
 * @param type
 */
const handleChangeSize = (type) => {
  emit("update:size", type);
};

/**
 * 切换分类
 * @param type
 */
const changeType=(type)=>{
  emit("update:type", type);
}

onMounted(() => {
  watch(
    () => props.columns,
    (newVal) => {
      if (firstValue.value && newVal != null) {
        init(newVal);
      }
    },
    { immediate: true, deep: true }
  );
});
</script>

<style lang="less">
.j-pro-table-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
  background-color: var(--component-background);
  z-index: 999;
}
</style>

<style lang="less" scoped>
.j-page-control-button {
  position: relative;

  .j-page-control-button-box {
    max-height: 300px;
    overflow-y: auto;
    .j-page-control-button-item {
      margin: 0;
      padding: 3px 0;
    }
  }

  .ico-size{
    font-size: 18px;
    color:#575757;
  }
  .change-show-type{
    display: flex;
    flex-direction: row;
    border: 1px solid #DBDBDB;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    overflow: hidden;
    .item{
      padding: 2px 5px;
      cursor: pointer;
      .ico-size{
        color: #DBDBDB;
        font-size: 16px;
      }
    }
    .active{
      border: 1px solid var(--primary-color);
      .ico-size{
        color: var(--primary-color);
      }
    }
  }
  .column-checkbox{
    width: 160px;
    margin-left: 0;
    margin-boom: 10px
  }

}

.j-page-control-button-size-list{
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  width: 70px;
  box-shadow:  0 0 5px 1px #d0d0d0;
  border-radius: 3px;
  li{
    padding: 10px;
    a{
      color:var(--text-color);
      &:hover{
        color:var(--primary-color);
      }
    }
  }
  .active{
    background-color: #f0f0f0;
  }
}


</style>
