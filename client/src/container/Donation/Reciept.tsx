import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
});

const Receipt = ({ receiptData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Church</Text>
        <Text style={styles.subHeader}>Order ID: {receiptData.orderId}</Text>
        <Text style={styles.subHeader}>Date: {receiptData.date}</Text>

        {/* Customer Information */}
        <Text style={styles.subHeader}>Customer Information:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text>{receiptData.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text>{receiptData.customerEmail}</Text>
        </View>

        {/* Products */}
        <Text style={styles.subHeader}>Products:</Text>
        {receiptData.products.map((product: any, index: any) => (
          <View key={index} style={styles.row}>
            <Text>{product.name}</Text>
            <Text>${product.price}</Text>
          </View>
        ))}

        {/* Total */}
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text>${receiptData.total}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default Receipt;
