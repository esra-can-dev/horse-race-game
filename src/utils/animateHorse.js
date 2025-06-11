import { calculateDuration } from './calculateDuration.js';

export function animateHorse({
  horse,
  round,
  horseProgress,
  horsePositions,
  finishTimes,
  isPaused,
  isRunning,
  onFinish,
}) {
  const id = horse.id;
  let current = horseProgress[id]?.current || 0;
  const { finalDuration, maxPixel } = calculateDuration(horse, round.distance);
  const stepTime = 16;

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
          horseId: id,
          name: horse.name,
          color: horse.color,
          finishTime: performance.now() - horseProgress[id].startTime,
        });

        if (finishTimes.value.length === round.participants.length) {
          isRunning.value = false;
          onFinish();
        }
      }
    }
  };

  horseProgress[id] = {
    current,
    requestId: requestAnimationFrame(animate),
    startTime: performance.now(),
  };

  animate();
}
