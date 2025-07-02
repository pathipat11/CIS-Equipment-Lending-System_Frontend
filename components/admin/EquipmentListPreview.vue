<template>
  <div class="space-y-3">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">รายการครุภัณฑ์</h2>
      <button @click="openModal" class="px-4 py-2 bg-blue-500 text-white rounded">+ เพิ่มครุภัณฑ์</button>
    </div>

    <table class="w-full border-collapse border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-2 py-1">ชื่อ</th>
          <th class="border px-2 py-1">ประเภท</th>
          <th class="border px-2 py-1">สถานที่</th>
          <th class="border px-2 py-1">สภาพ</th>
          <th class="border px-2 py-1">สถานะ</th>
          <th class="border px-2 py-1">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in equipment" :key="item.id">
          <td class="border px-2 py-1">{{ item.name }}</td>
          <td class="border px-2 py-1">{{ item.category }}</td>
          <td class="border px-2 py-1">{{ item.location }}</td>
          <td class="border px-2 py-1">{{ item.condition }}</td>
          <td class="border px-2 py-1">{{ item.status }}</td>
          <td class="border px-2 py-1 space-x-2">
            <button @click="editItem(item)" class="text-blue-500">แก้ไข</button>
            <button @click="deleteItem(item.id)" class="text-red-500">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- modal เพิ่ม/แก้ไข -->
    <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div class="bg-white p-4 rounded w-[90%] max-w-md space-y-2">
        <h3 class="text-lg font-bold">{{ editMode ? "แก้ไข" : "เพิ่ม" }} ครุภัณฑ์</h3>

        <input v-model="form.name" placeholder="ชื่อครุภัณฑ์" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.register_year" placeholder="ปีที่ขึ้นทะเบียน" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.category" placeholder="ประเภท" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.location" placeholder="สถานที่" class="w-full border px-2 py-1 rounded" />
        <input v-model="form.condition" placeholder="สภาพ (เช่น: ใช้งานได้)" class="w-full border px-2 py-1 rounded" />
        <select v-model="form.status" class="w-full border px-2 py-1 rounded">
          <option>ว่าง</option>
          <option>ไม่ว่าง</option>
        </select>

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

<script setup>
import { ref, onMounted } from 'vue'
import { useEquipment } from '@/composables/equipment'

const {
  equipmentList,
  fetchEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} = useEquipment()

const equipment = equipmentList
const showModal = ref(false)
const editMode = ref(false)
const editId = ref(null)

const form = ref({
  name: '',
  register_year: '',   // ✅ ต้องใช้ชื่อนี้
  category: '',
  location: '',
  condition: '',
  status: 'ว่าง'
})


const openModal = () => {
  form.value = {
    name: '',
    register_year: '',   // ✅ ต้องใช้ชื่อนี้
    category: '',
    location: '',
    condition: '',
    status: 'ว่าง'
  }
  editMode.value = false
  editId.value = null
  showModal.value = true
}

const editItem = (item) => {
  form.value = { ...item }
  editId.value = item.id
  editMode.value = true
  showModal.value = true
}

const save = async () => {
  const payload = {
    ...form.value,
    register_year: Number(form.value.register_year), // สำคัญ!
  }

  console.log("📤 ส่งข้อมูล", payload)

  if (editMode.value) {
    await updateEquipment(payload, editId.value)
  } else {
    await createEquipment(payload)
  }

  await fetchEquipment()
  closeModal()
}


const deleteItem = async (id) => {
  if (confirm("คุณแน่ใจว่าต้องการลบรายการนี้หรือไม่?")) {
    await deleteEquipment(id)
    await fetchEquipment()
  }
}

const closeModal = () => {
  showModal.value = false
}

onMounted(fetchEquipment)
</script>
