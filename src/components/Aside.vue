<template>
  <div class="aside">
    <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose">
      <el-menu-item index="1" @click="$router.push('/')">
        <el-icon><add-location /></el-icon>
        <template #title>
          Echats地图
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/animate')">
        <el-icon><film /></el-icon>
        <template #title>
          Animate动画
        </template>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/test')">
        <el-icon><eleme-filled /></el-icon>
        <template #title>
          测试页面
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      isCollapse:false
    }
  },
  props: {

  }
}
</script>

<style scoped lang="less">
.aside{
  width: 100%;
  height:100%;
  .el-icon{
    cursor: pointer;
  }
  .el-menu{
    height:100% ;

  }
}
</style>
