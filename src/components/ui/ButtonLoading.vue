<template>
  <v-btn v-bind="attrs" @click="onClick">
    <v-progress-circular
      v-if="loading"
      indeterminate
      size="20"
      width="2"
      color="white"
      class="mr-2"
    />
    <slot>{{ text }}</slot>
  </v-btn>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';

const props = defineProps<{
  text?: string;
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const attrs = useAttrs();

const onClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>
