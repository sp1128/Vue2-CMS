<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ path: item.path }"
          v-for="item in tags"
          :key="item.path"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="../assets/images/user.png" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定退出登录吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qtback">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import jsCookie from "js-cookie";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    back() {
      this.dialogVisible = true;
    },
    qtback() {
      jsCookie.remove("token");
      jsCookie.remove("menu");
      this.$router.push("/login/1");
    },
    handleClick(command) {
      if (command === "cancel") {
        this.dialogVisible = true;
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  }
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>