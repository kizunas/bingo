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
      }, "1000")
    },
  },
  methods: {
    setColumnsData() {
      this.columns = [
        this.generateUniqueRandomNumbers(1),
        this.generateUniqueRandomNumbers(16),
        this.generateUniqueRandomNumbers(31),
        this.generateUniqueRandomNumbers(46),
        this.generateUniqueRandomNumbers(61)
      ]
      this.columns[2][2] = false
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
        this.rightDiagonal.push(this.columns[i][4 - i])
      }
    },
    reachAndBingoCounter() {
      this.selectedBalls.push(this.ballData)
      this.reach = 0
      this.bingo = 0
      const properties = [
        this.columnB,
        this.columnI,
        this.columnN,
        this.columnG,
        this.columnO,
        this.rowB,
        this.rowI,
        this.rowN,
        this.rowG,
        this.rowO,
        this.leftDiagonal,
        this.rightDiagonal
      ]
      properties.forEach(property => {
        this.checkMatches(property)
      })
    },
    generateUniqueRandomNumbers(range) {
      const array = Array.from({ length: 15 }, (_, i) => i + range)
      const removedItems = []
      for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * array.length)
      const removedItem = array.splice(randomIndex, 1)[0]
      removedItems.push(removedItem)
      }
      return removedItems
    },
    isSelected(number) {
      return this.selectedBalls.includes(number)
    },
    checkMatches(val) {
      let matches = 0
      if (val.includes(false)) {
        matches++
      }
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