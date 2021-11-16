function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    useSpecial() {
      return this.currentRound % 3 !== 0;
    },
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    playerAttack() {
      this.currentRound++;
      const attackValue = randomValue(5, 11);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackValue = randomValue(9, 16);
      this.playerHealth -= attackValue;
      this.addLog("monster", "attack", attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = randomValue(8, 16);
      this.monsterHealth -= attackValue;
      this.addLog("player", "attack", attackValue);
      this.monsterAttack();
    },
    heal() {
      this.currentRound++;
      const healValue = randomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLog("player", "heal", healValue);
      this.monsterAttack();
    },
    surrender() {
      this.winner = "monster";
    },
    addLog(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
