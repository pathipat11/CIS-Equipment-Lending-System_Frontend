<script setup>
import SupplyTable from '@/components/admin/SupplyTable.vue'

definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">วัสดุภัณฑ์</h1>
    <SupplyTable />
  </div>
</template>
