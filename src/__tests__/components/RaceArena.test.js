import { mount } from '@vue/test-utils';
import RaceArena from '@/components/RaceArena.vue';
import { createStore } from 'vuex';

const mockCurrentRoundDetails = {
  roundNumber: 1,
  distance: 1000,
  participants: [
    { name: 'Citation', color: 'red', id: 1 },
    { name: 'Affirmed', color: 'blue', id: 2 },
  ],
};

const mockHorsePositions = {
  1: 120,
  2: 240,
};

const store = createStore({
  modules: {
    race: {
      namespaced: true,
      getters: {
        getCurrentRoundDetails: () => mockCurrentRoundDetails,
      },
    },
  },
});

const HorseIconStub = {
  template: '<div class="horse-icon-stub"></div>',
  props: ['currentColor'],
};

describe('RaceArena.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(RaceArena, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: HorseIconStub,
        },
        provide: {
          raceAnimation: {
            horsePositions: mockHorsePositions,
          },
        },
      },
    });

    expect(wrapper.find('h2.sub-title').text()).toBe('Game Arena');
    expect(wrapper.find('.race-arena__finish-text').text()).toBe('FINISH');
    expect(wrapper.find('.race-arena__lap').text()).toBe('1. Lap - 1000m');
  });

  it('renders HorseIcons with correct colors', () => {
    const wrapper = mount(RaceArena, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: HorseIconStub,
        },
        provide: {
          raceAnimation: {
            horsePositions: mockHorsePositions,
          },
        },
      },
    });

    const horseIcons = wrapper.findAllComponents(HorseIconStub);
    expect(horseIcons.length).toBe(2);
  });

  it('renders HorseIcons with correct colors', () => {
    const wrapper = mount(RaceArena, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: HorseIconStub,
        },
        provide: {
          raceAnimation: {
            horsePositions: mockHorsePositions,
          },
        },
      },
    });

    const horseIcons = wrapper.findAllComponents(HorseIconStub);
    expect(horseIcons.length).toBe(2);
    expect(horseIcons[0].props('currentColor')).toBe('red');
    expect(horseIcons[1].props('currentColor')).toBe('blue');
  });

  it('renders HorseIcons with correct positions', () => {
    const wrapper = mount(RaceArena, {
      global: {
        plugins: [store],
        stubs: {
          HorseIcon: HorseIconStub,
        },
        provide: {
          raceAnimation: {
            horsePositions: mockHorsePositions,
          },
        },
      },
    });

    const horseIcons = wrapper.findAllComponents(HorseIconStub);
    expect(horseIcons[0].attributes('style')).toContain('translateX(120px)');
    expect(horseIcons[1].attributes('style')).toContain('translateX(240px)');
  });
});
