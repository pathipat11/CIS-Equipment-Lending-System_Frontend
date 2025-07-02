<script setup>
import SupplyForm from './SupplyForm.vue'
import { useSupply } from '@/composables/supply'

const showForm = ref(false)
const { supplyList, fetchSupply } = useSupply()

const onAdded = async () => {
  await fetchSupply()
  showForm.value = false
}

onMounted(fetchSupply)
</script>

<template>
  <div>
    <button @click="showForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      + เพิ่มวัสดุภัณฑ์
    </button>

    <SupplyForm v-if="showForm" @submitted="onAdded" @close="showForm = false" />

    <table class="min-w-full border">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">ชื่อ</th>
          <th class="p-2">ประเภท</th>
          <th class="p-2">วันที่จัดซื้อ</th>
          <th class="p-2">จำนวน</th>
          <th class="p-2">สถานที่</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in supplyList" :key="item.id">
          <td class="p-2">{{ item.name }}</td>
          <td class="p-2">{{ item.category }}</td>
          <td class="p-2">{{ new Date(item.purchase_date * 1000).toLocaleDateString('th-TH') }}</td>
          <td class="p-2">{{ item.quantity }}</td>
          <td class="p-2">{{ item.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
