import { describe, it, expect, beforeEach } from 'vitest';
import { calculateDuration } from '@/utils/calculateDuration';

describe('calculateDuration', () => {
  let horse, roundDistance;

  beforeEach(() => {
    horse = { id: 1, name: 'Horse 1', color: 'red', condition: 100 };
    roundDistance = 1000;
  });

  it('calculates duration correctly and returns value', async () => {
    const result = calculateDuration(horse, roundDistance);

    expect(result).toHaveProperty('maxPixel');
    expect(result).toHaveProperty('finalDuration');

    expect(result.maxPixel).toBe(490);
    expect(result.finalDuration).toBeCloseTo(1666.6666666666667);
  });
});
