<template>
  <div v-if="orderids" class="page-state">
    <div class="page-state-label">订单号</div>
    <div class="page-state-number">{{ orderids }}</div>
    <div class="page-state-image">
      <div class="page-state-image-relative">
        <span class="text">{{ stateText }}</span>
        <img src="../images/order-state.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageState',
  props: {
    orderids: {
      type: String,
      default: ''
    },
    stateText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.page-state {
  position: relative;
  @include bg-image('../images/header-bg.png', 100%, 100px);
  background-size: 100% 100%;
  background-color: #ffffff;
  width: 100%;
  font-size: 16px;
  color: #f9f9f9;
  padding: 20px 46px 20px 31px;

  &-label {
    margin-bottom: 5px;
  }

  &-number {
    padding-right: 85px;
  }

  &-image {
    @include position(50%, 46px, initial, initial, 1, absolute);
    width: 88px;
    transform: translateY(-50%);
    font-size: 20px;
    &-relative {
      position: relative;
      .text {
        @include position(50%, 0, initial, initial, 2, absolute);
        height: 22px;
        margin-top: -11px;
        font-size: 15px;
        transform: rotate(-25deg);
        transform-origin: 42% 50%;
        text-align: center;
      }
    }
    img {
      @include wh;
    }
  }
}
</style>
