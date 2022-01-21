/**
 * 全局常量、方法封装模块
 */

// 后台管理系统服务器地址
export const baseUrl = JSON.stringify(process.env)


export function listToTree(arr, parentId, props = {
  id: 'menuId',
  pid: 'menuPid'
}) {
  let temp = []
  let treeArr = arr
  treeArr.forEach((item, index) => {
    if (item[props.pid] == parentId) {
      if (listToTree(treeArr, treeArr[index][props.id], props).length > 0) {
        // 递归调用此函数
        treeArr[index].children = listToTree(treeArr, treeArr[index][props.id], props)
      }
      temp.push(treeArr[index])
    }
  })
  return temp
}
export function _orgToTree(arr, parentOrg) {
  let temp = []
  let treeArr = arr
  treeArr.forEach((item, index) => {
    var len = item.orgCode.length - parentOrg.length
    if (item.orgCode.includes(parentOrg) && (len == 5 || len == 2 || len == 1)) {
      if (_orgToTree(treeArr, treeArr[index].orgCode).length > 0) {
        // 递归调用此函数
        treeArr[index].children = _orgToTree(treeArr, treeArr[index].orgCode)
      }
      temp.push(treeArr[index])
    }
  })
  return temp
}
export function orgToTree(arr, parentOrg) {
  let root = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].orgCode == parentOrg) {
      root = arr[i]
      break
    }
  }
  root.children = _orgToTree(arr, parentOrg)
  return [root]
}

export function mapToArray(map) {
  let list = []
  map.forEach(item => {
    for (const key in item) {
      let obj = {
        name: key,
        ...item[key]
      }
      list.push(obj)
    }
  })
  return list
}
//获取树形菜单的第一个节点
export function getFirstNode(tree) {
  if (tree[0].children) {
    return getFirstNode(tree[0].children)
  } else {
    return tree[0]
  }
}
//获取需求树形菜单项的children
export function getChildren(item, props = ['dyOrgTypeList', 'dyOrgInfoList', 'dyObjTypeList', 'dyObjInfoList']) {
  // var props = ['dyOrgTypeList', 'dyOrgInfoList', 'dyObjTypeList', 'dyObjInfoList']
  for (let i = 0; i < props.length; i++) {
    if (item[props[i]] && item[props[i]].length > 0) {
      return item[props[i]]
    }
  }
}

//获取需求树形菜单的第一个需求节点
export function getFirstNeed(tree) {
  if (tree.length === 0) {
    return []
  }
  if (tree[0].dyObjInfoList && tree[0].dyObjInfoList.length > 0) {
    return tree[0].dyObjInfoList[0]
  }
  let children = getChildren(tree[0])
  if (children) {
    return getFirstNeed(children)
  } else {
    return tree[0]
  }
}
// 单位要素下 方案确认
export function getFirstNeed2(tree) {

  if (tree.length === 0) {
    return []
  }
  if (tree[0].dyObjInfoList && tree[0].dyObjInfoList.length > 0) {
    return tree[0].dyObjInfoList[0]
  }

  let children = getChildren(tree[0], ['dyObjTypeList'])
  if (children) {
    return getFirstNeed2(children)
  } else {
    return tree[0]
  }
}
//获取需求树形菜单的第一个企业节点
export function getFirstOrg(tree) {
  if (tree.length === 0) {
    return []
  }
  if (tree[0].dyOrgInfoList && tree[0].dyOrgInfoList.length > 0) {
    return tree[0].dyOrgInfoList[0]
  }
  let children = getChildren(tree[0])
  if (children) {
    return getFirstOrg(children)
  } else {
    return tree[0]
  }
}
//通过name获取树形菜单的某个节点
export function getNodeByName(tree, name, prop = 'menuName') {
  var result = null
  if (!tree) {
    // return; 中断执行
    return
  }
  for (var i in tree) {
    var item = tree[i]
    // 不能include
    if (item[prop] == name || name.includes(item[prop])) {
      result = item
      break
    } else if (item.children && item.children.length > 0) {
      result = getNodeByName(item.children, name, prop)
      if (result) {
        break
      }
    }
  }
  return result
}
//根据菜单id 找到其最上级父级菜单
export function getFirstMenuByMenuId(menuList, menuId) {
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].menuId == menuId) {
      let pid = menuList[i].menuPid
      if (pid == 0) {
        return menuList[i]
      } else {
        return getFirstMenuByMenuId(menuList, pid)
      }
    }
  }
}

//时间转化+8小时
export function getNowTime(time) {
  /**  解决IE不能兼容 +0000 时间格式的问题 **/
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    time = time.replace('+0000', 'Z')
  }
  var dateee = new Date(time).toJSON()
  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
  return date
}

//金额添加千位分隔符
export function toThousands(num) {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

//获取用户信息
export function getUserInfo() {
  let token = sessionStorage.getItem('token')
  if (token) {
    return JSON.parse(token)
    // if (process.env.NODE_ENV === 'production') {
    //     let Base64 = require("js-base64").Base64;
    //     let userinfo = JSON.parse(Base64.decode(token.split(".")[1])).user;
    //     return userinfo
    // } else {
    //     return JSON.parse(token)
    // }
  } else {
    return ''
  }
}

//将下划线换为驼峰
export function replaceUnderLine(val, char = '_') {
  const arr = val.split('')
  const index = arr.indexOf(char)
  if (index > -1) {
    arr.splice(index, 2, arr[index + 1].toUpperCase())
    val = arr.join('')
    val = replaceUnderLine(val)
  } else {
    val = arr.join('')
  }
  return val
}

export function downLoadXls(data, filename) {
  if (typeof window.chrome !== 'undefined') {
    // Chrome version
    var blob = new Blob([data])
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.url)
    link.remove()
  } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE version
    var blob = new Blob([data])
    window.navigator.msSaveBlob(blob, filename)
  } else {
    // Firefox version
    var file = new File([data], filename)
    window.open(URL.createObjectURL(file))
  }
}

export function downLoadBlobXls(data, filename) {
  if (typeof window.chrome !== 'undefined') {
    // Chrome version
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(link.url)
    link.remove()
  } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE version
    var blob = new Blob([data], {
      type: 'application/force-download'
    })
    window.navigator.msSaveBlob(blob, filename)
  } else {
    // Firefox version
    var file = new File([data], filename, {
      type: 'application/force-download'
    })
    window.open(URL.createObjectURL(file))
  }
}

//取出最小和最大经纬度赋值给X1、X2、Y1、Y2
export function getFitXY(points) {
  //X1、X2、Y1、Y2
  let x1 = points[0][0],
    x2 = points[0][0],
    y1 = points[0][1],
    y2 = points[0][1]
  points.forEach(point => {
    if (point[0] > x2) {
      x2 = point[0]
    }
    if (point[0] < x1) {
      x1 = point[0]
    }
    if (point[1] > y2) {
      y2 = point[1]
    }
    if (point[1] < y1) {
      y1 = point[1]
    }
  })
  return [x1, y1, x2, y2]
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function getUUID() {
  var Mock = require('mockjs')
  return Mock.Random.uuid().replace(/-/g, "");
}