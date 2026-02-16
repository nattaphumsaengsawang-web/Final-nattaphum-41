import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Bra = {
  allCar: string;
  carlist: string;
  bigbikeList: string;
};

export default function BraListScreen() {
  const [allBra, setAllBra] = useState<Bra[]>([]);

  useEffect(() => {
    loadBra();
  }, [allBra]);

  async function loadBra() {
    const data = await AsyncStorage.getItem("bra");
    if (data) {
      setAllBra(JSON.parse(data));
    }
  }

  async function removeBra(index: number) {
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
              <Text style={styles.name}>{item.allCar}</Text>

              <View style={styles.priceBadge}>
                <Text style={styles.price}>฿{item.carlist}</Text>
              </View>
            </View>

            <Text style={styles.desc}>{item.bigbikeList}</Text>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => removeBra(index)}
            >
              <Text style={styles.deleteText}>ลบรายการ</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              ยังไม่มีรายอาหาร
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

  deleteBtn: {
    alignSelf: "flex-end",
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  deleteText: {
    color: "#000000",
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