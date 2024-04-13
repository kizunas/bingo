<template>
  <div>
    <!-- <h2>Ball Numbers</h2>
    <div class="grid">
      <div v-for="number in ballNumbers" :key="number" class="cell">{{ number }}</div>
    </div> -->

    <h2>ビンゴカード</h2>
    <div class="grid">
      <div v-for="(column, index) in columns" :key="index">
        <h3>Column {{ index + 1 }}</h3>
        <template v-for="(number, i) in column">
          <div v-if="index === 2 && i === 2" :key="i" class="center-free">FREE</div>
          <div v-else :key="i" class="cell" :class="{ 'center-free': isSelected(number) }">{{ number }}</div>
        </template>
      </div>
    </div>
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
      columns: [],
      selectedBalls: [],
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
    this.columns = [
      this.generateUniqueRandomNumbers(1, 15, 5),
      this.generateUniqueRandomNumbers(16, 30, 5),
      this.generateUniqueRandomNumbers(31, 45, 5),
      this.generateUniqueRandomNumbers(46, 60, 5),
      this.generateUniqueRandomNumbers(61, 75, 5)
    ]

    const selectedNumber = this.columns[2][2] // freeの番号を最初に取得
    this.selectedBalls.push(selectedNumber)

    this.ballNumbers = this.ballNumbers.filter(number => number !== selectedNumber) // 選択された番号を除外した新しい配列を作成

    const intervalId = setInterval(() => {
        if (this.ballNumbers.length > 0) {
          const numberToPush = this.ballNumbers.shift() // 配列の最初の要素を取得し、配列から削除
          this.selectedBalls.push(numberToPush)
        } else {
          clearInterval(intervalId)
        }
    }, 500)
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
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min  // 0~15の範囲にminが足される
        set.add(randomNumber)
      }
      return Array.from(set)
    },
    isSelected(number) {
      return this.selectedBalls.includes(number)
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.cell {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
.center-free {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  background: #0000007e;
}
</style>