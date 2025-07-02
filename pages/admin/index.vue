<template>
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-bold">Welcome, Admin 👋</h1>
        <EquipmentListPreview />
        <SupplyListPreview />
    </div>
</template>

<script setup>
import EquipmentListPreview from '@/components/admin/EquipmentListPreview.vue'
import SupplyListPreview from '@/components/admin/SupplyListPreview.vue'

definePageMeta({
    middleware: ['auth'],
    layout: 'admin',
})
</script>
