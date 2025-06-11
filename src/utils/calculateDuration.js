export function calculateDuration(horse, roundDistance) {
  const baseDistance = 1200;
  const baseDuration = 4000;
  const maxPixel = 490;

  const condition = Math.max(1, Math.min(100, horse.condition ?? 50));
  const distanceMultiplier = roundDistance / baseDistance;
  const distanceBasedDuration = baseDuration * distanceMultiplier;
  const normalized = condition / 100;
  const speedMultiplier = 0.3 + (2.0 - 0.3) * normalized;
  const finalDuration = distanceBasedDuration / speedMultiplier;

  return { maxPixel, finalDuration };
}
