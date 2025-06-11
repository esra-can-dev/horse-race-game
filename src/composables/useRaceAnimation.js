import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export function useRaceAnimation(currentRound) {
  const store = useStore();
  const isPaused = ref(false);
  const horsePositions = ref({});
  const horseProgress = {};
  const finishTimes = ref([]);

  const startRace = () => {
    const round = currentRound.value;
    if (!round) return;

    const maxPixel = 300;
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
              color: horse.color,
              name: horse.name,
              finishTime: performance.now() - horseProgress[id].startTime,
            });

            // Yarış tamamen bitti mi kontrolü
            if (finishTimes.value.length === round.participants.length) {
              console.log('🏁 Yarış tamamlandı!');
              console.log(finishTimes);
              // burada istersen başka bir şey tetikleyebilirsin
              const resultsSorted = computed(() =>
                [...finishTimes.value].sort((a, b) => a.finishTime - b.finishTime)
              );
              store.commit('race/saveRoundResults', {
                results: resultsSorted.value.map((item, index) => {
                  return { ...item, position: index + 1 };
                }),
                roundNumber: currentRound.value.roundNumber,
              });
              resetRace();
              store.dispatch('race/nextRound');
              startRace();
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
    startRace(); // kaldığı yerden devam
  };

  const resetRace = () => {
    Object.values(horseProgress).forEach((p) => {
      cancelAnimationFrame(p.requestId);
    });
    for (const key in horseProgress) delete horseProgress[key];
    horsePositions.value = {};
    finishTimes.value = [];
  };

  return {
    isPaused,
    horsePositions,
    startRace,
    pauseRace,
    resumeRace,
    resetRace,
  };
}
