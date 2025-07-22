// composables/useAdmin.js
import * as service from '@/service/admin.service'
import { ref } from 'vue'

export const useAdmin = () => {
  const adminList = ref([])
  const isLoading = ref(false)

  const fetchAdmins = async () => {
    isLoading.value = true
    try {
      const res = await service.fetchAdmin({ page: 1, size: 100 })
      adminList.value = res.data.data || []
    } catch (err) {
      console.error('❌ โหลดข้อมูลผู้ดูแลระบบล้มเหลว', err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    adminList,
    isLoading,
    fetchAdmins,
  }
}
