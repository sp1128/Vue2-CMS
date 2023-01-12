<template>
  <div class="mall-container">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form ref="form" :model="form" :inline="true" :rules="rules">
        <el-form-item label="型号" style="margin-right: 53px" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd" size="medium"
        >+ 新增</el-button
      >
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input
            placeholder="请输入姓名"
            v-model="userForm.name"
            @keyup.enter.native="selectName"
            @input="selectName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectName">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      title: "",
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请填写地址" }],
      },
      tableData: [],
      modadlType: 0, //0 表示新增 1 表示编辑
      total: 0, //当前的总条数 默认为0
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  components: {},
  methods:{
    handleClose() {
      this.dialogVisible = false;
      this.form = {};
      this.$refs.form.resetFields();
    },
    cancel() {
      this.handleClose();
    },
    // 编辑数据
    handleEdit(row) {
      this.modadlType = 1;
      // 注意需要对当前行数据进行深拷贝,否则会出错
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid === true) {
          //后续对表单数据的处理
          if (this.modadlType === 0) {
            addUser(this.form).then(() => {
              this.$message({
                message: "新增成功",
                type: "success",
              });
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.getList();
            });
          }
          //关闭弹窗
          this.handleClose();
        }
      });
    },
        // 新增按钮触发的函数
        handleAdd() {
      this.modadlType = 0;
      this.dialogVisible = true;
    },
    // 根据姓名查询数据
    selectName() {
      this.getList();
    },
  }
};
</script>

<style lang="less">
.mall-container {
  width: 100%;
  height: 100%;
  .manage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>