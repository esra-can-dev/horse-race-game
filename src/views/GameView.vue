<template>
  <div class="text-3xl font-bold text-green-600">
    Horse Racing Game 🐎:
    <br />
    <br />
    <HorseList></HorseList>
    <br />
    <br />
    Schedule:
    <RaceControls></RaceControls>
    <br />
    <br />
    Arena:
    <RaceArena></RaceArena>
    <HorseIcon></HorseIcon>
  </div>
</template>

<script setup>
import HorseList from '@/components/HorseList.vue';
import RaceControls from '@/components/RaceControls.vue';
import RaceArena from '@/components/RaceArena.vue';
import HorseIcon from '@/components/HorseIcon.vue';
</script>
