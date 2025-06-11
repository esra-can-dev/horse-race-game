import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export function useRaceAnimation(currentRound) {
  const store = useStore();

  const isPaused = ref(false);
  const isRunning = ref(false);
  const horsePositions = ref({});
  const finishTimes = ref([]);

  const horseProgress = {};

  const startRace = () => {
    isRunning.value = true;
    const round = currentRound.value;
    if (!round) return;

    const maxPixel = 490;
    const stepTime = 16;
    const baseDistance = 1200;
    const baseDuration = 4000;

    round.participants.forEach((horse) => {
      const id = horse.id;
      const condition = Math.max(1, Math.min(100, horse.condition ?? 50));
      const distanceMultiplier = round.distance / baseDistance;
      const distanceBasedDuration = baseDuration * distanceMultiplier;
      const normalized = condition / 100;
      const speedMultiplier = 0.3 + (2.0 - 0.3) * normalized;
      const finalDuration = distanceBasedDuration / speedMultiplier;
      let current = horseProgress[id]?.current || 0;

      const animate = () => {
        if (isPaused.value) {
          horseProgress[id].requestId = requestAnimationFrame(animate);
          return;
        }
        if (current < maxPixel) {
          current += maxPixel / (finalDuration / stepTime);
          if (current > maxPixel) current = maxPixel;

          horsePositions.value = {
            ...horsePositions.value,
            [id]: current,
          };
          horseProgress[id].current = current;
          horseProgress[id].requestId = requestAnimationFrame(animate);
        } else {
          if (!finishTimes.value.find((r) => r.horseId === id)) {
            finishTimes.value.push({
              name: horse.name,
              color: horse.color,
              finishTime: performance.now() - horseProgress[id].startTime,
            });
            if (finishTimes.value.length === round.participants.length) {
              isRunning.value = false;
              console.log('🏁 Race finished!');

              const currentRoundNumber = round.roundNumber;
              const finishResults = computed(() =>
                [...finishTimes.value]
                  .sort((a, b) => a.finishTime - b.finishTime)
                  .map((item, index) => {
                    return {
                      name: item.name,
                      color: item.color,
                      position: index + 1,
                    };
                  })
              );

              store.commit('race/SAVE_ROUND_RESULTS', {
                results: finishResults.value,
                roundNumber: currentRoundNumber,
              });

              console.log(currentRoundNumber);
              if (currentRoundNumber !== 6) {
                store.dispatch('race/nextRound');
              } else {
                store.dispatch('race/finishGame');
              }

              resetRace();
            }
          }
        }
      };

      horseProgress[id] = {
        current,
        requestId: requestAnimationFrame(animate),
        startTime: performance.now(),
      };
    });
  };

  const pauseRace = () => {
    isPaused.value = true;
  };

  const resumeRace = () => {
    isPaused.value = false;
  };

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
