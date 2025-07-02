<script setup>
import { ref, onMounted } from 'vue'
import { useSupply } from '@/composables/supply'

const {
  supplyList,
  fetchSupply,
  createSupply,
  updateSupply,
  deleteSupply,
} = useSupply()

const supplies = supplyList
const showModal = ref(false)
const editMode = ref(false)
const editId = ref(null)

const form = ref({
  name: '',
  purchase_date: '',
  category: '',
  quantity: 1,
  location: ''
})

const openModal = () => {
  form.value = {
    name: '',
    purchase_date: '',
    category: '',
    quantity: 1,
    location: ''
  }
  editMode.value = false
  editId.value = null
  showModal.value = true
}

const editItem = (item) => {
  form.value = {
    ...item,
    purchase_date: new Date(item.purchase_date * 1000).toISOString().split('T')[0] // แปลง timestamp → YYYY-MM-DD
  }
  editId.value = item.id
  editMode.value = true
  showModal.value = true
}

const save = async () => {
  const payload = {
    ...form.value,
    purchase_date: new Date(form.value.purchase_date).getTime() / 1000 // แปลงกลับเป็น timestamp
  }

  if (editMode.value) {
    await updateSupply(payload, editId.value)
  } else {
    await createSupply(payload)
  }

  await fetchSupply()
  closeModal()
}

const deleteItem = async (id) => {
  if (confirm("คุณแน่ใจว่าต้องการลบรายการนี้หรือไม่?")) {
    await deleteSupply(id)
    await fetchSupply()
  }
}

const closeModal = () => {
  showModal.value = false
}

onMounted(fetchSupply)
</script>

<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">รายการวัสดุสิ้นเปลือง</h2>
      <button @click="openModal" class="px-4 py-2 bg-blue-500 text-white rounded">+ เพิ่มวัสดุ</button>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1">ชื่อ</th>
          <th class="border px-2 py-1">ประเภท</th>
          <th class="border px-2 py-1">วันที่จัดซื้อ</th>
          <th class="border px-2 py-1">จำนวน</th>
          <th class="border px-2 py-1">สถานที่</th>
          <th class="border px-2 py-1">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in supplies" :key="item.id">
          <td class="border px-2 py-1">{{ item.name }}</td>
          <td class="border px-2 py-1">{{ item.category }}</td>
          <td class="border px-2 py-1">{{ new Date(item.purchase_date * 1000).toLocaleDateString('th-TH') }}</td>
          <td class="border px-2 py-1">{{ item.quantity }}</td>
          <td class="border px-2 py-1">{{ item.location }}</td>
          <td class="border px-2 py-1 space-x-2">
            <button @click="editItem(item)" class="text-blue-500">แก้ไข</button>
            <button @click="deleteItem(item.id)" class="text-red-500">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div class="bg-white p-4 rounded w-[90%] max-w-md space-y-2">
        <h3 class="text-lg font-bold">{{ editMode ? "แก้ไข" : "เพิ่ม" }} วัสดุสิ้นเปลือง</h3>

        <input v-model="form.name" placeholder="ชื่อวัสดุ" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.purchase_date" type="date" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.category" placeholder="ประเภท" class="w-full border px-2 py-1 rounded" />
        <input v-model.number="form.quantity" type="number" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.location" placeholder="สถานที่" class="w-full border px-2 py-1 rounded" />

        <div class="flex justify-end gap-2">
          <button @click="save" class="bg-green-500 text-white px-4 py-1 rounded">
            {{ editMode ? "บันทึก" : "เพิ่ม" }}
          </button>
          <button @click="closeModal" class="text-gray-500">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
</template>
