<template>
  <div class="text-3xl font-bold text-green-600">
    Horse List:
    <button @click="startAnimation">start game</button>
    <div v-for="horse in allHorses" :key="horse.id" class="d-flex">
      <HorseIcon
        :currentColor="horse.color"
        :style="{ transform: `translateX(${position}px)  scaleX(-1)` }"
      ></HorseIcon>
    </div>
    <div v-if="allHorses.length > 0">
      <vue-good-table :columns="columns" :rows="allHorses">
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

    <div class="max-w-7xl mx-auto p-4 border border-gray-300">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border border-red-500">
        <div class="bg-red-300 p-4">Sol</div>
        <div class="bg-green-300 p-4">Orta</div>
        <div class="bg-blue-300 p-4">Sağ</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import HorseIcon from '@/components/HorseIcon.vue';
import { HORSE_TABLE_COLUMNS } from '@/constants/horseAttributes';

const store = useStore();
onMounted(async () => {
  await store.dispatch('horses/generateHorses');
});

const allHorses = computed(() => {
  return store.getters['horses/getAllHorses'];
});

const columns = HORSE_TABLE_COLUMNS;

const position = ref(0);
const startAnimation = () => {
  let start = 0;
  const target = 300;
  const duration = 3000; // ms
  const stepTime = 16; // ~60fps

  const step = () => {
    if (start < target) {
      start += target / (duration / stepTime);
      position.value = start;
      requestAnimationFrame(step);
    }
  };

  step();
};
</script>
