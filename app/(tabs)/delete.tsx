import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Bra = {
  braName: string;
  braPrice: string;
  braDetail: string;
};

export default function BraListScreen() {
  const [allBra, setAllBra] = useState<Bra[]>([]);

  // ⚠️ แก้ไข: เปลี่ยนจาก [allBra] เป็น [] เพื่อโหลดแค่ครั้งเดียวตอนเปิดหน้า
  // ป้องกันแอปค้างจากการวนลูป
  useEffect(() => {
    loadBra();
  }, []);

  async function loadBra() {
    try {
      const data = await AsyncStorage.getItem("bra");
      if (data) {
        setAllBra(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 2. ฟังก์ชันถามก่อนลบ
  const confirmDelete = (index: number) => {
    Alert.alert(
      "ยืนยันการลบ",
      "คุณแน่ใจหรือไม่ที่จะลบรายการอาหารนี้?",
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "ลบรายการ", 
          style: "destructive", // สไตล์ปุ่มสีแดง (บน iOS)
          onPress: () => removeBra(index) 
        },
      ]
    );
  };

  async function removeBra(index: number) {
    // ลบข้อมูลจริง
    const newBra = allBra.filter((_, i) => i !== index);
    setAllBra(newBra);
    await AsyncStorage.setItem("bra", JSON.stringify(newBra));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>รายการ BigBike</Text>

      <FlatList
        data={allBra}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <Text style={styles.name}>{item.braName}</Text>

              <View style={styles.priceBadge}>
                <Text style={styles.price}>฿{item.braPrice}</Text>
              </View>
            </View>

            <Text style={styles.desc}>{item.braDetail}</Text>

            {/* ส่วนปุ่มลบที่ปรับปรุงแล้ว */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => confirmDelete(index)} // เรียกใช้ confirmDelete
            >
              <Text style={styles.deleteText}>🗑️ ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              ยังไม่มีรายการอาหาร
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1",
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#263238",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#e0f2f1",
    padding: 20,
    borderRadius: 22,
    marginBottom: 16,
    shadowColor: "#F48FB1",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 3,
    borderColor: "#00695c",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    flex: 1,
    paddingRight: 10,
  },
  priceBadge: {
    backgroundColor: "#004d40",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#F06292",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    color: "#6A1B4D",
    lineHeight: 20,
  },
  // ปรับสไตล์ปุ่มลบให้เด่นชัดขึ้น
  deleteBtn: {
    alignSelf: "flex-end",
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ffebee", // พื้นหลังแดงอ่อน
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  deleteText: {
    color: "#d32f2f", // ตัวหนังสือสีแดงเข้ม
    fontWeight: "700",
    fontSize: 14,
  },
  emptyBox: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#263238",
    fontWeight: "600",
  },
});