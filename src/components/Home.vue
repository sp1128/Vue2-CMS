<template>
  <div>
    <el-row>
      <el-col :span="9">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/images/user.png" alt="" />
            <div class="user-info">
              <p class="name">{{ id }}</p>
              <p class="access">{{ id === "admin" ? "超级管理员" : "用户" }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间:<span>2021-7-19</span></p>
            <p>上次登录地点:<span>江西</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px; height: 475px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"
              :key="key"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="deic">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 280px; margin-left: 10px">
          <!-- 折线图 -->
          <div ref="echarts1" style="height: 280px; width: 700px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 277px; width: 42%; margin-left: 10px">
            <!-- 柱状图 -->
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 277px; width: 55%">
            <!-- 饼状图 -->
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
import tab from "@/store/tab";
import jsCookie from "js-cookie";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "型号",
        todayBuy: "今日成交",
        monthBuy: "月成交",
        totalBuy: "总成交",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      id: jsCookie.get("name"),
    };
  },
  mounted() {
    getData().then((data) => {
      const { tableData } = data.data.data;
      this.tableData = tableData;
      const myChart = new echarts.init(this.$refs.echarts1);
      var echarts10ption = {};
      //处理数据xAxis
      const { orderData, userData, videoData } = data.data.data;
      const xAxis = Object.keys(orderData.data[0]);
      const xAxisData = {
        data: xAxis,
      };
      echarts10ption.xAxis = xAxisData;
      echarts10ption.yAxis = {};
      echarts10ption.legend = xAxisData;
      echarts10ption.series = [];
      xAxis.forEach((key) => {
        echarts10ption.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      myChart.setOption(echarts10ption);

      //柱状图
      const echarts2 = new echarts.init(this.$refs.echarts2);
      const echarts20ption = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      echarts2.setOption(echarts20ption);

      const echarts3 = new echarts.init(this.$refs.echarts3);
      const echarts30ption = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            data: videoData,
            type: "pie",
          },
        ],
      };
      echarts3.setOption(echarts30ption);
    });
    this.login();
  },
  created() {
    tab.state.tabsList.splice(0);
  },
  methods: {
    login() {
      if (jsCookie.get("name")) {
        this.$message({
          message:
            "登陆成功,欢迎您亲爱的" +
            `${jsCookie.get("name") === "admin" ? "超级管理员" : "用户"}`,
          type: "success",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 10px;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    color: white;
    text-align: center;
    line-height: 80px;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .deic {
      color: #999999;
      font-size: 14px;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
/deep/.box-card {
  width: 381px;
  display: flex;
  justify-content: center;
  height: 286px;
  position: relative;
  top: 0;
  left: 0;
  transform: none;
}
</style>