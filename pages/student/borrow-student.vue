<script setup>
import { ref, onMounted } from 'vue'
import { useEquipment } from '@/composables/equipment'
import { useBorrowEquipment } from '@/composables/useBorrowEquipment'
import { useAdmin } from '@/composables/admin' // ✅ ต้องสร้างใหม่หรือนำเข้าจากที่มีอยู่

const { equipmentList, fetchEquipment } = useEquipment()
const { createBorrow } = useBorrowEquipment()
const { adminList, fetchAdmin } = useAdmin() // ✅ ต้องมีข้อมูล admin ทั้งหมด

const form = ref({
  student_id: '',
  full_name: '',
  phone: '',
  email: '',
  equipment_id: '',
  admin_id: '', // ✅ ใช้ v-model กับ dropdown
  borrow_date: new Date().toISOString().substring(0, 10),
  return_date: '',
})

const status = ref('')
const isSubmitting = ref(false)

const validateReturnDate = () => {
  const borrow = new Date(form.value.borrow_date)
  const returnD = new Date(form.value.return_date)
  const diffDays = (returnD - borrow) / (1000 * 60 * 60 * 24)
  return diffDays <= 15 && diffDays >= 0
}

const submit = async () => {
  if (!validateReturnDate()) {
    status.value = '⚠️ วันที่คืนต้องไม่เกิน 15 วันนับจากวันที่ยืม'
    return
  }

  isSubmitting.value = true
  status.value = ''

  try {
    await createBorrow({
      student_id: form.value.student_id,
      equipment_id: form.value.equipment_id,
      admin_id: form.value.admin_id,
      borrow_date: Math.floor(new Date(form.value.borrow_date).getTime() / 1000),
      return_due: Math.floor(new Date(form.value.return_date).getTime() / 1000),
    })
    status.value = '✅ บันทึกข้อมูลการยืมสำเร็จ'
    form.value = {
      student_id: '',
      full_name: '',
      phone: '',
      email: '',
      equipment_id: '',
      admin_id: '',
      borrow_date: new Date().toISOString().substring(0, 10),
      return_date: '',
    }
  } catch (err) {
    console.error(err)
    status.value = '❌ เกิดข้อผิดพลาดในการบันทึกข้อมูล'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchEquipment()
  fetchAdmin()
})
</script>

<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
    <h1 class="text-2xl font-bold">แบบฟอร์มยืมครุภัณฑ์</h1>

    <form @submit.prevent="submit" class="space-y-3">
      <input v-model="form.student_id" class="input" placeholder="รหัสนักศึกษา" required />
      <input v-model="form.full_name" class="input" placeholder="ชื่อ-สกุล" required />
      <input v-model="form.phone" class="input" placeholder="เบอร์โทร" required />
      <input v-model="form.email" class="input" type="email" placeholder="อีเมล" required />

      <select v-model="form.equipment_id" class="input" required>
        <option disabled value="">-- เลือกครุภัณฑ์ --</option>
        <option v-for="item in equipmentList.filter((e) => e.status === 'ว่าง')" :key="item.id" :value="item.id">
          {{ item.name }} - ({{ item.location }})
        </option>
      </select>

      <select v-model="form.admin_id" class="input" required>
        <option disabled value="">-- เลือกอาจารย์ผู้ให้ยืม --</option>
        <option v-for="admin in adminList" :key="admin.id" :value="admin.id">
          {{ admin.name }}
        </option>
      </select>

      <div class="flex gap-2">
        <div class="w-1/2">
          <label class="text-sm">วันที่ยืม</label>
          <input v-model="form.borrow_date" type="date" class="input" required />
        </div>
        <div class="w-1/2">
          <label class="text-sm">วันที่คืน</label>
          <input v-model="form.return_date" type="date" class="input" required />
        </div>
      </div>

      <p class="text-sm text-red-500" v-if="status.includes('⚠️') || status.includes('❌')">{{ status }}</p>
      <p class="text-sm text-green-600" v-if="status.includes('✅')">{{ status }}</p>

      <button :disabled="isSubmitting" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        ยืนยันการยืม
      </button>
    </form>
  </div>
</template>

<style>
.input {
  @apply w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300;
}
</style>
