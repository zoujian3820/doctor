<template>
  <div class="page">
    <NavBar v-if="needHeader">
      <slot name="navbar"></slot>
    </NavBar>
    <slot v-else name="navbar"></slot>
    <main class="page-main">
      <v-scroll ref="scroll">
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
  components: { NavBar },
  computed: {
    needHeader() {
      this.refresh()
      return this.$store.state.vPage.needHeader
    }
  },
  methods: {
    refresh() {
      this.$refs.scroll && this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
.page-main {
  @include format-page;
  flex: 1;
  max-height: 100%;
  overflow: hidden;
}
</style>
