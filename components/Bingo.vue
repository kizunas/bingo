<template>
  <div>
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
  mounted() {
    this.setColumnsData()
    this.setColumnData()
    this.setRowData()
    this.setDiagonalData()
  },
  computed: {
    ballData() {
      return this.$store.state.ball
    },
    nextBall() {
      return this.$store.state.getBallFlag
    },
  },
  watch: {
    ballData() {
      this.reachAndBingoCounter()
      setTimeout(() => {
        this.$store.dispatch("getBallFlag", !this.nextBall)
      }, "1000");
    },
  },
  methods: {
    setColumnsData() {
      this.columns = [
        this.generateUniqueRandomNumbers(1, 15, 5),
        this.generateUniqueRandomNumbers(16, 30, 5),
        this.generateUniqueRandomNumbers(31, 45, 5),
        this.generateUniqueRandomNumbers(46, 60, 5),
        this.generateUniqueRandomNumbers(61, 75, 5)
      ]
    },
    setColumnData() {
      for (let i = 0; i < 5; i++) {
        this.columnB.push(this.columns[0][i])
        this.columnI.push(this.columns[1][i])
        this.columnN.push(this.columns[2][i])
        this.columnG.push(this.columns[3][i])
        this.columnO.push(this.columns[4][i])
      }
    },
    setRowData() {
      for (let i = 0; i < 5; i++) {
        this.rowB.push(this.columns[i][0])
        this.rowI.push(this.columns[i][1])
        this.rowN.push(this.columns[i][2])
        this.rowG.push(this.columns[i][3])
        this.rowO.push(this.columns[i][4])
      }
    },
    setDiagonalData() {
      for (let i = 0; i < 5; i++) {
        this.leftDiagonal.push(this.columns[i][i])
      }
      this.rightDiagonal.push(this.columns[4][0], this.columns[3][1], this.columns[2][2], this.columns[1][3], this.columns[0][4])
    },
    reachAndBingoCounter() {
      this.selectedBalls.push(this.ballData)
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