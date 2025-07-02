<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
  requiresAuth: true,
})

const user = useCookie('user')
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <p class="text-gray-600">Welcome, {{ user.value?.name }} ({{ user.value?.role }})</p>

    <!-- ตัวอย่างลิงก์เมนู -->
    <div class="mt-6 space-y-2">
      <NuxtLink to="/admin/borrow-equipments" class="block text-blue-600 hover:underline">จัดการการยืมอุปกรณ์</NuxtLink>
      <NuxtLink to="/admin/borrow-supplies" class="block text-blue-600 hover:underline">จัดการการยืมของใช้</NuxtLink>
      <NuxtLink to="/admin/equipments" class="block text-blue-600 hover:underline">อุปกรณ์ทั้งหมด</NuxtLink>
      <NuxtLink to="/admin/students" class="block text-blue-600 hover:underline">รายชื่อนักศึกษา</NuxtLink>
    </div>
  </div>
</template>
