<template>
  <v-app>
    <v-main>
      <Toast
        :model-value="showToast"
        :toast-info="toastInfo"
        @update:model-value="showToast = $event"
      />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Toast from '@/components/ui/Toast.vue';
import { useToast } from '@/composables/useToast';

const { toastInfo, showToast } = useToast();
</script>

<style>
.v-data-table thead th {
  background-color: #6a3d31 !important;
  color: white !important;
}

.v-data-table th {
  padding: 10px 16px !important;
}

.v-data-table td {
  padding: 6px 16px !important;
}
</style>
