<template>
  <div class="page">
    <NavBar>
      <slot name="navbar"></slot>
    </NavBar>
    <main class="page-main">
      <v-scroll>
        <slot name="content"></slot>
      </v-scroll>
    </main>
    <!--    <slot name="header"></slot>-->

    <!--    <template slot="header">-->
    <!--      <p>我是name为header的slot</p>-->
    <!--    </template>-->
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'VPage',
  components: { NavBar }
}
</script>

<style scoped lang="scss">
.page-main {
  //@include format-page;
}
</style>
