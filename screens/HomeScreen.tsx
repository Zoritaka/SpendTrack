import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { ShoppingList } from '../models/ShoppingList';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/MainScreenStyles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const HomeScreen = ({navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'asc' | 'desc' | 'alpha' | 'date'>('date');
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    loadShoppingLists();
  }, []);

  const saveShoppingLists = async (lists: ShoppingList[]) => {
    try {
      const jsonValue = JSON.stringify(lists.map(list => list.toJSON()));
      await AsyncStorage.setItem('@shopping_lists', jsonValue);
      console.log('Shopping lists saved successfully');
    } catch (error) {
      console.error('Failed to save shopping lists:', error);
    }
  };

  const loadShoppingLists = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@shopping_lists');
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        const lists = data.map((listData: any) => ShoppingList.fromJSON(listData));
        setShoppingLists(lists);
      }
    } catch (error) {
      console.error('Failed to load shopping lists:', error);
    }
  };

  const addNewShoppingList = async () => {
    if (newListName.trim()) {
      const newList = new ShoppingList(newListName);
      const updatedShoppingLists = [...shoppingLists, newList];
      setShoppingLists(updatedShoppingLists);
      setNewListName('');
      setModalVisible(false);

      try {
        await saveShoppingLists(updatedShoppingLists);
        Alert.alert('Успех', 'Список успешно сохранен в хранилище');
      } catch (error) {
        console.error('Ошибка сохранения списка', error);
        Alert.alert('Ошибка', 'Не удалось сохранить список в хранилище');
      }
    }
  };

  const handleAddShoppingList = (newList: ShoppingList) => {
    const updatedLists = [...shoppingLists, newList];
    saveShoppingLists(updatedLists);
  };

  const showDeleteConfirmation = (id: string) => {
    setListToDelete(id);
    setDeleteConfirmVisible(true);
  };

  const confirmDeleteShoppingList = () => {
    if (listToDelete) {
      setShoppingLists(shoppingLists.filter(list => list.id !== listToDelete));
    }
    setDeleteConfirmVisible(false);
    setListToDelete(null);
  };

  const updateShoppingList = async (updatedList: ShoppingList) => {
    const updatedShoppingLists = shoppingLists.map(list =>
      list.id === updatedList.id ? updatedList : list
    );
    setShoppingLists(updatedShoppingLists);
    await saveShoppingLists(updatedShoppingLists);
  };
  // Функция для сортировки списков
  const sortLists = () => {
    let sortedLists = [...shoppingLists];
    switch (sortOption) {
      case 'asc':
        sortedLists.sort((a, b) => a.total - b.total);
        break;
      case 'desc':
        sortedLists.sort((a, b) => b.total - a.total);
        break;
      case 'alpha':
        sortedLists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        sortedLists.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    return sortedLists;
  };

  const filteredLists = sortLists().filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Кнопка для проверки локальных данных */}
      {/*<Button title="Показать сохраненные данные" onPress={async () => {
      try {
        const storedData = await AsyncStorage.getItem('@shopping_lists');
        if (storedData) {
          Alert.alert('Сохраненные данные', storedData);
        } else {
          Alert.alert('Сохраненные данные', 'Нет данных в хранилище');
        }
      } catch (e) {
        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      }
      }} />
      */}

      {/* поле поиска */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search lists..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Кнопка для добавления нового списка */}
      <Button title="Add New List" onPress={() => setModalVisible(true)} />

      {/* Модальное окно для создания нового списка */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text>Create New Shopping List</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="List Name"
            value={newListName}
            onChangeText={setNewListName}
          />
          <Button title="Create List" onPress={addNewShoppingList} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>

      {/* Сортировка списков */}
      <View style={styles.sortOptions}>
        <TouchableOpacity onPress={() => setSortOption('asc')}>
          <Text style={styles.sortText}>Sort by Asc</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('desc')}>
          <Text style={styles.sortText}>Sort by Desc</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('alpha')}>
          <Text style={styles.sortText}>Sort by A-Z</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('date')}>
          <Text style={styles.sortText}>Sort by Date</Text>
        </TouchableOpacity>
      </View>

      {/* Список покупок */}
     <FlatList
        data={filteredLists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity
              style={styles.listContent}
              onPress={() => {
                console.log('Navigating to ShoppingListDetails with:', item);
                navigation.navigate('ShoppingListDetails', {
                  shoppingList: item,
                  onUpdateList: updateShoppingList,
                });
              }}
            >
              <Text style={styles.listTitle}>{item.name}</Text>
              <Text style={styles.listDetails}>Total: ${item.total}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showDeleteConfirmation(item.id)} style={styles.deleteButton}>
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* модельное окно удаления списка */}
      <Modal visible={isDeleteConfirmVisible} transparent={true} animationType="fade">
        <View style={styles.confirmContainer}>
          <Text style={styles.confirmText}>Удалить список?</Text>
          <View style={styles.confirmButtons}>
            <Button title="Да" onPress={confirmDeleteShoppingList} />
            <Button title="Нет" onPress={() => setDeleteConfirmVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

