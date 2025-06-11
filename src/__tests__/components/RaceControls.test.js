import { mount } from '@vue/test-utils';
import RaceControls from '@/components/RaceControls.vue';
import { createStore } from 'vuex';
import { vi } from 'vitest';
import { ref } from 'vue';

const generateScheduleMock = vi.fn();
const startRaceMock = vi.fn();
const pauseRaceMock = vi.fn();
const resetRaceMock = vi.fn();

const store = createStore({
  modules: {
    race: {
      namespaced: true,
      getters: {
        getCurrentRoundNumber: () => 1,
      },
      actions: {
        generateSchedule: generateScheduleMock,
        resetGame: vi.fn(),
      },
    },
  },
});

const BaseButtonStub = {
  template: '<button></button>',
  variant: ['primary'],
};

describe('RaceControls.vue', () => {
  const factory = ({ isRunning = false, isPaused = false } = {}) =>
    mount(RaceControls, {
      global: {
        plugins: [store],
        stubs: {
          BaseButton: BaseButtonStub,
        },
        provide: {
          raceAnimation: {
            isRunning: ref(isRunning),
            isPaused: ref(isPaused),
            startRace: startRaceMock,
            pauseRace: pauseRaceMock,
            resumeRace: vi.fn(),
            resetRace: resetRaceMock,
          },
        },
      },
    });

  it('renders properly', () => {
    const wrapper = factory();

    expect(wrapper.find('h1').text()).toBe('Horse Racing 🐎');
    const baseButtons = wrapper.findAllComponents(BaseButtonStub);
    expect(baseButtons.length).toBe(3);
  });

  it('calls generateProgram on "Generate Program" button click', async () => {
    const wrapper = factory();

    const baseButtons = wrapper.findAllComponents(BaseButtonStub);
    await baseButtons[0].trigger('click');
    expect(generateScheduleMock).toHaveBeenCalled();
  });

  it('calls startRace on "Start Round" button click', async () => {
    const wrapper = factory();

    const baseButtons = wrapper.findAllComponents(BaseButtonStub);
    await baseButtons[1].trigger('click');
    expect(startRaceMock).toHaveBeenCalled();
  });

  it('calls resetGame and resetRace on "Reset Game" button click', async () => {
    const wrapper = factory();
    const baseButtons = wrapper.findAllComponents(BaseButtonStub);
    await baseButtons[2].trigger('click');
    expect(resetRaceMock).toHaveBeenCalled();
  });
});
