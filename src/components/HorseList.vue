<template>
  <div class="horse-list">
    <h2 class="sub-title">Horse List</h2>
    <div v-if="allHorses.length > 0" class="scrollable-table">
      <vue-good-table
        :columns="columns"
        :rows="allHorses"
        :sort-options="{
          enabled: false,
        }"
      >
        <template #table-row="props">
          <span v-if="props.column.field === 'name'">
            {{ props.row.name }}
            <HorseIcon
              :currentColor="props.row.color"
              :style="[{ width: '16px', height: '16px' }]"
            ></HorseIcon>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { HORSE_TABLE_COLUMNS } from '@/constants/horseAttributes';

const store = useStore();
onMounted(async () => {
  await store.dispatch('horses/generateHorses');
});

const allHorses = computed(() => {
  return store.getters['horses/getAllHorses'];
});

const columns = HORSE_TABLE_COLUMNS;
</script>
<style scoped lang="scss">
.horse-list {
  width: 300px;
}
</style>
