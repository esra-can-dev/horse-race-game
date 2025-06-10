<template>
  <div class="flex gap-4">
    <HorseList />
    <RaceArena />
    <RaceControls />
    <RaceResult />
  </div>
</template>

<script setup>
import HorseList from '@/components/HorseList.vue';
import RaceControls from '@/components/RaceControls.vue';
import RaceArena from '@/components/RaceArena.vue';
import RaceResult from '@/components/RaceResult.vue';
</script>
