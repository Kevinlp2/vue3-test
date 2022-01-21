<template>
  <div class="navbar flex flex-middle">
    <div class="navBarItem">
      <el-icon>
        <expand/>
      </el-icon>
    </div>
    <div class="navBarItem">
      <el-tag
              :key="tag"
              class=" margin-r-5"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        首页
      </el-tag>
      <el-tag
              :key="tag"
              class="margin-r-5"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
        首页1
      </el-tag>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    created(){
      console.log('vuex',this.$store);
    }
  }
</script>

<style scoped lang="less">
.navbar{
  width: 100%;
  height: 100%;
  padding: 0 5px;
  .navBarItem{
    cursor: pointer;
    margin-right: 5px;
  }
}
</style>