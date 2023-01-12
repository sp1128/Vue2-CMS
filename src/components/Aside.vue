<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :index="item.name"
      :key="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.label"
      :key="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="subitem in item.children"
          :index="subitem.path"
          :key="subitem.path"
          @click="clickPage(subitem)"
          >{{ subitem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath);
    },
    //点击菜单
    clickMenu(item) {
      //当页面的路由与我们跳转的路由不一样的时候才能进行跳转
      if (
        this.$route.path.indexOf(item.path) === -1 &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu", item);
    },
    //点击page
    clickPage(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
    },
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menuData(){
      if(jsCookie.get('menu')){
        return JSON.parse(jsCookie.get('menu')) || this.$store.state.tab.menu
      }
    }
  },
};
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
h3 {
  color: #fff;
  text-align: center;
  font-size: 16px;
  line-height: 48px;
  font-weight: 400;
}
</style>