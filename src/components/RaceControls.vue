<template>
  <div>
    <button @click="generateProgram">Generate Program</button>

    <div v-for="round in rounds" :key="round.roundNumber">
      <div>
        {{ `${round.roundNumber}. Lap - ${round.distance}m` }}
      </div>
      <vue-good-table :columns="columns" :rows="round.participants">
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
import { computed } from 'vue';
import { useStore } from 'vuex';
import { PROGRAM_TABLE_COLUMNS } from '@/constants/raceAttributes';
import HorseIcon from '@/components/HorseIcon.vue';

const store = useStore();

const generateProgram = () => {
  store.dispatch('race/generateSchedule');
};
const rounds = computed(() => {
  return store.getters['race/getRounds'];
});
const columns = PROGRAM_TABLE_COLUMNS;
</script>
