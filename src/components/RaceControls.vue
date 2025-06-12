<template>
  <div class="game-view-header">
    <h1>Horse Racing 🐎</h1>
    <div>
      <BaseButton class="game-view-header__button" @click="generateProgram"
        >Generate Program</BaseButton
      >
      <BaseButton
        v-if="!isRunning"
        variant="success"
        @click="startRace"
        class="game-view-header__button"
        :disabled="currentRoundNumber === 0"
        >{{
          currentRoundNumber === 0 ? 'Start Game' : `Start Round #${currentRoundNumber}`
        }}</BaseButton
      >
      <BaseButton
        v-else
        :variant="isPaused ? 'success' : 'danger'"
        class="game-view-header__button"
        @click="isPaused ? resumeRace() : pauseRace()"
        >{{ isPaused ? 'Continue' : 'Pause' }}</BaseButton
      >
      <BaseButton variant="secondary" @click="resetGame" :disabled="currentRoundNumber === 0"
        >Reset Game</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { inject, computed } from 'vue';

const store = useStore();

const generateProgram = () => {
  store.dispatch('race/generateSchedule');
};

const raceAnimation = inject('raceAnimation');
const { isPaused, startRace, pauseRace, resumeRace, isRunning, resetRace } = raceAnimation;

const currentRoundNumber = computed(() => store.getters['race/getCurrentRoundNumber']);

const resetGame = () => {
  store.dispatch('race/resetGame');
  resetRace();
};
</script>

<style lang="scss" scoped>
@use '../styles/color.scss' as *;

.game-view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-aliceblue;
  padding: 0 16px;
  border-radius: 8px;
  margin-bottom: 16px;

  &__button {
    margin-right: 1rem;
  }
}
</style>
