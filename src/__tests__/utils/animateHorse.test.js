import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { animateHorse } from '@/utils/animateHorse';
import { calculateDuration } from '@/utils/calculateDuration';

vi.mock('@/utils/calculateDuration', () => ({
  calculateDuration: vi.fn(),
}));

describe('animateHorse', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  let horse, round, horseProgress, horsePositions, finishTimes, isPaused, isRunning, onFinish;

  beforeEach(() => {
    horse = { id: 1, name: 'Horse 1', color: 'red' };
    round = {
      distance: 1000,
      participants: [horse],
    };

    horseProgress = {};
    horsePositions = ref({});
    finishTimes = ref([]);
    isPaused = ref(false);
    isRunning = ref(true);
    onFinish = vi.fn();

    vi.spyOn(global.performance, 'now').mockReturnValue(1000);

    calculateDuration.mockReturnValue({
      finalDuration: 1000,
      maxPixel: 500,
    });
  });

  it('animates horse and updates progress', async () => {
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

    await new Promise((r) => setTimeout(r, 20));

    expect(horsePositions.value[1]).toBeGreaterThan(0);
    expect(horseProgress[1]).toBeDefined();
  });

  it('animates horse and calls onFinish when finished', async () => {
    const mockStartTime = 500;
    horseProgress[1] = {
      current: 490,
      startTime: mockStartTime,
      requestId: 1,
    };

    vi.spyOn(performance, 'now').mockReturnValue(mockStartTime + 1000);
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

    await new Promise((r) => setTimeout(r, 20));

    expect(finishTimes.value.length).toBeGreaterThan(0);
  });
});
