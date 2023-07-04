<template lang="html">
  <div class="login">
    <mt-header title="库存详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <section style="padding-top:46px">
      <mt-field
        label="图片"
      >
        <img
          @click="avatarShow(form.img)"
          :disabled="true "
          class="select100"
          v-if="form.img"
          :src="form.img"
        />
      </mt-field>
      <mt-field label="状态">
          <el-select size="small" class="select100" v-model="form.status" :disabled="true " >
        <el-option :disabled="true" value="" selected>状态</el-option>
        <el-option
          v-for="item in statusList"
          :key="item.fieldValue"
          :label="item.fieldName"
          :value="+item.fieldValue">
        </el-option>
          </el-select>
      </mt-field>
      <mt-field label="销售类型">
          <el-select size="small" class="select100" v-model="form.saleType" :disabled="true " >
        <el-option :disabled="true" value="" selected>状态</el-option>
        <el-option
          v-for="item in saleTypeList"
          :key="item.fieldValue"
          :label="item.fieldName"
          :value="+item.fieldValue">
        </el-option>
          </el-select>
      </mt-field>
      <mt-field :disabled="true " label="订单号" type = "text" v-model = "form.orderNo"></mt-field>
      <mt-field :disabled="true " label="货号" type = "text" v-model = "form.actNo"></mt-field>
      <mt-field :disabled="true " label="尺码" type = "text" v-model = "form.size"></mt-field>
      <mt-field :disabled="true " label="入库价" type = "text" v-model = "form.price"></mt-field>
      <mt-field :disabled="true " label="售价" type = "text" v-model = "form.shelvesPrice"></mt-field>
      <mt-field :disabled="true " label="运费" type = "text" v-model = "form.freight"></mt-field>
      <mt-field :disabled="true " label="手续费" type = "text" v-model = "form.poundage"></mt-field>
      <mt-field :disabled="true " label="补贴" type = "text" v-model = "form.subsidiesPrice"></mt-field>
      <mt-field :disabled="true " label="到手价" type = "text" v-model = "form.theirPrice"></mt-field>
      <mt-field :disabled="true " label="实际利润" type = "text" v-model = "form.profits"></mt-field>
      <mt-field :disabled="true " label="利润比" type = "text" v-model = "form.profitsThan"></mt-field>
      <mt-field :disabled="true " label="预估利润" type = "text" v-model = "form.forecastProfits"></mt-field>
      <mt-field label="地址">
          <el-select size="small" class="select100" v-model="form.addressId" :disabled="true " >
        <el-option :disabled="true" value="" selected>请选择类型</el-option>
        <el-option
          v-for="item in addressList"
          :key="item.fieldValue"
          :label="item.fieldName"
          :value="+item.fieldValue">
        </el-option>
          </el-select>
      </mt-field>
      <mt-field :disabled="true " label="运单编号" type = "text" v-model = "form.waybillNo"></mt-field>
      <mt-field :disabled="true " label="最迟发货时间" type = "text" v-model = "form.deliveryDeadlineTime"></mt-field>
      <mt-field :disabled="true " label="出售时间" type = "text" v-model = "form.sellTime"></mt-field>
      <mt-field :disabled="true " label="交易成功时间" type = "text" v-model = "form.successTime"></mt-field>

      <mt-field :disabled="true " label="免仓储费天数" type = "text" v-model = "form.inStoreFreeDay"></mt-field>
      <mt-field :disabled="true " label="剩余免费天数" type = "text" v-model = "form.surplusDay"></mt-field>
      <mt-field :disabled="true " label="闪电入库时间" type = "text" v-model = "form.inStoreTime"></mt-field>
      <mt-field :disabled="true " label="免费截止时间" type = "text" v-model = "form.inStoreTimeEnd"></mt-field>


      <mt-field :disabled="true " label="创建时间" type = "text" v-model = "form.createTime"></mt-field>
      <mt-field :disabled="true " label="更新时间" type = "text" v-model = "form.updateTime"></mt-field>
    </section>
    <div class="popContainer" v-if="pictureZoomShow" @click="pictureZoomShow = false">
      <div class="imageShow">
        <img :src="imageZoom" alt="" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {goodsInventoryApi} from '@/api/goodsInventory'
  import { parseTime } from '@/utils'

  export default {
    components:{
      'v-header':Header
    },
    data(){
      return {
        form: {
        },
        imageZoom: '',
        pictureZoomShow: false,
        fileUrl: fileUrl,
        dataStatusList: [],
        statusList: [],
        addressList: [],
        saleTypeList: [],
        type: '',
        id: '',
      }
    },
    created() {
      const { id } = this.$route.query
      if (id) {
        this.getDetailById(id)
      }
    },
    mounted() {
      this.listSysDict()
    },
    methods:{
      avatarShow(e) {
        this.imageZoom = e
        this.pictureZoomShow = true
      },
      getDetailById(id) {
        if (id) {
          goodsInventoryApi.getDetailById(id).then(res => {
            if (res.subCode === 1000) {
              this.form = res.data ? res.data : {}
            } else {
              this.$toast(res.subMsg)
            }
          })
        }
      },
      listSysDict() {
        let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
          localStorage.getItem('sysDictList')) : []
        this.addressList = sysDictList.filter(item => item.typeValue == 38)
        this.statusList = sysDictList.filter(item => item.typeValue == 37)
        this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
        this.warehouseList = sysDictList.filter(item => item.typeValue == 40)
        this.channelIdList = sysDictList.filter(item => item.typeValue == 47)
        this.todayList = sysDictList.filter(item => item.typeValue == 44)
      },
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/index/style.css';

  .login {
    >section {
      .tip {
        padding: 6vw 3vw;
        color:rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
  }
</style>
