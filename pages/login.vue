<!-- pages/login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center ">
        <form @submit.prevent="onLogin" class="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5">
            <h2 class="text-2xl font-semibold text-center">Login</h2>

            <div class="flex flex-col">
                <label for="email" class="mb-1 text-sm font-medium text-gray-700">Email</label>
                <input id="email" v-model="form.email" type="text" required placeholder="Enter your email"
                    class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div class="flex flex-col">
                <label for="password" class="mb-1 text-sm font-medium text-gray-700">Password</label>
                <input id="password" v-model="form.password" type="password" required placeholder="Enter your password"
                    class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div v-if="error" class="text-red-600 text-sm text-center">{{ error }}</div>

            <button type="submit" :disabled="isLoading"
                class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isLoading ? "Logging in..." : "Login" }}
            </button>
            <NuxtLink to="/register">
                Register?
            </NuxtLink>
        </form>
    </div>
</template>

<script setup>
const form = ref({
    email: '',
    password: '',
})

const error = ref('')
const isLoading = ref(false)

const router = useRouter()
const { sendAuth } = useAuth()

const onLogin = async () => {
    error.value = ''
    isLoading.value = true

    const result = await sendAuth(form.value)

    isLoading.value = false

    if (result.success) {
        const token = useCookie('token')
        const user = useCookie('user')

        token.value = result.token
        user.value = result.user // 👈 มี role อยู่ในนี้

        // 🔁 redirect ตาม role
        if (user.value.role === 'admin') {
            router.push('/admin')
        } else if (user.value.role === 'student') {
            router.push('/student')
        } else {
            router.push('/') // fallback
        }

    } else {
        error.value = result.message || 'Login failed. Please try again.'
    }
}

</script>
