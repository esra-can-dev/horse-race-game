import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRaceAnimation } from '@/composables/useRaceAnimation';
import { animateHorse } from '@/utils/animateHorse';

vi.mock('@/utils/animateHorse', () => ({
  animateHorse: vi.fn(),
}));

const mockCommit = vi.fn();
const mockDispatch = vi.fn();

vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex');
  return {
    ...actual,
    useStore: () => ({
      commit: mockCommit,
      dispatch: mockDispatch,
      getters: {
        'race/getRounds': [{ roundNumber: 1 }, { roundNumber: 2 }],
      },
    }),
  };
});

describe('useRaceAnimation composable', () => {
  let roundRef;

  beforeEach(() => {
    roundRef = ref({
      roundNumber: 1,
      distance: 1000,
      participants: [
        { id: 1, name: 'Horse 1', color: 'red' },
        { id: 2, name: 'Horse 2', color: 'blue' },
      ],
    });

    mockCommit.mockReset();
    mockDispatch.mockReset();
    animateHorse.mockReset();
  });

  it('renders properly with initial values', () => {
    const race = useRaceAnimation(roundRef);
    expect(race.isRunning.value).toBe(false);
    expect(race.isPaused.value).toBe(false);
    expect(race.horsePositions.value).toEqual({});
  });

  it('calls animateHorse for each horse when startRace() calls', () => {
    const { startRace } = useRaceAnimation(roundRef);
    startRace();
    expect(animateHorse).toHaveBeenCalledTimes(2);
  });

  it('correctly operate pauseRace() and resumeRace()', () => {
    const { pauseRace, resumeRace, isPaused } = useRaceAnimation(roundRef);
    pauseRace();
    expect(isPaused.value).toBe(true);

    resumeRace();
    expect(isPaused.value).toBe(false);
  });

  it('clear the state when resetRace calls', () => {
    const race = useRaceAnimation(roundRef);

    race.isRunning.value = true;
    race.horsePositions.value = { 1: 123, 2: 240 };

    race.resetRace();
    expect(race.isRunning.value).toBe(false);
    expect(race.horsePositions.value).toEqual({});
  });
});
