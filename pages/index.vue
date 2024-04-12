<template>
  <div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ballNumbers: [],
      columnB: [],
      columnI: [],
      columnN: [],
      columnG: [],
      columnO: [],
    }
  },
  head() {
    return {
      title: 'Bingo',
    }
  },
  mounted() {
    this.ballNumbers.push(...this.generateUniqueRandomBallNumbers(75))
    this.columnB.push(...this.generateUniqueRandomNumbers(1, 15, 5))
    this.columnI.push(...this.generateUniqueRandomNumbers(16, 30, 5))
    this.columnN.push(...this.generateUniqueRandomNumbers(31, 45, 5))
    this.columnG.push(...this.generateUniqueRandomNumbers(46, 60, 5))
    this.columnO.push(...this.generateUniqueRandomNumbers(61, 75, 5))
  },
  methods: {
    generateUniqueRandomBallNumbers(max) {
      const set = new Set()
      while (set.size < max) {
        set.add(Math.floor(Math.random() * max) + 1)
      }
      return Array.from(set)
    },
    generateUniqueRandomNumbers(min, max, count) {
      const set = new Set()
      while (set.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        set.add(randomNumber)
      }
      return Array.from(set)
    }
  }
}
</script>
