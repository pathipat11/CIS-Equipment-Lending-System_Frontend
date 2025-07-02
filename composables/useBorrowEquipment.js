import * as service from '@/service/borrowEquipment.service'
import { ref } from 'vue'

export const useBorrowEquipment = () => {
    const borrowList = ref([])
    const isLoading = ref(false)

    const fetchBorrow = async () => {
        isLoading.value = true
        try {
            const res = await service.fetchBorrowEquipment()
            borrowList.value = res.data.data || []
        } catch (err) {
            console.error("❌ โหลดข้อมูลยืมครุภัณฑ์ล้มเหลว", err)
        } finally {
            isLoading.value = false
        }
    }

    const createBorrow = async (payload) => {
        return service.createBorrowEquipment(payload)
    }

    const updateBorrow = async (payload, id) => {
        return service.updateBorrowEquipment(payload, id)
    }

    const getBorrowById = async (id) => {
        try {
            const res = await service.getBorrowEquipmentById(id)
            return res.data.data || null
        } catch (err) {
            console.error("❌ ดึงข้อมูลการยืมตาม ID ล้มเหลว", err)
            return null
        }
    }

    return {
        borrowList,
        isLoading,
        fetchBorrow,
        createBorrow,
        updateBorrow,
        getBorrowById
    }
}
