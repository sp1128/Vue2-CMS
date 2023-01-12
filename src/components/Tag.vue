<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.label"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      :closable="item.name !== 'home'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="small"
      >{{ item.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Tag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    //点击tag跳转
    changeMenu(item) {
      if (item.name !== this.$route.name) {
        this.$router.push({ name: item.name });
      }
    },
    //点击tag删除
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tags.length;
      //删除之后的跳转
      if (item.name !== this.$route.name) {
        return;
      }
      //表示的是删除的最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less">
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>