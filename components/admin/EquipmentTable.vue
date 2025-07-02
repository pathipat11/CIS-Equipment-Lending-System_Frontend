<script setup>
import EquipmentForm from './EquipmentForm.vue'

const equipments = ref([])
const showForm = ref(false)

const fetchEquipments = async () => {
  const { data } = await useFetch('/api/equipments') // แก้ให้ตรง backend
  equipments.value = data.value || []
}

const onAdded = () => {
  fetchEquipments()
  showForm.value = false
}

onMounted(fetchEquipments)
</script>

<template>
  <div>
    <button @click="showForm = true" class="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      + เพิ่มครุภัณฑ์
    </button>

    <EquipmentForm v-if="showForm" @close="showForm = false" @submitted="onAdded" />

    <table class="min-w-full border">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2">หมายเลข</th>
          <th class="p-2">ชื่อ</th>
          <th class="p-2">ประเภท</th>
          <th class="p-2">ปี</th>
          <th class="p-2">สถานที่</th>
          <th class="p-2">สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in equipments" :key="item.id">
          <td class="p-2">{{ item.code }}</td>
          <td class="p-2">{{ item.name }}</td>
          <td class="p-2">{{ item.category }}</td>
          <td class="p-2">{{ item.registration_year }}</td>
          <td class="p-2">{{ item.location }}</td>
          <td class="p-2">{{ item.condition }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
