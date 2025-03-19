import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Font,
} from "@react-pdf/renderer";

// Register the font in React PDF
Font.register({
    family: "Noto Sans Bengali",
    src: "/fonts/banglafont.ttf",
});

// Define styles
const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12, fontFamily: "Noto Sans Bengali" }, // Apply font globally
    headerSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        marginBottom: 20,
    },
    logo: { width: 60, height: 30 },
    shopNameContainer: {
        flexDirection: "row",
        alignItems: "center",
       
    },
    shopName: { fontSize: 22, fontWeight: "bold", color: "#22c55e" }, // Green color
    pageTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    section: { marginBottom: 10 },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between", // Aligns order details & address side by side
        width: "100%",
    },
    leftColumn: {
        width: "50%",
    },
    rightColumn: {
        width: "50%",
        textAlign: "right", // Aligns text to the right for address
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 20,
    },
    row: { flexDirection: "row", borderBottom: "1px solid #000" },
    col: { width: "14%", padding: 5, textAlign: "center" },
    bold: { fontWeight: "bold" },
    footer: {
        textAlign: "center",
        fontSize: 10,
        marginTop: 100,
        borderTop: "1px solid #000",
        paddingTop: 10,
    },
});

const OrderPDF = ({ order }) => (
    <Document>
        <Page style={styles.page}>
            {/* Header Section (Logo + Shop Name) */}
            <View style={styles.headerSection}>
                <Image style={styles.logo} src="/logo/logo.png" />
                <View style={styles.shopNameContainer}>
                    <Text style={styles.shopName}>স্বপ্ন</Text>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#28282B",
                            fontWeight: "bold",
                            marginLeft: 2, // Ensure text is next to each other
                        }}
                    >
                        Mela
                    </Text>
                </View>
            </View>

            {/* Order Title */}
            <Text style={styles.pageTitle}>Order Proof</Text>

            {/* Order Details & Shipping Address Side by Side */}
            <View style={styles.detailsContainer}>
                {/* Order Details (Left Side) */}
                <View style={styles.leftColumn}>
                    <Text>Order : #{order.id}</Text>
                    <Text>Status: {order.status}</Text>
                    <Text>
                        Date: {new Date(order.created_at).toLocaleDateString()}
                    </Text>
                </View>

                {/* Customer Shipping Address (Right Side) */}
                <View style={styles.rightColumn}>
                    <Text style={styles.bold}>Shipping Address:</Text>
                    <Text>{order.name}</Text>
                    <Text>{order.address}</Text>
                    <Text>Phone: {order.phone}</Text>
                </View>
            </View>

            {/* Order Items Table */}
            <View style={styles.table}  >
                <View style={[styles.row, { backgroundColor: "#f2f2f2" }]}>
                    <Text style={[styles.col, styles.bold]}>Product</Text>
                    <Text style={[styles.col, styles.bold]}>Color</Text>
                    <Text style={[styles.col, styles.bold]}>Size</Text>
                    <Text style={[styles.col, styles.bold]}>Qty</Text>
                    <Text style={[styles.col, styles.bold]}>Payment</Text>
                    <Text style={[styles.col, styles.bold]}>Status</Text>
                    <Text style={[styles.col, styles.bold]}>Total</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.col}>{order.product_name}</Text>
                    <Text style={styles.col}>{order.product_color}</Text>
                    <Text style={styles.col}>{order.product_size}</Text>
                    <Text style={styles.col}>{order.product_quantity}</Text>
                    <Text style={styles.col}>{order.payment_method}</Text>
                    <Text style={styles.col}>{order.status}</Text>
                    <Text style={styles.col}>৳{order.amount}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Thank you for your order!</Text>
                <Text>Contact us: support@shopnomela.com</Text>
                <Text>Track your order: Go to your order page</Text>
            </View>
        </Page>
    </Document>
);

export default OrderPDF;
