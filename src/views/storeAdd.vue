<template lang="html">
  <div class="login">
<!--    <v-header>-->
<!--      <h1 slot="title">商品详情</h1>-->
<!--    </v-header>-->
    <mt-header title="库存添加">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
      <div slot="right">
        <mt-button size="normal" style="font-size: 16px"  @click="goAdd">保存</mt-button>
      </div>
    </mt-header>
    <div class="dingdans_item" style="margin-top: 42px; margin-bottom: 7px; border-bottom:0px ;padding:0" >
      <div class="dingdans_con" style="padding:0">
        <div style="  width: 210px;
  height: 84px;
  position: relative;
  border-radius: 5px;" >
          <img style="  width: 80%;
  margin-top: 16px;
  margin-left: 10%;" v-bind:src="form.img" alt="" >
        </div>
        <div class="diangdans_con_right" style="font-size: 16px;    width: 130vw;
    padding-left: 5px;
    margin-right: 10px;">
          <div class="dingdans_con_right_top">
            <p>
              <strong v-if="form.id"
                      @click="goodsDetail(form.id, 1) "
                      style="  color: #333333;font-size: 14px;">
                {{form.name }}
              </strong>
            </p>
           <p style="margin-top: 5px;">
<!--             货号：<strong class="color-danger">{{form.actNo}}</strong>-->
             <span @click="jumpactNo(form.actNo)">
              {{form.actNo}}
              </span>
             <img @click="copyUrl(form.actNo)" style="width: 20px;margin-bottom: 8px;"
                  src="../../static/img/copy6.png">
           </p>
          </div>
        </div>
      </div>
    </div>
    <div style="
        margin-bottom: 7px;
    font-size: 10px;
    padding-top: 3.4vw;
    padding-left: 3vw;
    background: #ffffff;" >
      <h5 style="font-size: 17px;margin-bottom: 12px; color: #333333">入库尺码</h5>
      <div class="btm-dance">
        <div style="text-align: center" @click="addSizeHandle(item, index)"
              :class="activeIndex.includes(index) ? 'cityActive' : 'city'"
              v-for="(item, index) in form.sizeVoList" :key="item.id">
              <span>
                {{item.size}}
              </span>
        </div>
      </div>
    </div>
    <div style="
        border-bottom: 1vw solid #eee;
    font-size: 10px;
    padding-top: 3.4vw;
    padding-left: 4vw;
    padding-right: 3vw;
    background: #ffffff;" >
      <h5 style="font-size: 17px;margin-bottom: 12px; color: #333333">尺码列表</h5>
      <div class="clearfix btm-distance">
        <el-table  style="margin-top: 20px" border :data="tableData">
<!--          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>-->
          <el-table-column align="center" prop="size" width="50" label="尺码"/>
          <el-table-column align="center" prop="inventory" width="70" label="库存">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1" type="number" v-model="scope.row.inventory"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="price"  width="80"  label="进价">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1"  type="number" v-model="scope.row.price"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="dwPrice"    label="售价">
            <template scope="scope">
              <div class="input-box">
                <input class="elInput1" type="number"  v-model="scope.row.dwPrice"></input>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="channelId"  width="80"  label="渠道">
            <template scope="scope">
              <div class="input-box">
                <select class="select" v-model="scope.row.channelId">
                  <option label="渠道"  value=""></option>
                  <option
                    v-for="item in channelIdList"
                    :key="item.fieldValue"
                    :label="item.fieldName"
                    :value="item.fieldValue">
                  </option>
                </select>
                <!--                <input class="elInput1" type="number"  v-model="scope.row.dwPrice"></input>-->
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="55">
            <template scope="scope">
              <el-button type="text" @click="changeStatusDialog1(scope.row.sizeIndex,scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <mt-popup
      v-model="isShowDialog1">
      <mt-header title="查看详情">
        <div slot="right">
          <mt-button size="normal"  @click="isShowDialog1 = false" style="font-size: 15px">关闭</mt-button>
        </div>
        <div slot="left">
          <mt-button size="normal" @click="goDel" style="font-size: 16px">移除</mt-button>
        </div>
      </mt-header>
      <section style="height: 90vw;width: 80vw">
        <mt-field label="尺码" style="margin-top: 11vw;"  v-model="orderData1.size" :disabled="true"></mt-field>
        <mt-field label="仓库">
            <select size="small" class="select80_select" :disabled="true" v-model="orderData1.channelId"  >
              <option :disabled="true" value="" selected>渠道</option>
              <option
                v-for="item in channelIdList"
                :key="item.fieldValue"
                :label="item.fieldName"
                :value="+item.fieldValue">
              </option>
            </select>
        </mt-field>
        <mt-field label="库存" v-model="orderData1.inventory" :disabled="true"></mt-field>
        <mt-field label="进价" v-model="orderData1.price" :disabled="true"></mt-field>
        <mt-field label="售价" v-model="orderData1.dwPrice" :disabled="true"></mt-field>
        <mt-field label="手续费" :disabled="true" v-model="orderData1.poundage"></mt-field>
        <mt-field label="到手价" :disabled="true" v-model="orderData1.theirPrice"></mt-field>
        <mt-field label="利润" :disabled="true" v-model="orderData1.profits"></mt-field>
      </section>
    </mt-popup>
<!--    <div style="    margin-left: 20vw;-->
<!--    margin-top: 20px;">-->
<!--      <el-button style="bottom: 10px"-->
<!--        type="primary"-->
<!--                 size="small"-->
<!--        @click="goAdd">提交</el-button>-->
<!--      <el-button style="bottom: 10px"-->
<!--                 size="small"-->
<!--                 @click="$router.go(-1)">取消</el-button>-->
<!--      <el-button style="bottom: 10px"-->
<!--        type="primary"-->
<!--                 size="small"-->
<!--                 @click="gotoIndex">回到首页</el-button>-->
<!--    </div>-->
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
        name: '',
        actNo: '',
        imgUrl: '',
        img: '',
      },
      channelIdList: [],
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

    this.listSysDict()
  },
  methods:{
    listSysDict() {
      let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
        localStorage.getItem('sysDictList')) : []
      this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
    },
    changeStatusDialog1(index,row) {
      this.inventoryIndex = index
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
        if (!data1.channelId) {
          data1.channelId = 1
        }
      }
      goodsInventoryApi.add({ sizeDtos: this.tableData }).then(res => {
        if (res.subCode === 1000) {
          this.$toast('操作成功')
          this.$router.go(-1)
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
    goodsDetail(id, flag) {
      this.$router.push({ path: '/goodsDetail', query: { id, flag } })
    },
    jumpactNo(actNo) {
      this.$router.push({path: '/store', query: {actNo}})
    },
    // 复制链接
    copyUrl(url) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', url)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(input)
      this.$toast('已复制至剪切板')
    },
    addSizeHandle(item, index = 0) {
      if (!this.activeIndex.includes(index)) {
        this.activeIndex.push(index)
        item.sizeIndex = index
        item.sizeId = item.id
        item.goodsId = this.goodsId
        item.channelId = 1
        if (this.tableData.length) {
          let data1 = this.tableData[0]
          item.inventory = data1.inventory
          item.price = data1.price
          if (!item.dwPrice) {
            item.dwPrice = data1.dwPrice
          }
          item.channelId = data1.channelId
        }
        this.tableData.push(item)
        this.$forceUpdate()
      } else {
        this.del(index)
        this.delItem(item)
      }
    },
    goDetail(item) {
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
    },
    delItem(item) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == item.id) {
          this.tableData.splice(i, 1)
        }
      }
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
    width: 35vw;
    height: 20vw;
    display: flex;
  }

  .dingdans_con_left img {
    width: 100%;
    margin: auto;
    border-radius: 10px;
  }

  .diangdans_con_right {
    width: 130vw;
    padding-left: 10px;
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
    height: 33px;
    width: 63px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #F6F6F6;
    padding: 8px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
  }

  .cityActive {
    /*height: 36px;*/
    /*width: 63px;*/
    /*border-radius: 5px;*/
    /*font-size: 17px;*/
    /*background-color: #BEBEBE;*/
    /*padding: 9px 0px;*/
    /*margin-right: 6px;*/
    /*margin-bottom: 13px;*/
    /*// 自动换行*/
    /*display: inline-block;*/

    height: 33px;
    width: 63px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #BEBEBE;
    padding: 8px 0px;
    margin-right: 6px;
    margin-bottom: 13px;
    display: inline-block;
    /*height: 48px;*/
    /*width: 59px;*/
    /*border-radius: 15px;*/
    /*font-size: 20px;*/
    /*background-color: #BEBEBE;*/
    /*padding: 14px 10px;*/
    /*margin-right: 10px;*/
    /*margin-bottom: 10px;*/
    /*display: inline-block;*/
  }


</style>
