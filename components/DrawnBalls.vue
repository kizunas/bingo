<template>
  <div>
    <div>
      <h2>ボール</h2>
      <span>{{ displayBall }}</span>
    </div>
    <div>
      <h2>取り出されたボール</h2>
      <span>{{ displayBalls }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayBall: null,
      numbers: null,
      displayBalls: [],
    }
  },
  computed: {
    nextBall() {
      return this.$store.state.getBallFlag
    },
  },
  watch: {
    nextBall() {
      if (this.numbers.length > 0) {
        this.drawnBall()
      }
    }
  },
  mounted() {
    this.setBalls()
  },
  methods: {
    setBalls() {
      this.numbers = Array.from({ length: 75 }, (_, i) => i + 1)
      this.drawnBall()
    },
    drawnBall() {
      // ランダムに数字を一つ取り出す
      if (this.numbers.length > 0) {
        this.displayBall = this.pickRandomAndRemove(this.numbers)
        this.displayBalls.push(this.displayBall)
        this.$store.dispatch("ballData", this.displayBall)
      }
    },
    pickRandomAndRemove(numbers) {
      const index = Math.floor(Math.random() * numbers.length)
      const [number] = numbers.splice(index, 1) // [number]で配列を一つへ
      return number
    }
  }
}
</script>
