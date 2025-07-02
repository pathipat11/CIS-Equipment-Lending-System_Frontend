<template>
    <div class="p-6 space-y-6">
        <h1 class="text-2xl font-bold">ยินดีต้อนรับนักศึกษา 👨‍🎓</h1>

        <div class="grid md:grid-cols-2 gap-4">
            <!-- ครุภัณฑ์ -->
            <div class="border p-4 rounded shadow">
                <h2 class="text-lg font-semibold mb-2">รายการครุภัณฑ์</h2>
                <ul class="divide-y">
                    <li v-for="item in equipmentList.slice(0, 5)" :key="item.id" class="py-2">
                        {{ item.name }} - <span :class="item.status === 'ว่าง' ? 'text-green-600' : 'text-red-600'">
                            {{ item.status }}
                        </span>
                    </li>
                </ul>
                <NuxtLink to="/student/borrow" class="text-blue-500 underline">+ ยืมครุภัณฑ์</NuxtLink>
            </div>

            <!-- วัสดุภัณฑ์ -->
            <div class="border p-4 rounded shadow">
                <h2 class="text-lg font-semibold mb-2">รายการวัสดุภัณฑ์</h2>
                <ul class="divide-y">
                    <li v-for="item in supplyList.slice(0, 5)" :key="item.id" class="py-2">
                        {{ item.name }} - คงเหลือ {{ item.quantity }}
                    </li>
                </ul>
                <NuxtLink to="/student/borrow-supply" class="text-blue-500 underline">+ ยืมวัสดุภัณฑ์</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useEquipment } from '@/composables/equipment'
import { useSupply } from '@/composables/supply'

const { equipmentList, fetchEquipment } = useEquipment()
const { supplyList, fetchSupply } = useSupply()

onMounted(() => {
    fetchEquipment()
    fetchSupply()
})

definePageMeta({
    middleware: ['auth'],
    layout: 'student', // หรือใช้ layout: 'student' หากมี layout แยก
})
</script>