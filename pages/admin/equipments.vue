<script setup>
import EquipmentTable from '@/components/admin/EquipmentTable.vue'
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">รายการครุภัณฑ์</h1>
    <EquipmentTable />
  </div>
</template>
