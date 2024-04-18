<template>
  <div>
    <div class="ball-text">
      <h2>ボール</h2>
      <span>{{ displayBall }}</span>
    </div>
    <div>
      <h2>取り出されたボール</h2>
      <span>{{ displayBalls }}</span>
    </div>

    <h2>ビンゴカード</h2>
    <div class="grid">
      <div v-for="(column, index) in columns" :key="index">
        <template v-for="(number, i) in column">
          <div v-if="index === 2 && i === 2" :key="i" class="center-free">FREE</div>
          <div v-else :key="i" class="cell" :class="{ 'center-free': isSelected(number) }">{{ number }}</div>
        </template>
      </div>
    </div>
    <div>
      {{ 'リーチ数: ' + reach }}
    </div>
    <div>
      {{ 'ビンゴ数: ' + bingo }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ballNumbers: [],
      displayBalls: [],
      displayBall: null,
      columnB: [],
      columnI: [],
      columnN: [],
      columnG: [],
      columnO: [],
      columns: [],
      rowB: [],
      rowI: [],
      rowN: [],
      rowG: [],
      rowO: [],
      selectedBalls: [],
      leftDiagonal: [],
      rightDiagonal: [],
      reach: 0,
      bingo: 0,
    }
  },
  head() {
    return {
      title: 'Bingo',
    }
  },
  mounted() {
    this.ballNumbers.push(...this.generateUniqueRandomBallNumbers(75))

    this.columns = [
      this.generateUniqueRandomNumbers(1, 15, 5),
      this.generateUniqueRandomNumbers(16, 30, 5),
      this.generateUniqueRandomNumbers(31, 45, 5),
      this.generateUniqueRandomNumbers(46, 60, 5),
      this.generateUniqueRandomNumbers(61, 75, 5)
    ]

    for (let i = 0; i < 5; i++) {
      this.columnB.push(this.columns[0][i])
      this.columnI.push(this.columns[1][i])
      this.columnN.push(this.columns[2][i])
      this.columnG.push(this.columns[3][i])
      this.columnO.push(this.columns[4][i])
    }

    for (let i = 0; i < 5; i++) {
      this.rowB.push(this.columns[i][0])
      this.rowI.push(this.columns[i][1])
      this.rowN.push(this.columns[i][2])
      this.rowG.push(this.columns[i][3])
      this.rowO.push(this.columns[i][4])
    }

    for (let i = 0; i < 5; i++) {
      this.leftDiagonal.push(this.columns[i][i])
    }

    this.rightDiagonal.push(this.columns[4][0], this.columns[3][1], this.columns[2][2], this.columns[1][3], this.columns[0][4])

    const intervalId = setInterval(() => {
        if (this.ballNumbers.length > 0) {
          const numberToPush = this.ballNumbers.shift() // 配列の最初の要素を取得し、配列から削除
          this.displayBall = numberToPush
          this.displayBalls.push(numberToPush)
          this.selectedBalls.push(numberToPush)
          this.reach = 0
          this.bingo = 0
          this.checkMatches(this.columnB)
          this.checkMatches(this.columnI)
          this.checkMatches(this.columnN)
          this.checkMatches(this.columnG)
          this.checkMatches(this.columnO)
          this.checkMatches(this.rowB)
          this.checkMatches(this.rowI)
          this.checkMatches(this.rowN)
          this.checkMatches(this.rowG)
          this.checkMatches(this.rowO)
          this.checkMatches(this.leftDiagonal)
          this.checkMatches(this.rightDiagonal)
        } else {
          clearInterval(intervalId)
        }
    }, 1500)
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
    },
    checkMatches(val) {
      let matches = 0
      this.selectedBalls.forEach(ball => {
        if (val.includes(ball)) {
          matches++
        }
      })
      if (matches === 4) {
        return this.reach += 1
      } else if (matches === 5) {
        return this.bingo += 1
      }
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