<script setup>
const emit = defineEmits(['close', 'submitted'])

const form = ref({
  code: '',
  name: '',
  registration_year: '',
  category: '',
  location: '',
  condition: 'ใช้งานได้',
})

const isLoading = ref(false)
const { $api } = useNuxtApp() // ถ้าใช้ plugin API หรือเปลี่ยนเป็น useFetch

const onSubmit = async () => {
  isLoading.value = true

  try {
    await $api.equipment.create(form.value) // หรือใช้ useFetch(`/api/equipment`, { method: 'POST', body: form.value })
    emit('submitted')
  } catch (err) {
    console.error('Create failed', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="bg-white border rounded shadow p-4 mb-4">
    <h2 class="text-xl font-semibold mb-4">เพิ่มครุภัณฑ์</h2>
    <form @submit.prevent="onSubmit"
      class="space-y-3 w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300;">
      <input v-model="form.code" placeholder="หมายเลขครุภัณฑ์" class="input" required />
      <input v-model="form.name" placeholder="ชื่อครุภัณฑ์" class="input" required />
      <input v-model="form.registration_year" placeholder="ปีที่ขึ้นทะเบียน" class="input" required />
      <input v-model="form.category" placeholder="ประเภทครุภัณฑ์" class="input" required />
      <input v-model="form.location" placeholder="สถานที่จัดเก็บ" class="input" required />

      <select v-model="form.condition" class="input">
        <option>ใช้งานได้</option>
        <option>ชำรุด</option>
        <option>ซ่อมบำรุง</option>
        <option>จำหน่าย</option>
      </select>

      <div class="flex gap-2">
        <button type="submit" :disabled="isLoading"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          บันทึก
        </button>
        <button @click.prevent="$emit('close')" class="bg-gray-300 px-4 py-2 rounded">
          ยกเลิก
        </button>
      </div>
    </form>
  </div>
</template>