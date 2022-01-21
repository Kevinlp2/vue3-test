<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="auto">
          <Aside/>
        </el-aside>
        <el-main>
          <div class="topMenu">

            <NavBar/>
          </div>
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Aside from '@/components/Aside'
  import NavBar from '@/components/NavBar'
  export default {
    name: 'App',
    components: {
      Aside,NavBar
    },
    created(){
    },
  }
</script>

<style scoped lang="less">
.common-layout{
  width: 100%;
  height: 100%;
  .el-container{
    width: 100%;
    height: 100%;
    .el-header{
      height: 40px;
      border-bottom: 1px solid #eee;
    }
    .el-main{
      padding: 0;
      .topMenu{
        height: 30px;
      }
      .content{
        height: calc(100% - 30px);
        padding: 15px;
      }
    }
  }
}
</style>
