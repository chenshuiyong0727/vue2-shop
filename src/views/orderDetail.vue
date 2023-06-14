<template lang="html">
  <div class="login">
    <mt-header title="订单详情">
      <div slot="left">
        <mt-button  icon="back" @click="$router.go(-1)"></mt-button>
      </div>
    </mt-header>
    <section style="padding-top:46px">
      <mt-field
        label="图片"
      >
<!--        <el-upload-->
<!--          :disabled="true "-->
<!--          class="avatar-uploader"-->
<!--          action="/gw/op/v1/file/uploadFileMinio"-->
<!--          :show-file-list="false"-->
<!--          :on-error="handleImageError"-->
<!--          :on-success="handleImageSuccess"-->
<!--          :before-upload="beforeImageUpload"-->
<!--        >-->
          <img
            :disabled="true "
            class="select100"
            v-if="form.img"
            :src="form.img"
          />
<!--          <el-button :disabled="true " type="primary" class="select100" v-show="!form.imgUrl" size="small"-->
<!--          >上传图片-->
<!--          </el-button-->
<!--          >-->
<!--        </el-upload>-->
      </mt-field>
      <mt-field label="状态">
<!--          <select class="select100" v-model="form.status"  :disabled="true ">-->
<!--            <option v-for="x in statusList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--          </select>-->
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
<!--      <mt-field label="利润比">-->
<!--        <span v-if="form.profits && form.price " style="margin-right: 160px;" >{{(form.profits / form.price ) * 100 | numFilter}} %</span>-->
<!--      </mt-field>-->
<!--      <mt-field label="预估利润">-->
<!--        <span v-if="form.theirPrice && form.price " style="margin-right: 180px;" > {{(form.theirPrice - form.price - 10 ) | numFilter}}</span>-->
<!--      </mt-field>-->

<!--      <mt-field :disabled="true " label="利润比3333" type = "text" v-model = "form.orderNo"></mt-field>-->
<!--      <mt-field :disabled="true " label="预估利润3333" type = "text" v-model = "form.orderNo"></mt-field>-->
      <mt-field label="地址">
<!--          <select class="select100" v-model="form.addressId"  :disabled="true ">-->
<!--            <option v-for="x in addressList" :value="x.fieldValue">{{x.fieldName}}</option>-->
<!--          </select>-->
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
      <mt-field :disabled="true " label="创建时间" type = "text" v-model = "form.createTime"></mt-field>
      <mt-field :disabled="true " label="更新时间" type = "text" v-model = "form.updateTime"></mt-field>

      <!--      <mt-field label="出售时间">-->
<!--         <span style="margin-right: 80px;" >{{form.sellTime | formateTime }}</span>-->
<!--      </mt-field>-->
<!--      <mt-field label="交易成功时间">-->
<!--         <span style="margin-right: 80px;" >{{form.successTime | formateTime }}</span>-->
<!--      </mt-field>-->
<!--      <mt-field label="创建时间">-->
<!--         <span style="margin-right: 80px;" >{{form.createTime | formateTime }}</span>-->
<!--      </mt-field>-->
<!--      <mt-field label="更新时间">-->
<!--         <span style="margin-right: 80px;" >{{form.updateTime | formateTime }}</span>-->
<!--      </mt-field>-->
    </section>
    <div style="    margin-left: 28vw;
    margin-top: 20px;">
      <mt-button style="bottom: 10px"
        @click="$router.go(-1)">返回</mt-button>
      <mt-button style="bottom: 10px"
        type="primary"
        @click="gotoIndex">回到首页</mt-button>
    </div>


  </div>
</template>

<script>
import Header from '@/common/_header.vue'
import { goodsOrderApi } from '@/api/goodsOrder'
import { parseTime } from '@/utils'

export default {
  components:{
    'v-header':Header
  },
  data(){
    return {
      form: {
      },
      fileUrl: fileUrl,
      dataStatusList: [],
      statusList: [],
      addressList: [],
      type: '',
      id: '',
    }
  },
  created() {
    const { id } = this.$route.query
    // this.form = id
    if (id) {
      this.getDetailById(id)
    }
  },
  mounted() {
    this.listSysDict()
  },
  methods:{
    getDetailById(id) {
      if (id) {
        goodsOrderApi.getDetailById(id).then(res => {
          if (res.subCode === 1000) {
            this.form = res.data ? res.data : {}
            if(this.form.profits && this.form.price) {
              // 利润比
              let profitsThan = (this.form.profits / this.form.price ) * 100
              this.form.profitsThan = parseFloat(profitsThan).toFixed(2)
              this.form.profitsThan = this.form.profitsThan + '%'
            }else {
              this.form.profitsThan = ''
            }
            if(this.form.theirPrice && this.form.price) {
              // 预估利润
              let forecastProfits = this.form.theirPrice - this.form.price - 10
              this.form.forecastProfits = parseFloat(forecastProfits).toFixed(2)
            }else {
              this.form.forecastProfits = ''
            }
            this.form.deliveryDeadlineTime = this.form.deliveryDeadlineTime ? parseTime(this.form.deliveryDeadlineTime) : ''
            this.form.sellTime = this.form.sellTime ? parseTime(this.form.sellTime) : ''
            this.form.successTime = this.form.successTime ? parseTime(this.form.successTime) : ''
            this.form.createTime = this.form.createTime ? parseTime(this.form.createTime) : ''
            this.form.updateTime = this.form.updateTime ? parseTime(this.form.updateTime) : ''

          } else {
            this.$toast(res.subMsg)
          }
        })
      }
    },
    // goEdit() {
    //   this.type = 2
    // },
    // gotoAdd(id, type) {
    //   this.$router.push({ path: '/goodsAdd', query: { id, type } })
    // },
    gotoIndex() {
      this.$router.push({ path: '/'})
    },
    goBack() {
      this.$router.push({ path: '/otherList'})
    },
    listSysDict() {
      let sysDictList = localStorage.getItem('sysDictList') ? JSON.parse(
        localStorage.getItem('sysDictList')) : []
      this.addressList = sysDictList.filter(item => item.typeValue == 38)
      this.dataStatusList = sysDictList.filter(item => item.typeValue == 36)
      this.statusList = sysDictList.filter(item => item.typeValue == 37)
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
