<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['base-button', variantClass, { 'is-disabled': disabled }]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'primary',
  },
});

const emit = defineEmits(['click']);

const variantClass = computed(() => `base-button--${props.variant}`);

function handleClick(event) {
  if (!props.disabled) {
    emit('click', event);
  }
}
</script>

<style scoped lang="scss">
@use '../../styles/color.scss' as *;

.base-button {
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &--primary {
    background-color: $color-primary;
    color: $color-white;
  }

  &--secondary {
    background-color: $color-secondary;
    color: $color-white;
  }

  &--success {
    background-color: $color-success;
    color: $color-white;
  }

  &--danger {
    background-color: $color-danger;
    color: $color-white;
  }

  &:hover:not(.is-disabled) {
    background-color: $hover-bg;
    border-color: $hover-border;
    color: $hover-text;
  }

  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
