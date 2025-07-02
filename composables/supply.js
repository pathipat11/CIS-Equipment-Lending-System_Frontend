import service from "../service"
import { ref } from "vue"

export const useSupply = () => {
  const supplyList = ref([])
  const isLoading = ref(false)

  const fetchSupply = async () => {
    isLoading.value = true
    try {
      const res = await service.supply.fetchSupply()
      console.log("✅ โหลดวัสดุสิ้นเปลืองสำเร็จ", res.data)
      supplyList.value = res.data.data || []
    } catch (err) {
      console.error("❌ โหลดวัสดุล้มเหลว", err)
      supplyList.value = []
    } finally {
      isLoading.value = false
    }
  }

  const createSupply = async (payload) => {
    try {
      await service.supply.createSupply(payload)
      await fetchSupply()
    } catch (err) {
      console.error("❌ เพิ่มวัสดุล้มเหลว", err)
    }
  }

  const updateSupply = async (payload, id) => {
    try {
      await service.supply.updateSupply(payload, id)
      await fetchSupply()
    } catch (err) {
      console.error("❌ แก้ไขวัสดุล้มเหลว", err)
    }
  }

  const deleteSupply = async (id) => {
    try {
      await service.supply.deleteSupply(id)
      await fetchSupply()
    } catch (err) {
      console.error("❌ ลบวัสดุล้มเหลว", err)
    }
  }
  const getSupplyById = async (id) => {
    try {
      const res = await service.supply.getSupplyById(id)
      return res.data.data || {}
    } catch (err) {
      console.error("❌ โหลดวัสดุตาม ID ล้มเหลว", err)
      return null
    }
  }

  return {
    supplyList,
    isLoading,
    fetchSupply,
    createSupply,
    updateSupply,
    deleteSupply,
    getSupplyById,
  }
}
