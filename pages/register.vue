<!-- pages/login.vue -->
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <form @submit.prevent="onRegister" class="bg-white p-8 rounded shadow-md w-full max-w-md space-y-5">
            <h2 class="text-2xl font-semibold text-center">Login</h2>

            <div class="flex flex-col">
                <label for="name" class="mb-1 text-sm font-medium text-gray-700">Name</label>
                <input id="name" v-model="form.name" type="text" required placeholder="Enter your name"
                    class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div class="flex flex-col">
                <label for="phone_number" class="mb-1 text-sm font-medium text-gray-700">Phone Number</label>
                <input id="phone_number" v-model="form.phone_number" type="text" required
                    placeholder="Enter your phone number"
                    class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div class="flex flex-col">
                <label for="student_number" class="mb-1 text-sm font-medium text-gray-700">Student Number</label>
                <input id="student_number" v-model="form.student_number" type="text" required
                    placeholder="Enter your student number"
                    class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>

            <div class=" flex flex-col">
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
                {{ isLoading ? "with a loading..." : "Submit" }}
            </button>
        </form>
    </div>
</template>

<script setup>
const form = ref({
    name: '',
    phone_number: '',
    student_number: '',
    email: '',
    password: '',
    role: 'student',
})

const isLoading = ref(false)
const router = useRouter()
const authStore = useAuth()

const onRegister = async () => {
    console.log(form.value)
    isLoading.value = true

    await authStore.sendRegister(form.value)

    isLoading.value = false

    router.push('/login')
}
</script>