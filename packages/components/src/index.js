//导出组件
import Antd from './Antd'
import JArea from './JArea'
import JDate from './JDate'
import JDownload from './JDownload'
import JInput from './JInput'
import JLable from './JLable'
import JModal from './JModal'
import JEmpty from './JEmpty'
import JLayout from './JLayout'
import JTree from './JTree'
import JDict from './JDict'
import JTag from './JTag'
import "./style/index.less"

const allComponents={
  ...Antd,
  ...JArea,
  ...JDate,
  ...JDownload,
  ...JInput,
  ...JLable,
  ...JModal,
  ...JEmpty,
  ...JLayout,
  ...JTree,
  ...JDict,
  ...JTag
}

export default {
  install(app) {
    for (const key in allComponents) {
      app.component(key, allComponents[key]);
    }
  }
}

export {
  Antd,
  JArea,
  JDate,
  JDownload,
  JInput,
  JLable,
  JModal,
  JEmpty,
  JLayout,
  JTree,
  JDict
}