import { View, Text, StyleSheet } from "react-native";
import React from "react";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style = {styles.orderinfo}>
        <Text>Order ID : {order._id}</Text>
        <Text>Date : {order.date}</Text>
      </View>
      <Text>Product name : {order.productInfo.name}</Text>
      <Text>Product price : {order.productInfo.price}</Text>
      <Text>Quantity : {order.productInfo.qty}</Text>
      <Text>Total Amount : {order.totalAmout} $</Text>
      <View>
        <Text style = {styles.status}>Order Status : {order.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  orderinfo:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 5,
  },
  status : {
    borderTopWidth: 1,
    fontWeight: 'bold',
    borderColor: 'lightgray',
    padding: 5,
  }
});
export default OrderItem;
