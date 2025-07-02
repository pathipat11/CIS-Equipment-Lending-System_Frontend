<script setup>
const emit = defineEmits(['submitted', 'close'])
const form = ref({
  name: '',
  purchase_date: '',
  category: '',
  quantity: 1,
  location: ''
})
const isLoading = ref(false)
const { createSupply } = useSupply()

const onSubmit = async () => {
  isLoading.value = true
  try {
    const payload = {
      ...form.value,
      purchase_date: new Date(form.value.purchase_date).getTime() / 1000 // ✅ ต้องแปลงเป็น timestamp
    }
    await createSupply(payload)
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
    <h2 class="text-xl font-semibold mb-4">เพิ่มวัสดุภัณฑ์</h2>
    <form @submit.prevent="onSubmit" class="space-y-3">
      <input v-model="form.name" placeholder="ชื่อวัสดุภัณฑ์" class="input" required />
      <input v-model="form.purchase_date" type="date" class="input" required />
      <input v-model="form.category" placeholder="ประเภท" class="input" required />
      <input v-model.number="form.quantity" type="number" min="1" class="input" required />
      <input v-model="form.location" placeholder="สถานที่จัดเก็บ" class="input" required />

      <div class="flex gap-2">
        <button type="submit" :disabled="isLoading" class="bg-green-600 text-white px-4 py-2 rounded">
          บันทึก
        </button>
        <button type="button" @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded">
          ยกเลิก
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.input {
  @apply w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300;
}
</style>
