import { mount } from '@vue/test-utils';
import HorseList from '@/components/HorseList.vue';
import { createStore } from 'vuex';

const mockHorses = [{ name: 'Citation', color: 'red', condition: 90 }];

const store = createStore({
  modules: {
    horses: {
      namespaced: true,
      actions: {
        generateHorses: vi.fn(),
      },
      getters: {
        getAllHorses: () => mockHorses,
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
    <div>
      <slot
        name="table-row"
        :row="rows[0]"
        :column="{ field: 'name' }"
        :formattedRow="rows[0]"
      />
    </div>
  `,
};

describe('HorseList.vue', () => {
  it('renders HorseIcon with correct color', () => {
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
        stubs: {
          'vue-good-table': VueGoodTableStub,
          HorseIcon: HorseIconStub,
        },
      },
    });

    const horseIcon = wrapper.findComponent(HorseIconStub);
    expect(horseIcon.exists()).toBe(true);
    expect(horseIcon.props('currentColor')).toBe('red');
  });
});
