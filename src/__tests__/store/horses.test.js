import { describe, it, expect, beforeEach } from 'vitest';
import horseModule from '@/store/modules/horses';
import { HORSE_COLORS, HORSE_NAMES, MAX_HORSES } from '@/constants/horseAttributes';

describe('horse Vuex module', () => {
  let state, commit;

  beforeEach(() => {
    state = horseModule.state();
    commit = (mutation, payload) => {
      horseModule.mutations[mutation](state, payload);
    };
  });

  it('initial state is empty horses array', () => {
    expect(state.horses).toEqual([]);
  });

  it('SET_HORSES mutation sets horses array', () => {
    const horsesSample = [{ id: 1, name: 'Sample', color: 'red', condition: 50 }];
    commit('SET_HORSES', horsesSample);
    expect(state.horses).toEqual(horsesSample);
  });

  it('generateHorses action generates correct number of horses with correct properties', async () => {
    const commitMock = (mutation, payload) => {
      expect(mutation).toBe('SET_HORSES');

      expect(payload).toHaveLength(MAX_HORSES);
      payload.forEach((horse, index) => {
        expect(horse.id).toBe(index + 1);
        expect(horse.name).toBe(HORSE_NAMES[index]);
        expect(horse.color).toBe(HORSE_COLORS[index]);
        expect(horse.condition).toBeGreaterThanOrEqual(1);
        expect(horse.condition).toBeLessThanOrEqual(100);
      });
    };

    await horseModule.actions.generateHorses({ commit: commitMock });
  });

  it('getAllHorses getter returns all horses', async () => {
    const horsesSample = [{ id: 1, name: 'Sample', color: 'red', condition: 50 }];
    commit('SET_HORSES', horsesSample);

    const result = horseModule.getters.getAllHorses(state);
    expect(result).toEqual(horsesSample);
  });
});
