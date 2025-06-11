<template>
  <div class="race-result">
    <h2 class="sub-title">Results</h2>
    <div class="scrollable-table">
      <div v-for="round in rounds" :key="round.roundNumber" class="race-result__round">
        <template v-if="round.result.length">
          <div class="sub-title">
            <strong>
              {{ `${round.roundNumber}. Lap - ${round.distance}m` }}
            </strong>
          </div>
          <vue-good-table
            :columns="columns"
            :rows="round.result"
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
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { RESULT_TABLE_COLUMNS } from '@/constants/raceAttributes';

const store = useStore();

const rounds = computed(() => {
  return store.getters['race/getRounds'];
});
const columns = RESULT_TABLE_COLUMNS;
</script>
<style lang="scss" scoped>
.race-result {
  width: 200px;

  &__round {
    margin-bottom: 12px;

    .sub-title {
      border-radius: 8px 8px 0 0;
      padding: 4px 0;
    }
  }
}
</style>
