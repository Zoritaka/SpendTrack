// ShoppingListDetailsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { ShoppingList, ShoppingItem } from '../models/ShoppingList';
import { Alert } from 'react-native';
import { styles } from '../styles/ShoppingListDetailsStyles'; // Импорт стилей

interface ShoppingListDetailsScreenProps {
  route: {
    params: {
      shoppingList: ShoppingList;
      onUpdateList: (updatedList: ShoppingList) => void;
    };
  };
}

export const ShoppingListDetailsScreen: React.FC<ShoppingListDetailsScreenProps> = ({ route }) => {
  const { shoppingList, onUpdateList } = route.params;

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const addItem = () => {
    if (itemName && itemPrice) {
      const newItem = new ShoppingItem(itemName, itemDescription, itemCategory, parseFloat(itemPrice));
      shoppingList.addItem(newItem); // Добавляем новый элемент в список
      onUpdateList(shoppingList); // Обновляем родительский компонент с измененным списком
      resetForm();
      setModalVisible(false);
    } else {
      Alert.alert("Ошибка", "Укажите название и цену товара");
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemDescription('');
    setItemCategory('');
    setItemPrice('');
  };

  const removeItem = (index: number) => {
    shoppingList.removeItem(index); // Удаляем элемент
    onUpdateList(shoppingList); // Обновляем родительский компонент с измененным списком
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{shoppingList.name}</Text>
        <Text>Total: ${shoppingList.total.toFixed(2)}</Text>
        <Button title="Add Item" onPress={() => setModalVisible(true)} />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <TextInput 
            placeholder="Item Name" 
            value={itemName} 
            onChangeText={setItemName} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Description" 
            value={itemDescription} 
            onChangeText={setItemDescription} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Category" 
            value={itemCategory} 
            onChangeText={setItemCategory} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Price" 
            value={itemPrice} 
            onChangeText={setItemPrice} 
            style={styles.input} 
            keyboardType="numeric" 
          />
          <Button title="Add Item" onPress={addItem} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>

      <FlatList
        data={shoppingList.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - {item.category}</Text>
            <Text style={styles.itemText}>${item.price.toFixed(2)}</Text>
            <Text style={styles.itemText}>{item.description}</Text>
            <TouchableOpacity onPress={() => removeItem(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
