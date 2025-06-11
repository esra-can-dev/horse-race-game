import { mount } from '@vue/test-utils';
import HorseIcon from '@/components/common/HorseIcon.vue';

describe('HorseIcon', () => {
  it('renders properly', () => {
    const wrapper = mount(HorseIcon);
    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.classes()).toContain('horse-icon');
    expect(svg.attributes('viewBox')).toBe('0 0 512 512');
  });

  it('has default currentColor "#000000"', () => {
    const wrapper = mount(HorseIcon);
    const svg = wrapper.find('svg');
    expect(svg.attributes('fill')).toBe('#000000');
  });

  it('applies currentColor based on prop"', () => {
    const wrapper = mount(HorseIcon, {
      props: {
        currentColor: '#ffffff',
      },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('fill')).toBe('#ffffff');
  });
});
