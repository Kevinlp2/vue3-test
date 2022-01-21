// import { getFirstNode } from "@/utils/global";
import allMenu from "@/router/index"
let firstToSecond = {}
if (sessionStorage.getItem('firstToSecond') && sessionStorage.getItem('firstToSecond') !== "[object Object]") {
    firstToSecond = JSON.parse(sessionStorage.getItem('firstToSecond'))
}
export default {
    // namespaced: true,
    state: {
        // cacheComponents:["archiveSearch","companyArchive","graphVis","taskManage","modelManage","planManage",""], //配置需要缓存的菜单
        unCacheComponents:["graphVis","v3TaskDrafts","editFlow"], //配置不需要缓存的菜单
        options: sessionStorage.getItem('tabList') ? JSON.parse(sessionStorage.getItem('tabList')) : [],
        activeUrl: sessionStorage.getItem('activeUrl') || '',   //Tab的 url 作为唯一值
        collapse: false,   // 导航栏收缩状态
        firstMenu: sessionStorage.getItem('firstMenu') ? JSON.parse(sessionStorage.getItem('firstMenu')) :[],  // 头部一级菜单
        navTree: [],  // 导航菜单树
        firstMenuId: sessionStorage.getItem("firstMenuId") || "",
        firstToSecond: firstToSecond //回显该菜单离开时的页面
    },
    getters: {
        curOption(state){
            return state.options.find(x=>x.route===state.activeUrl)
        },
        cachesList(state){
            let cachesList = state.options.filter(option => option.belong == state.firstMenuId && !state.unCacheComponents.includes(option.name))
            let cachesNameList = cachesList.map(x=>x.name)
            return Array.from(new Set(cachesNameList))
        }
    },
    //this.commit复用
    mutations: {
        //浏览器前进后退事件
        historyChange: function (state, to) {
            let obj = state.options.find(x => x.route === to.path)
            if (!_.isEmpty(obj)) {
                this.commit("setFirstMenuId", obj.belong)
                this.commit("setActiveUrl",obj.route)
            } else {
                //todo 在菜单集合里面找
            }
        },
        //更新params参数
        updateParams: function (state, newParams){
            let curOption = state.options.find(x=>x.route===state.activeUrl)
            curOption.params = {...curOption.params,...newParams}
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },
        //更新options参数
        updateOptions: function (state, newOptions){
            let curOption = state.options.find(x=>x.route===state.activeUrl)
            curOption = {...curOption,...newOptions}
            let curIndex = state.options.findIndex(x=>x.route===state.activeUrl)
            state.options.splice(curIndex,1,curOption)
            this.commit("setActiveUrl",curOption.route)
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },
        // 添加tabs
        addTab: function (state, data) {
            let fullMenu = allMenu.find(x=>x.name == data.name)
            if(fullMenu){
                data = {...fullMenu,...data}
            }
            let tabOption = {
                closable: (data.closable === undefined)?true:data.closable,
                label: data.menuName,
                name: data.name,
                route: data.menuUrl || '/common/404',
                icon: data.menuIcon,
                belong: state.firstMenuId, //所属一级菜单
                redirectMenuName: data.redirectMenuName,  //关闭后重定向的菜单
                showTip: data.showTip,   //是否需要关闭提示
                params: data.params || {}          //额外参数
            }
            let obj = state.options.find(x => x.route === tabOption.route && x.belong == tabOption.belong)
            if (_.isEmpty(obj)) {
                state.options.push(tabOption)
            }else{
                if(obj.label !== data.menuName){
                    obj.label = data.menuName
                }
                //替换options的params
                obj.params = data.params || {} 
            }
            this.commit("setActiveUrl",tabOption.route)
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },
        // 删除tabs  支持{name:"xx"} || "v3/index"
        deleteTab: function (state, route) {
            let index = 0
            if(typeof route === "string"){
                index = state.options.findIndex(x => x.route === route)
            }else{
                index = state.options.findIndex(x => x.name === route.name)
            }
            let obj = state.options[index]
            let curViewOptionArr = state.options.filter(option => option.belong == state.firstMenuId)
            if (!_.isEmpty(obj) && obj.closable && curViewOptionArr.length > 1) {
                state.options.splice(index, 1)
                if(obj.route === state.activeUrl){
                    let newCurViewOptionArr = state.options.filter(option => option.belong == state.firstMenuId)
                    const curTab = newCurViewOptionArr[newCurViewOptionArr.length - 1]
                    this.commit("setActiveUrl",curTab.route)
                }
            }
            sessionStorage.setItem('activeUrl', state.activeUrl)
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },
        // 设置当前激活的tab
        setActiveUrl: function (state, route) {
            state.activeUrl = route;
            state.firstToSecond[state.firstMenuId] = state.activeUrl
            sessionStorage.setItem('firstToSecond', JSON.stringify(state.firstToSecond))
            sessionStorage.setItem('activeUrl', state.activeUrl)
        },
        resetTab: function (state) {
            state.options = [];
            state.activeUrl = '';
            state.firstToSecond = {}
            sessionStorage.setItem('firstToSecond', {})
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
            sessionStorage.setItem('activeUrl', state.activeUrl)
        },
        closeTab: function (state){
            this.commit("deleteTab", state.activeUrl)
        },
        closeOther: function (state, route) {
            // debugger;
            state.options = state.options.filter(item => !item.closable || item.belong != state.firstMenuId || item.route == route)
            this.commit("setActiveUrl",route)
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },
        closeAll: function (state) {
            state.options = state.options.filter(item => !item.closable || item.belong != state.firstMenuId)
            let curViewOptionArr = state.options.filter(option => option.belong == state.firstMenuId)
            this.commit("setActiveUrl",curViewOptionArr.length > 0 ? curViewOptionArr[0].route : "")
            sessionStorage.setItem('tabList', JSON.stringify(state.options))
        },

        setCollapse: function (state, status) {  // 改变收缩状态
            state.collapse = status
        },
        setNavTree: function (state, navTree) {  // 设置导航菜单树
            state.navTree = navTree;
        },
        setFirstMenu: function (state, firstMenu) {  // 设置一级菜单
            state.firstMenu = firstMenu;
            sessionStorage.setItem("firstMenu", JSON.stringify(firstMenu));
            // debugger;
            state.firstMenuId = sessionStorage.getItem("firstMenuId") || firstMenu[0]?.menuId || "";
            let curFirstMenu = firstMenu.find(item => item.menuId == state.firstMenuId)
            state.navTree = curFirstMenu?.children || []
            if (_.isEmpty(state.activeUrl) && firstMenu.length > 0) {
                if (curFirstMenu?.menuUrl) {
                    //有首页打开首页
                    this.commit("addTab", curFirstMenu)
                } else {
                    //没有首页打开列表第一个菜单
                    // let firstNode = getFirstNode(state.navTree);
                    this.commit("addTab", firstNode)
                }
            }

        },
        setFirstMenuId: function (state, firstMenuId) {  // 设置一级菜单
            state.firstMenuId = firstMenuId;
            sessionStorage.setItem("firstMenuId", firstMenuId);
            state.navTree = state.firstMenu.find(item => item.menuId == state.firstMenuId)?.children || []
        },
    },
    actions: {
    }
}