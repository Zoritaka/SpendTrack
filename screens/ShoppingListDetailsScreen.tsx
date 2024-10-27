import React, { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/ShoppingListDetailsStyles'; // Импортируйте ваши стили

const ShoppingListDetailsScreen = ({ route }) => {
  const { listTitle, items, setItems } = route.params; // Получение данных списка

  // Стейт для модального окна
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: '', description: '', price: '' });

  // Функция для добавления нового элемента
  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      // Добавление нового элемента в список
      setItems(prevItems => [...prevItems, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ name: '', category: '', description: '', price: '' });
      setModalVisible(false);
    } else {
      Alert.alert("Ошибка", "Пожалуйста, заполните все поля.");
    }
  };

  // Функция для удаления элемента из списка
  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Рассчет итоговой суммы
  const total = items.reduce((acc, item) => acc + parseFloat(item.price || '0'), 0).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{listTitle}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.total}>Итого: ${total}</Text>

      {/* Модальное окно для добавления нового элемента */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Название"
            value={newItem.name}
            onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Категория"
            value={newItem.category}
            onChangeText={(text) => setNewItem({ ...newItem, category: text })}
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Описание"
            value={newItem.description}
            onChangeText={(text) => setNewItem({ ...newItem, description: text })}
            style={styles.modalInput}
          />
          <TextInput
            placeholder="Цена"
            value={newItem.price}
            onChangeText={(text) => setNewItem({ ...newItem, price: text })}
            style={styles.modalInput}
            keyboardType="numeric"
          />
          <Button title="Добавить" onPress={handleAddItem} />
          <Button title="Закрыть" onPress={() => setModalVisible(false)} color="#ff4d4d" />
        </View>
      </Modal>
    </View>
  );
};

export default ShoppingListDetailsScreen;
