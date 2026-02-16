
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Bra = {
    braName: string;
    braPrice: string;
    braDetail: string;
};

export default function Home() {
    const [braName, setBraName] = useState("");
    const [price, setPrice] = useState("");
    const [detail, setDetail] = useState("");
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

    async function addBra() {
        if (!braName || !price) return;

        const bra = {
            braName,
            braPrice: price,
            braDetail: detail,
        };

        const newBra = [...allBra, bra];
        await AsyncStorage.setItem("bra", JSON.stringify(newBra));
        setAllBra(newBra);

        setBraName("");
        setPrice("");
        setDetail("");
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>เพิ่มราย BigBike</Text>

            <View style={styles.card}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ชื่อรถ Bigbike</Text>
                    <TextInput
                        style={styles.input}
                        value={braName}
                        onChangeText={setBraName}
                        placeholder="เช่น Kawasaki H2R "
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>ราคารถ (บาท)</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        placeholder="1,000,000 [บาท]"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>สเปครถ</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={detail}
                        onChangeText={setDetail}
                        placeholder="เช่น 1,000 cc"
                        multiline
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={addBra}>
                    <Text style={styles.buttonText}>บันทึกรายการสินค้า</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eceff1",
        padding: 24,
    },

    header: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 20,
        color: "#000000",
        textAlign: "center",
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,

        shadowColor: "#F48FB1",
        shadowOpacity: 0.35,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 10,

        borderWidth: 1,
        borderColor: "#000000",
    },

    inputGroup: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 6,
        color: "#000000",
    },

    input: {
        borderWidth: 1,
        borderColor: "#696969",
        borderRadius: 14,
        padding: 14,
        fontSize: 16,
        backgroundColor: "#eceff1",
        color: "#000000",
    },

    textArea: {
        height: 90,
        textAlignVertical: "top",
    },

    button: {
        marginTop: 14,
        backgroundColor: "#4dd0e1",
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: "center",

        shadowColor: "#F06292",
        shadowOpacity: 0.6,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
});