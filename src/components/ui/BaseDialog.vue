<template>
  <div>
    <div @click="open">
      <slot name="trigger"></slot>
    </div>

    <v-dialog v-model="isOpen" :max-width="width">
      <v-card class="pa-2">
        <v-card-title class="d-flex justify-space-between border-b">
          <p class="font-weight-bold text-h6 text-brown_dg">{{ title }}</p>
          <v-icon @click="close" size="25">mdi-close</v-icon>
        </v-card-title>

        <v-card-text class="mt-5">
          <slot :close="close"></slot>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  title: string;
  width: string;
  modelValue?: boolean;
}>();

const isOpen = ref(false);
function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) isOpen.value = val;
  },
  { immediate: true }
);

watch(isOpen, (val) => {
  emit('update:modelValue', val);
});
</script>
