<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Welcome, Admin 🧑‍💼</h1>
      <button @click="onLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
    <NuxtPage />
  </div>
</template>


<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'default',
})

const { sendLogout } = useAuth()
const router = useRouter()

const onLogout = async () => {
  await sendLogout()
  const token = useCookie('token')
  const user = useCookie('user')
  token.value = null
  user.value = null
  router.push('/login')
}
</script>
