<template>
  <div class="common-table">
    <el-table :data="tableData" style="width: 100%" height="90%" stripe>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="tableData" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <slot name="page"></slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  props: {
    tableData: {
      type: Array,
      default: [],
    }
  },
  methods: {
  },
};
</script>

<style lang="less">
</style>