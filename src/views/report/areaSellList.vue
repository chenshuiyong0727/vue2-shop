<template>
  <div class="hello">
    <mt-header :title="titleName">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <div class="fenlei_top">
<!--      <div    class="fenlei_top_left">-->
<!--        <el-select style="width: 95vw;" size="small" v-model="queryParam.addressId" @change="getPage">-->
<!--          <el-option label="地址" value=""></el-option>-->
<!--          <el-option-->
<!--            v-for="item in addressList"-->
<!--            :key="item.fieldValue"-->
<!--            :label="item.fieldName"-->
<!--            :value="item.fieldValue">-->
<!--          </el-option>-->
<!--        </el-select>-->

      <select style="width: 95vw !important;
    -webkit-appearance: none;
    background-color: #f4f3f8;
    background-image: none;
    border-radius: 0px;
    border: 0px solid #DCDFE6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    height: 35px;
    line-height: 35px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
"  class=" select100_select select el-input__inner" v-model="queryParam.addressId" @change="getPage">
        <option label="请选择地址"  value=""></option>
        <option
          v-for="item in addressList"
          :key="item.fieldValue"
          :label="item.fieldName"
          :value="item.fieldValue">
        </option>
      </select>
<!--        <input type="text" v-model.trim="queryParam.keyword" placeholder="请输入货号/商品名" class="ins">-->
<!--      </div>-->
<!--      <div class="fenlei_top_right" >-->
<!--        <mt-button-->
<!--          type="primary"-->
<!--          size="small"-->
<!--          @click="getPage">搜索</mt-button>-->
<!--      </div>-->
    </div>
    <div v-if="!queryParam.addressId" style="background-color: #fff;  border-bottom: 1vw solid #eee;" >
      <ve-pie height="320px"
              :data="chartData1" :settings="chartSettings1"></ve-pie>
    </div>

    <!--    列表开始-->
    <div  :style="queryParam.addressId ? 'padding-top: 70px;' : ''">
      <div class="dingdans_item_rt" v-for="(item,index) in tableData" :key="index" v-if="!(queryParam.addressId && item.months == '合计')">
        <div class="dingdans_top_rt">
          <strong style="margin-left: 12px;" v-if="item.months != '合计'">{{ item.months | dictToDescTypeValue(38) }}</strong>
          <strong style="margin-left: 12px;" v-else>{{ item.months }}</strong>
        </div>
        <div class="dingdans_con_rt">
          <div  style="width: 33vw">
            <strong>
              {{item.successNum}}
            </strong>
            <p>销售数</p>
          </div>
          <div  style="width: 33vw">
            <strong>
              {{item.orderAmount}}
            </strong>
            <p>销售金额</p>
          </div>
          <div  style="   border-right-width: 0vw;width: 33vw">
            <strong>
              {{item.profitsAmount}}
            </strong>
            <p>利润</p>
          </div>
        </div>
        <div class="dingdans_con_rt">
          <div  >
            <strong v-if="item.successNum">
              {{item.orderAmount / item.successNum  | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>销售均价</p>
          </div>
          <div  >
            <strong v-if="item.successNum">
              {{item.profitsAmount / item.successNum  | numFilter}}
            </strong>
            <strong v-else>
              0
            </strong>
            <p>平均利润</p>
          </div>
          <div  >
            <strong>
              {{item.defectsNum}}
            </strong>
            <p>瑕疵数</p>
          </div>
          <div style=" border-right-width: 0vw;">
            <strong v-if="item.defectsNum">
              {{item.defectsNum /  (item.successNum +  item.defectsNum) * 100   | numFilter}} %
            </strong>
            <strong v-else>
              0
            </strong>
            <p>瑕疵比例</p>
          </div>
        </div>

      </div>
    </div>
    <!--    列表结束-->

<!--     <div1  :style="queryParam.addressId ? 'padding-top: 0.86rem' : ''">-->
<!--      <div  class="dingdans_item" v-for="(item,index) in tableData" :key="index" v-if="!(queryParam.addressId && item.months == '合计')">-->
<!--        <div class="dingdans_top">-->
<!--          <div class="dingdans_top_left">-->
<!--&lt;!&ndash;           <strong>月份：</strong> <strong class="color-danger"> {{item.months}} </strong>&ndash;&gt;-->
<!--              <strong v-if="item.months != '合计'">{{ item.months | dictToDescTypeValue(38) }}</strong>-->
<!--              <strong v-else>{{ item.months }}</strong>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="dingdans_con">-->
<!--          <div class="diangdans_con_right">-->
<!--            <div class="dingdans_con_right_top" style="margin-bottom: -1vw;">-->
<!--              销售数：<strong >{{item.successNum}}</strong>-->
<!--              销售金额：<strong >{{item.orderAmount}}</strong>-->
<!--              利润：<strong >{{item.profitsAmount}}</strong>-->
<!--            </div>-->
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -1vw;">-->
<!--              <span v-if="item.successNum">销售均价：<strong >{{item.orderAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>销售均价：<strong >0</strong></span>-->
<!--              <span v-if="item.successNum">平均利润：<strong >{{item.profitsAmount / item.successNum  | numFilter}}</strong></span>-->
<!--              <span v-else>平均利润：<strong >0</strong></span>-->
<!--            </div>-->
<!--            <div class="dingdans_con_right_down" style="margin-bottom: -2vw;">-->
<!--              瑕疵数：<strong >{{item.defectsNum}}</strong>-->
<!--              通过比例：<strong >{{item.defectsNum /  (item.successNum +  item.defectsNum) * 100   | numFilter}} %</strong>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--     </div1>-->
<!--    <p style="padding: 0.5rem 0;" class="to-the-bottom">{{emtityMsg}}</p>-->
  </div>
</template>
<script>
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import { reportApi } from '@/api/report'


  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    name: "HelloWorld",
    data() {
      return {
        chartSettings1: { type: 'pie' },
        chartData1: {
          columns: ['key', 'value'],
          rows: []
        },
        addressList: [],
        titleName: '区域销售报表',
        emtityMsg: '没有更多了',
        queryParam: {
          addressId: '',
        },
        tableData: [],
      }
    },
    mounted() {
      this.getPage()
      this.listSysDict()

    },
    methods: {
      keyupSubmit() {
        document.onkeydown = (e) => {
          let _key = window.event.keyCode
          if (_key === 13) {
            this.getPage()
          }
        }
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
      },
      sellListDetail(months) {
        this.$router.push({ path: '/sellListDetail', query: { months }})
      },
      getName(addressId) {
        let typeData = this.addressList.filter(item => item.fieldValue == addressId)
        // return typeData[0].fieldName

        // let typeData = this.addressList.filter(item => item.fieldValue == this.tableData[i].months)
        if (!typeData || typeData.length == 0) {
          return null
        }
        let name = typeData[0].fieldName
        if (!name) {
          return null
        }
        name = name.substring(0, name.indexOf('-'))
        return name
      },
      getPage() {
        reportApi.areaSellList(this.queryParam).then(res => {
          if (res.subCode === 1000) {
            this.tableData = res.data ? res.data : []
            if (this.tableData.length == 0) {
              this.emtityMsg = '暂无相关数据'
            } else {
              this.chartData1.rows = []
              for (let i = 0; i < this.tableData.length; i++) {
                let name = this.getName(this.tableData[i].months)
                if (!name) {
                  continue
                }
                // name = name.substring(0,name.indexOf('-'))
                let info = { key: name, value: this.tableData[i].successNum }
                this.chartData1.rows.push(info)
              }
              this.emtityMsg = '没有更多了'
            }
          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
  @import '../../assets/index/rt_style.less';
  @import '../../assets/index/style.css';
  strong{
    font-weight: 600;
  }
  .dingdans_item {
    padding: 2.4vw 1.2vw;
    background: #ffffff;
    border-bottom: 1vw solid #eee;
    padding-right: 3%;
    padding-left: 3%;
  }

  .dingdans_top {
    font-size: 3.68vw;
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
  /*.dingdans_con_right_down_1 {*/
  /*  !*margin-left: 55vw;*!*/
  /*  margin-bottom: -7vw;*/
  /*  font-size: 3.5vw;*/
  /*  margin-top: -1vw;*/
  /*}*/
/*
 -----分割线---
*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* 这里直接设置 1rem = 50px begin */
  html {
    font-size: 50px;
  }
  /* 这里直接设置 1rem = 50px end */
  html,
  body {
  }
  /* 给要上拉的容器设置 begin */
  .hello {
    background-color: #f3f2f8;
    padding-top: 12vw;
    font-size: 13px;
    height: 100vh;
    overflow-y: auto;
  }





</style>
