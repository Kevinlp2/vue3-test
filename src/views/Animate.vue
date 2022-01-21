<template>
  <div class="box">
    <h2 style="width: 100%;text-align: center;margin-bottom: 10px">Animate.css动画演示 <a href="https://www.dowebok.com/demo/2014/98/">更多动画</a></h2>
    <ul ref="animateList">
      <li  @mouseenter="enter(item,$event.target)" @mouseleave="leave(item,$event.target)"  v-for="(item,index) in list" :key="index"  class="animate__animated" >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "animate",
    data(){
      return{
        list:[
          'bounce','flash','pulse','rubberBand','shake','swing','tada','wobble',
          'bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp',
          'fadeIn','flip','lightSpeedIn'
        ]
      }
    },
    mounted(){
      let _self = this;

      // _self.list.forEach(item=>{
      //
      // })

    },
    methods:{
      enter(val,ele){
        let _self = this;
        ele.classList.add('animate__'+val)

      },
      leave(val,ele){
        let _self = this;
        ele.classList.remove('animate__'+val)
      }
    }
  }
</script>

<style scoped lang="less">
.box{
  width: 100%;
  height: 100%;
  /*padding: 25px;*/
  box-sizing: border-box;
  ul{
    width: 100%;
    height: calc(100% - 20px);
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 20px 20px;

    li{
      /*width: 50px;*/
      height: 100%;
      background-color: sandybrown;
      color: #fff;
      display: grid;
      justify-items: center ;
      align-items: center ;
      cursor: pointer;

    }
  }
}
</style>