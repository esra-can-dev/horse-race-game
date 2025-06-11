import { mount } from '@vue/test-utils';
import BaseButton from '@/components/common/BaseButton.vue';

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toBe('Click me');
  });

  it('has default type "button"', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('applies variant class based on prop', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary',
      },
    });
    expect(wrapper.classes()).toContain('base-button--secondary');
  });

  it('emits click event when clicked and not disabled', async () => {
    const wrapper = mount(BaseButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });

  it('has disabled attribute and class when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('is-disabled');
  });
});
