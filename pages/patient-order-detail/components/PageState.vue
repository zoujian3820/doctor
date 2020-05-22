<template>
  <div v-if="mergeChilds" class="page-state" style="padding-right: 30px">
    <div class="page-state-label">订单号：{{ getorderids }}</div>
    <div class="page-state-number" style="font-size: 18px">
      {{ prStateStr }}
    </div>
  </div>
  <div v-else class="page-state">
    <div class="page-state-label">订单号</div>
    <div class="page-state-number">{{ prescription.id }}</div>
    <img v-if="prescription.id" class="page-state-image" :src="stateImage" />
  </div>
</template>

<script>
export default {
  name: 'PageState'
}
</script>

<style scoped lang="scss"></style>
