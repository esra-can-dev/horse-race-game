<template>
  <div class="race-program">
    <h2 class="sub-title">Program</h2>
    <div class="scrollable-table">
      <div v-for="round in rounds" :key="round.roundNumber" class="race-program__round">
        <div class="sub-title">
          <strong>
            {{ `${round.roundNumber}. Lap - ${round.distance}m` }}
          </strong>
        </div>
        <vue-good-table
          :columns="columns"
          :rows="round.participants"
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { PROGRAM_TABLE_COLUMNS } from '@/constants/raceAttributes';

const store = useStore();
const rounds = computed(() => {
  return store.getters['race/getRounds'];
});
const columns = PROGRAM_TABLE_COLUMNS;
</script>
<style lang="scss" scoped>
.race-program {
  margin-right: 8px;
  width: 150px;

  &__round {
    margin-bottom: 12px;

    .sub-title {
      border-radius: 8px 8px 0 0;
      padding: 4px 0;
    }
  }
}
</style>
