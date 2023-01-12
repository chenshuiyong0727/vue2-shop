<template lang="html">
  <div class="login">
<!--    <v-header>-->
<!--      <h1 slot="title">商品详情</h1>-->
<!--    </v-header>-->
    <mt-header title="库存添加">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="dingdans_item" style=" margin-top: 12vw;" >
      <div class="dingdans_con">
        <div class="dingdans_con_left" style="margin-left: 14vw;" >
          <img v-bind:src="fileUrl + form.imgUrl" alt="" >
        </div>
        <div class="diangdans_con_right" style="font-size: 16px;">
          <div class="dingdans_con_right_top">
            货号：<strong class="color-danger">{{form.actNo}}</strong>
          </div>
        </div>
      </div>
    </div>
    <div style="
        border-bottom: 1vw solid #eee;
    font-size: 10px;
    padding-top: 2.4vw;
    padding-left: 4vw;
    background: #ffffff;" >
      <h5 style="font-size: 20px;margin-bottom: 8px;">选择尺码</h5>
      <div class="clearfix btm-distance">
        <div @click="addSizeHandle(item, index)"
              :class="activeIndex.includes(index) ? 'cityActive' : 'city'"
              v-for="(item, index) in form.sizeVoList" :key="item.id">{{item.size}} </div>
      </div>
    </div>
    <div style="
        border-bottom: 1vw solid #eee;
    font-size: 10px;
    padding-top: 2.4vw;
    padding-left: 4vw;
    padding-right: 3vw;
    background: #ffffff;" >
      <h5 style="font-size: 20px;margin-bottom: 8px;">选择尺码</h5>
      <div class="clearfix btm-distance">
        <el-table  style="margin-top: 20px" border :data="tableData">
<!--          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>-->
          <el-table-column align="center" prop="size" width="50" label="尺码"/>
          <el-table-column align="center" prop="inventory" label="库存">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1" type="number" v-model="scope.row.inventory"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="price" label="进价">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1"  type="number" v-model="scope.row.price"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dwPrice" label="售价">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1" type="number"  v-model="scope.row.dwPrice"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="60">
            <template scope="scope">
              <el-button type="text" @click="changeStatusDialog1(scope.row.sizeIndex,scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
          <!--          <el-table-column align="center" prop="dwPrice" label="售3价">-->
<!--            <template scope="scope">-->
<!--              <div class="input-box">-->
<!--                {{scope.row.price * scope.row.inventory }}-->
<!--&lt;!&ndash;                <input class="elInput1" type="number"  value="scope.row.dwPrice"></input>&ndash;&gt;-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="到手单价">-->
<!--&lt;!&ndash;            <template v-if="scope.row.dwPrice" slot-scope="scope">{{(scope.row.dwPrice - &ndash;&gt;-->
<!--&lt;!&ndash;              (scope.row.dwPrice * 0.075 + 38 + 8.5)) | numFilter}}&ndash;&gt;-->
<!--&lt;!&ndash;            </template>&ndash;&gt;-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="预计利润">-->
<!--            <template v-if="scope.row.dwPrice" slot-scope="scope">{{(scope.row.dwPrice - -->
<!--              (scope.row.dwPrice * 0.075 + 38 + 8.5) - scope.row.price - 10) | numFilter}}-->
<!--            </template>-->
<!--          </el-table-column>-->
          <!--          <el-table-column type="selection" width="55"></el-table-column>-->
<!--          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>-->
<!--          <el-table-column align="center" prop="size" label="尺码"/>-->
<!--          <el-table-column align="center" prop="inventory" label="库存">-->
<!--            <template scope="scope">-->
<!--              <div class="input-box">-->
<!--                <el-input v-input-validation size="small" v-model="scope.row.inventory"></el-input>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="price" label="入库价">-->
<!--            <template scope="scope">-->
<!--              <div class="input-box">-->
<!--                <el-input size="small" v-model="scope.row.price"></el-input>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="总入库价">-->
<!--            <template v-if="scope.row.price && scope.row.inventory" slot-scope="scope">-->
<!--              {{scope.row.price * scope.row.inventory }}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="dwPrice" label="得物价">-->
<!--            <template scope="scope">-->
<!--              <div class="input-box">-->
<!--                <el-input size="small" v-model="scope.row.dwPrice"></el-input>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="手续费">-->
<!--            <template v-if="scope.row.dwPrice" slot-scope="scope">{{(scope.row.dwPrice * 0.075 + 38 +-->
<!--              8.5) | numFilter}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="到手单价">-->
<!--            <template v-if="scope.row.dwPrice" slot-scope="scope">{{(scope.row.dwPrice - -->
<!--              (scope.row.dwPrice * 0.075 + 38 + 8.5)) | numFilter}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column align="center" prop="" label="预计利润">-->
<!--            <template v-if="scope.row.dwPrice" slot-scope="scope">{{(scope.row.dwPrice - -->
<!--              (scope.row.dwPrice * 0.075 + 38 + 8.5) - scope.row.price - 10) | numFilter}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--          <el-table-column fixed="right" align="center" label="操作" width="60">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button type="text" @click="goDel(scope.row.sizeIndex,scope.row)">删除-->
<!--              </el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="查看详情">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 16px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="goDel" style="font-size: 16px">移除</mt-button>
        </div>
      </mt-header>
      <section style="height: 80vw;width: 80vw">
        <mt-field label="尺码" style="margin-top: 11vw;"  v-model="orderData1.size" :readonly="true"></mt-field>
        <mt-field label="库存" v-model="orderData1.inventory" :readonly="true"></mt-field>
        <mt-field label="进价" v-model="orderData1.price" :readonly="true"></mt-field>
        <mt-field label="售价" v-model="orderData1.dwPrice" :readonly="true"></mt-field>
        <mt-field label="手续费" :readonly="true" v-model="orderData1.poundage"></mt-field>
        <mt-field label="到手价" :readonly="true" v-model="orderData1.theirPrice"></mt-field>
        <mt-field label="利润" :readonly="true" v-model="orderData1.profits"></mt-field>
      </section>
    </mt-popup>
    <div style="    margin-left: 20vw;
    margin-top: 20px;">
      <mt-button style="bottom: 10px"
        type="primary"
        @click="goAdd">提交</mt-button>
      <mt-button style="bottom: 10px"
        @click="$router.go(-1)">取消</mt-button>
      <mt-button style="bottom: 10px"
        type="primary"
        @click="gotoIndex">回到首页</mt-button>
    </div>
  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { goodsBaseApi } from '@/api/goodsBase'
import { goodsInventoryApi } from '@/api/goodsInventory'
export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      form: {
        sizeVoList: '',
        actNo: '',
        imgUrl: ''
      },
      isShowDialog1: false,
      orderData1: '',
      inventoryIndex:'',
      activeIndex: [],
      fileUrl: fileUrl,
      goodsId: '',
      unifiedPrice: '',
      unifiedDwPrice: '',
      tableData: [],
      totalCount: 1
    }
  },
  created() {
    const { goodsId } = this.$route.query
    this.goodsId = goodsId
    this.form.goodsId = goodsId
    if (this.goodsId) {
      this.getDetailById(this.goodsId)
    }
  },
  mounted() {
  },
  methods:{
    changeStatusDialog1(index,row) {
      this.inventoryIndex = index
      // if (!row.inventory) {
      //   this.$toast('请输入尺码 ' + row.size + ' 的库存')
      //   return
      // }
      // if (!row.price) {
      //   this.$toast('请输入尺码 ' + row.size  + ' 的入库价')
      //   return
      // }
      // if (!row.dwPrice) {
      //   this.$toast('请输入尺码 ' + row.size  + ' 的售价')
      //   return
      // }
      this.orderData1 = row
      if (this.orderData1.dwPrice)  {
        let poundage = this.orderData1.dwPrice * 0.075 + 38 + 8.5
        this.orderData1.poundage = parseFloat(poundage).toFixed(2)

        let theirPrice =  this.orderData1.dwPrice
          - (this.orderData1.dwPrice * 0.075 + 38 + 8.5)
        this.orderData1.theirPrice = parseFloat(theirPrice).toFixed(2)
      }
      if (this.orderData1.theirPrice && this.orderData1.price)  {
        let profits = this.orderData1.theirPrice - 10
          - this.orderData1.price
        this.orderData1.profits = parseFloat(profits).toFixed(2)
      }
      this.isShowDialog1 = true
      console.info(this.orderData1)
    },
    gotoIndex() {
      this.$router.push({ path: '/'})
    },
    goAdd() {
      for (let i = 0; i < this.tableData.length; i++) {
        let data1 = this.tableData[i]
        let size = data1.size
        if (!data1.inventory) {
          this.$toast('请输入尺码 ' + size + ' 的库存')
          return
        }
        if (!data1.price) {
          this.$toast('请输入尺码 ' + size + ' 的入库价')
          return
        }
        if (!data1.dwPrice) {
          this.$toast('请输入尺码 ' + size + ' 的售价')
          return
        }
      }
      goodsInventoryApi.add({ sizeDtos: this.tableData }).then(res => {
        if (res.subCode === 1000) {
          this.$toast('操作成功')
          this.$router.go(-1)
          // this.goBack()
        } else {
          this.$toast(res.subMsg)
        }
      })
    },
    // goBack() {
    //   // *** 根据真实路径配置地址
    //   this.$router.push({ path: '/goodsBase/goodsInventory' })
    // },
    setUnifiedPrice() {
      if (!this.unifiedPrice) {
        this.$toast('请输入入库价格')
        return
      }
      let table1 = []
      for (let i = 0; i < this.tableData.length; i++) {
        let data1 = this.tableData[i]
        data1.price = this.unifiedPrice
        table1.push(data1)
      }
      this.tableData = table1
      console.info(this.tableData)
    },
    setUnifiedDwPrice() {
      if (!this.unifiedDwPrice) {
        this.$toast('请输入售价格')
        return
      }
      let table1 = []
      for (let i = 0; i < this.tableData.length; i++) {
        let data1 = this.tableData[i]
        data1.dwPrice = this.unifiedDwPrice
        table1.push(data1)
      }
      this.tableData = table1
    },
    addSizeHandle(item, index = 0) {
      if (!this.activeIndex.includes(index)) {
        this.activeIndex.push(index)
        item.sizeIndex = index
        item.sizeId = item.id
        item.goodsId = this.goodsId
        if (this.tableData.length) {
          let data1 = this.tableData[0]
          item.inventory = data1.inventory
          item.price = data1.price
          item.dwPrice = data1.dwPrice
        }
        this.tableData.push(item)
      } else {
        this.del(index)
        this.delItem(item)
      }
    },
    goDetail(item) {
      console.info(item)
    },
    goDel() {
      this.del(this.inventoryIndex)
      this.delItem(this.orderData1)
      this.isShowDialog1 = false
    },
    del(index) {
      for (let i = 0; i < this.activeIndex.length; i++) {
        if (this.activeIndex[i] == index) {
          this.activeIndex.splice(i, 1)
        }
      }
      console.log(this.activeIndex)
    },
    delItem(item) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == item.id) {
          this.tableData.splice(i, 1)
        }
      }
      console.log(this.tableData)
    },
    avatarShow(e) {
      if (!e) {
        return
      }
      window.open(this.fileUrl + e)
    },
    getDetailById(id) {
      if (id) {
        goodsBaseApi.getDetailById(id).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  }
}

</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';
  * {
    /*margin: 0;*/
    /*padding: 0;*/
    box-sizing: border-box;
  }
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 10px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  body {
    /*font-family: "微软雅黑";*/
    /*color: #333;*/
    /*background: #fff;*/
  }
  strong{
    font-weight: 600;
  }
  .mint-button--small {
    display: inline-block;
    font-size: 13px;
    height: 6vw;
  }
  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 13px;
    height: 3.88vw;
    line-height: 3.88vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dingdans_con {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.3vw 0;
  }

  .dingdans_con_left {
    width: 20vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    /*height: 100%;*/
  }

  .diangdans_con_right {
    padding-left: 1.3vw;
  }

  .dingdans_con_right_down {
    margin-top: 1.4vw;
    font-size: 13px;
    margin-bottom: 2vw;
  }
  .clearfix {
    &:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
  }
  .elInput1 {
    font-size: 14px;
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .btm-distance {
    margin-bottom: 15px;
  }
  .city {
    height: 48px;
    width: 63px;
    border-radius: 15px;
    font-size: 20px;
    background-color: #F6F6F6;
    padding: 14px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }

  .cityActive {
    /*height: 20px;*/
    /*width: 42px;*/
    /*border-radius: 15px;*/
    /*font-size: 20px;*/
    /*background-color: #BEBEBE;*/
    /*padding: 20px 10px;*/
    /*margin-right: 10px;*/
    /*margin-bottom: 10px;*/
    /*display: inline-block;*/
    height: 48px;
    width: 63px;
    border-radius: 15px;
    font-size: 20px;
    background-color: #BEBEBE;
    padding: 14px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }

</style>
