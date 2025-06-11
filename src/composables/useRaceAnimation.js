import { animateHorse } from '@/utils/animateHorse';
import { ref } from 'vue';
import { useStore } from 'vuex';

export function useRaceAnimation(currentRound) {
  const store = useStore();

  const isPaused = ref(false);
  const isRunning = ref(false);
  const horsePositions = ref({});
  const finishTimes = ref([]);

  const horseProgress = {};

  const startRace = () => {
    const round = currentRound.value;
    if (!round) return;
    isRunning.value = true;

    const onFinish = () => {
      const currentRoundNumber = round.roundNumber;

      const finishResults = [...finishTimes.value]
        .sort((a, b) => a.finishTime - b.finishTime)
        .map((item, index) => ({
          name: item.name,
          color: item.color,
          position: index + 1,
        }));

      store.commit('race/SAVE_ROUND_RESULTS', {
        results: finishResults,
        roundNumber: currentRoundNumber,
      });

      if (currentRoundNumber !== store.getters['race/getRounds'].length) {
        store.dispatch('race/nextRound');
      } else {
        store.dispatch('race/finishGame');
      }

      resetRace();
    };

    round.participants.forEach((horse) => {
      animateHorse({
        horse,
        round,
        horseProgress,
        horsePositions,
        finishTimes,
        isPaused,
        isRunning,
        onFinish,
      });
    });
  };

  const pauseRace = () => (isPaused.value = true);

  const resumeRace = () => (isPaused.value = false);

  const resetRace = () => {
    Object.values(horseProgress).forEach((p) => cancelAnimationFrame(p.requestId));
    for (const key in horseProgress) delete horseProgress[key];
    horsePositions.value = {};
    finishTimes.value = [];
    isRunning.value = false;
  };

  return {
    isPaused,
    horsePositions,
    startRace,
    pauseRace,
    resumeRace,
    resetRace,
    isRunning,
  };
}
