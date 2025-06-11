<template>
  <div class="race-arena">
    <h2 class="sub-title">Game Arena</h2>
    <template v-if="currentRound">
      <div class="race-arena__participants">
        <div v-for="(horse, index) in currentRound.participants" :key="horse.id">
          <div class="race-arena__participant">
            <div class="rotated-text sub-title">
              {{ index + 1 }}
            </div>
            <HorseIcon
              :currentColor="horse.color"
              :style="{ transform: `translateX(${horsePositions[horse.id] || 0}px) scaleX(-1)` }"
            ></HorseIcon>
          </div>
        </div>
      </div>
      <strong class="race-arena__finish-text">FINISH</strong>
      <div class="sub-title race-arena__lap">
        <strong>{{ `${currentRound.roundNumber}. Lap - ${currentRound.distance}m` }}</strong>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { inject } from 'vue';

const raceAnimation = inject('raceAnimation');
const { horsePositions } = raceAnimation;

const store = useStore();
const currentRound = computed(() => store.getters['race/getCurrentRoundDetails']);
</script>
<style lang="scss" scoped>
@use '../styles/color.scss' as *;

.race-arena {
  min-width: 400px;
  width: 600px;

  &__participants {
    border-right: 2px solid $color-danger;
    border-bottom: 2px dashed $color-aliceblue;
  }

  &__participant {
    display: flex;
    padding: 12px 0;
    border-top: 2px dashed $color-aliceblue;

    .rotated-text {
      display: inline-block; /* inline elementlerde çalışması için */
      transform: rotate(-90deg);
      width: 16px;
      height: 24px;
    }
  }

  &__lap {
    margin-top: 2rem;
  }

  &__finish-text {
    display: flex;
    justify-content: end;
    color: $color-danger;
  }
}
</style>
