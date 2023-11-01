import JArea from './JArea'
import JDate from './JDate'
import JDownload from './JDownload'
import JInput from './JInput'
import JLable from './JLable'
import JModal from './JModal'
import JEmpty from './JEmpty'
import JLayout from './JLayout'
import JTree from './JTree'

const allComponents={
  ...JArea,
  ...JDate,
  ...JDownload,
  ...JInput,
  ...JLable,
  ...JModal,
  ...JEmpty,
  ...JLayout,
  ...JTree
}

export default {
  install(app) {
    for (const key in allComponents) {
      app.component(key, allComponents[key]);
    }
  }
}
