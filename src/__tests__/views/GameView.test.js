import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import GameView from '@/views/GameView.vue';
import { createStore } from 'vuex';

const store = createStore({
  modules: {
    race: {
      namespaced: true,
      getters: {
        getCurrentRoundDetails: () => vi.fn(),
      },
    },
  },
});

vi.mock('@/components/RaceControls.vue', () => ({
  default: {
    name: 'RaceControls',
    template: '<div class="mock-race-controls">RaceControls</div>',
  },
}));
vi.mock('@/components/HorseList.vue', () => ({
  default: {
    name: 'HorseList',
    template: '<div class="mock-horse-list">HorseList</div>',
  },
}));
vi.mock('@/components/RaceArena.vue', () => ({
  default: {
    name: 'RaceArena',
    template: '<div class="mock-race-arena">RaceArena</div>',
  },
}));
vi.mock('@/components/RaceProgram.vue', () => ({
  default: {
    name: 'RaceProgram',
    template: '<div class="mock-race-program">RaceProgram</div>',
  },
}));
vi.mock('@/components/RaceResult.vue', () => ({
  default: {
    name: 'RaceResult',
    template: '<div class="mock-race-result">RaceResult</div>',
  },
}));

describe('GameView', () => {
  it('renders all child components', () => {
    const wrapper = mount(GameView, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('.mock-race-controls').exists()).toBe(true);
    expect(wrapper.find('.mock-horse-list').exists()).toBe(true);
    expect(wrapper.find('.mock-race-arena').exists()).toBe(true);
    expect(wrapper.find('.mock-race-program').exists()).toBe(true);
    expect(wrapper.find('.mock-race-result').exists()).toBe(true);
  });
});
