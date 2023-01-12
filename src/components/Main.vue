<template>
  <div class="main-container">
    <el-container>
      <el-aside width="auto">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <Tag></Tag>
        <el-main style="padding-top:10px">
          <!-- 路由出口 -->
            <keep-alive include="Home">
              <router-view></router-view>
            </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Tag from '@/components/Tag.vue'
export default {
  components: {
    Aside,
    Header,
    Tag
  },
};
</script>

<style lang="less">
.main-container{
  height: 100%;
}
.el-container{
  height: 100%;
}
.el-header {
  padding: 0;
}
.el-menu{
  border: 0;
}
.el-menu-vertical-demo{
  height: 100%;
}
</style>