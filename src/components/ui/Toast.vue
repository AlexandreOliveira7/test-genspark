<template>
  <v-snackbar
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    :timeout="timeout"
    location="top right"
    :color="toastInfo.color"
    class="snackbar"
  >
    <div class="pa-1">
      <p class="text-white">{{ toastInfo.text }}</p>
    </div>
  </v-snackbar>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  toastInfo: {
    type: Object,
    default: () => ({
      text: '',
      color: 'primary',
    }),
  },
  timeout: {
    type: Number,
    default: 3000,
  },
});

defineEmits(['update:modelValue']);
</script>
