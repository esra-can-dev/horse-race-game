<template>
  <div>
    <div v-for="round in rounds" :key="round.roundNumber">
      <template v-if="round.result.length > 0">
        <div>
          {{ `${round.roundNumber}. Lap - ${round.distance}m` }}
        </div>
        <vue-good-table :columns="columns" :rows="round.result">
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RESULT_TABLE_COLUMNS } from '@/constants/raceAttributes';
import HorseIcon from '@/components/HorseIcon.vue';

const store = useStore();

const rounds = computed(() => {
  return store.getters['race/getRounds'];
});
const columns = RESULT_TABLE_COLUMNS;
</script>
