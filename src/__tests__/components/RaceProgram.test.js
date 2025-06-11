import { mount } from '@vue/test-utils';
import RaceProgram from '@/components/RaceProgram.vue';
import { createStore } from 'vuex';

const mockRounds = [
  {
    roundNumber: 1,
    distance: 1000,
    participants: [{ name: 'Citation', color: 'red' }],
  },
  {
    roundNumber: 2,
    distance: 1200,
    participants: [{ name: 'Affirmed', color: 'blue' }],
  },
];

const store = createStore({
  modules: {
    race: {
      namespaced: true,
      getters: {
        getRounds: () => mockRounds,
      },
    },
  },
});

const HorseIconStub = {
  template: '<div class="horse-icon-stub"></div>',
  props: ['currentColor'],
};

const VueGoodTableStub = {
  props: ['columns', 'rows'],
  template: `
    <div class="vue-good-table-stub">
      <slot
        name="table-row"
        v-for="(row, i) in rows"
        :key="i"
        :row="row"
        :column="{ field: 'name' }"
        :formattedRow="row"
      />
    </div>
  `,
};

describe('RaceProgram.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(RaceProgram, {
      global: {
        plugins: [store],
        stubs: {
          'vue-good-table': VueGoodTableStub,
          HorseIcon: HorseIconStub,
        },
      },
    });

    expect(wrapper.find('h2.sub-title').text()).toBe('Program');
  });

  it('renders correct number of rounds', () => {
    const wrapper = mount(RaceProgram, {
      global: {
        plugins: [store],
        stubs: {
          'vue-good-table': VueGoodTableStub,
          HorseIcon: HorseIconStub,
        },
      },
    });

    const roundWrappers = wrapper.findAll('.vue-good-table-stub');
    expect(roundWrappers.length).toBe(2);
  });

  it('renders HorseIcons with correct colors', () => {
    const wrapper = mount(RaceProgram, {
      global: {
        plugins: [store],
        stubs: {
          'vue-good-table': VueGoodTableStub,
          HorseIcon: HorseIconStub,
        },
      },
    });

    const horseIcons = wrapper.findAllComponents(HorseIconStub);
    expect(horseIcons.length).toBe(2);
    expect(horseIcons[0].props('currentColor')).toBe('red');
    expect(horseIcons[1].props('currentColor')).toBe('blue');
  });
});
