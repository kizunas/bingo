<template>
  <div>
    <DrawnBalls />
    <Bingo />
  </div>
</template>

<script>
import DrawnBalls from '~/components/DrawnBalls.vue'
import Bingo from '~/components/Bingo.vue'

export default {
  components: {
    DrawnBalls,
    Bingo
  },
  head() {
    return {
      title: 'Bingo',
    }
  },
}
</script>