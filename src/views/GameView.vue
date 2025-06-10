<template>
  <div class="text-3xl font-bold text-green-600">
    <div class="flex gap-4">
      <HorseList />
      <RaceArena />
      <RaceControls />
    </div>
  </div>
</template>

<script setup>
import HorseList from '@/components/HorseList.vue';
import RaceControls from '@/components/RaceControls.vue';
import RaceArena from '@/components/RaceArena.vue';
</script>
