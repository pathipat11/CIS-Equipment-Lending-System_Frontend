// middleware/auth.global.ts
import { jwtDecode } from "jwt-decode"

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token")
  const user = useCookie("user")

  if (!token?.value || !user?.value) {
    return navigateTo("/login")
  }

  try {
    const decoded = jwtDecode(token.value)
    const now = Math.floor(Date.now() / 1000)
    if (decoded.exp && decoded.exp < now) {
      return navigateTo("/login")
    }

    if (to.path.startsWith('/admin') && user.value.role !== 'admin') {
      return navigateTo('/')
    }

    if (to.path.startsWith('/student') && user.value.role !== 'student') {
      return navigateTo('/')
    }


  } catch (e) {
    console.error("Invalid JWT:", e)
    return navigateTo("/login")
  }
})
