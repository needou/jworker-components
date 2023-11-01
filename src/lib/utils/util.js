/**
 * 公共方法
 */
function classNames() {
  let classes = []

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i]
    if (!arg) continue

    let argType = typeof arg

    if (argType === 'string' || argType === 'number') {
      classes.push(arg)
    } else if (Array.isArray(arg) && arg.length) {
      let inner = classNames.apply(null, arg)
      if (inner) {
        classes.push(inner)
      }
    } else if (argType === 'object') {
      for (let key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          classes.push(key)
        }
      }
    }
  }
  return classes.join(' ')
}

const camelizeRE = /-(\w)/g

function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

function objectCamelize(obj) {
  let res = {}
  Object.keys(obj).forEach(k => (res[camelize(k)] = obj[k]))
  return res
}

function parseStyleText(cssText = '', camel) {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim()
        res[k] = tmp[1].trim()
      }
    }
  })
  return res
}

export function getClass(ele) {
  let data = {}
  if (ele && ele.data) {
    data = ele.data
  }
  const tempCls = data.class || {}
  const staticClass = data.staticClass
  let cls = {}
  staticClass &&
  staticClass.split(' ').forEach(c => {
    cls[c.trim()] = true
  })
  if (typeof tempCls === 'string') {
    tempCls.split(' ').forEach(c => {
      cls[c.trim()] = true
    })
  } else if (Array.isArray(tempCls)) {
    classNames(tempCls)
      .split(' ')
      .forEach(c => {
        cls[c.trim()] = true
      })
  } else {
    cls = { ...cls, ...tempCls }
  }
  return cls
}

export function getStyle(ele, camel) {

  getClass(ele)

  let data = {}
  if (ele.data) {
    data = ele.data
  }

  // update-begin-author:sunjianlei date:20200303 for: style 和 staticStyle 可以共存
  let style = data.style || {}
  let staticStyle = data.staticStyle
  staticStyle = staticStyle ? objectCamelize(data.staticStyle) : {}
  // update-end-author:sunjianlei date:20200303 for: style 和 staticStyle 可以共存

  if (typeof style === 'string') {
    style = parseStyleText(style, camel)
  } else if (camel && style) {
    // 驼峰化
    style = objectCamelize(style)
  }
  return { ...staticStyle, ...style }
}
/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  let event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}


/**
 * 转为人民币大写
 * @param money
 * @returns {string}
 */
export function convertCurrency(money) {
  //汉字的数字
  let cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  let cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  let cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  let cnInteger = '整';
  //整型完以后的单位
  let cnIntLast = '元';
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = '';
  //分离金额后用的数组，预定义
  let parts;
  // 传入的参数为空情况
  if(money == '') {
    return '';
  }
  money = parseFloat(money)
  if(money >= maxNum){
    return ''
  }
  // 传入的参数为0情况
  if(money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr
  }
  // 转为字符串
  money = money.toString();
  // indexOf 检测某字符在字符串中首次出现的位置 返回索引值（从0 开始） -1 代表无
  if(money.indexOf('.') == -1){
    integerNum = money;
    decimalNum = ''
  }else{
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0,4);
  }
  //转换整数部分
  if(parseInt(integerNum,10) > 0){
    let zeroCount  = 0;
    let IntLen = integerNum.length
    for(let i = 0; i < IntLen; i++){
      let n = integerNum.substr(i,1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if( n == '0'){
        zeroCount ++ ;
      }else{
        if(zeroCount > 0){
          chineseStr += cnNums[0]
        }
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if(m == 0 && zeroCount < 4){
        chineseStr += cnIntUnits[q];
      }
    }
    // 最后+ 元
    chineseStr += cnIntLast;
  }
  // 转换小数部分
  if(decimalNum != ''){
    let decLen = decimalNum.length;
    for(let i = 0; i <decLen; i++){
      let n = decimalNum.substr(i,1);
      if(n != '0'){
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if(chineseStr == ''){
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  }else if(decimalNum == ''){
    chineseStr += cnInteger;
  }

  return chineseStr
}
