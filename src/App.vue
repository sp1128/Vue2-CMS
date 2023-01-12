<template>
  <div id="app">
    <keep-alive include="Login">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
html,
body,
p {
  margin: 0;
  padding: 0;
  height: 100%;
  #app{
    height: 100%;
  }
  h3{
    margin: 0;
    padding: 0;
  }
}
</style>
