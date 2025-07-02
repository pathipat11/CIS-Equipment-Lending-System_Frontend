// composables/equipment.js
import service from "../service"
import { ref } from "vue"

export const useEquipment = () => {
  const query = ref({ page: 1, size: 10 })
  const equipmentList = ref([])
  const isLoading = ref(false)

  const fetchEquipment = async () => {
    isLoading.value = true
    try {
      console.log("🔄 กำลังโหลดข้อมูลครุภัณฑ์...")
      const res = await service.equipment.fetchEquipment(query.value)
      console.log("✅ โหลดข้อมูลสำเร็จ:", res.data)
      equipmentList.value = res.data.data || []
    } catch (err) {
      console.error("❌ โหลดข้อมูลล้มเหลว:", err)
      equipmentList.value = []
    } finally {
      isLoading.value = false
    }
  }

  const createEquipment = async (payload) => {
    try {
      await service.equipment.createEquipment(payload)
      console.log("✅ เพิ่มครุภัณฑ์สำเร็จ")
      await fetchEquipment()
      return true
    } catch (err) {
      console.error("❌ เพิ่มครุภัณฑ์ล้มเหลว:", err)
      return false
    }
  }

  const updateEquipment = async (payload, id) => {
    try {
      await service.equipment.updateEquipment(payload, id)
      console.log("✅ แก้ไขครุภัณฑ์สำเร็จ")
      await fetchEquipment()
      return true
    } catch (err) {
      console.error("❌ แก้ไขครุภัณฑ์ล้มเหลว:", err)
      return false
    }
  }

  const deleteEquipment = async (id) => {
    try {
      await service.equipment.deleteEquipment(id)
      console.log("✅ ลบครุภัณฑ์สำเร็จ")
      await fetchEquipment()
      return true
    } catch (err) {
      console.error("❌ ลบครุภัณฑ์ล้มเหลว:", err)
      return false
    }
  }

  return {
    equipmentList,
    isLoading,
    fetchEquipment,
    createEquipment,
    updateEquipment,
    deleteEquipment
  }
}
