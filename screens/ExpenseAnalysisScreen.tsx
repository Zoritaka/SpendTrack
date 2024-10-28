import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList, ShoppingItem } from '../models/ShoppingList';
import { styles } from '../styles/ExpenseAnalysisStyles';

export const ExpenseAnalysisScreen = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const [categoryExpense, setCategoryExpense] = useState<{ [key: string]: number }>({});
  const [mostExpensiveItem, setMostExpensiveItem] = useState<ShoppingItem | null>(null);
  const [mostFrequentItem, setMostFrequentItem] = useState<string>('');

  useEffect(() => {
    loadShoppingLists();
  }, []);

  useEffect(() => {
    if (shoppingLists.length > 0) {
      calculateMonthlyExpense();
      calculateCategoryExpense();
      findMostExpensiveItem();
      findMostFrequentItem();
    }
  }, [shoppingLists]);

  // загружает данные о списках покупок из AsyncStorage.
  const loadShoppingLists = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@shopping_lists');
      if (jsonValue !== null) {
        setShoppingLists(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Ошибка загрузки списка покупок', e);
    }
  };

  // Подсчет общих трат за месяц
  const calculateMonthlyExpense = () => {
    const total = shoppingLists.reduce(
      (sum, list) => sum + list.items.reduce((itemSum, item) => itemSum + item.price, 0),
      0
    );
    setMonthlyExpense(total);
  };

  // Анализ трат по категориям
  const calculateCategoryExpense = () => {
    const categoryTotals: { [key: string]: number } = {};
    shoppingLists.forEach(list => {
      list.items.forEach(item => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.price;
      });
    });
    setCategoryExpense(categoryTotals);
  };

  // Определение самой дорогой покупки
  const findMostExpensiveItem = () => {
    let expensiveItem: ShoppingItem | null = null;
    shoppingLists.forEach(list => {
      list.items.forEach(item => {
        if (!expensiveItem || item.price > expensiveItem.price) {
          expensiveItem = item;
        }
      });
    });
    setMostExpensiveItem(expensiveItem);
  };

  // Определение наиболее часто покупаемого товара
  const findMostFrequentItem = () => {
    const itemFrequency: { [key: string]: number } = {};
    shoppingLists.forEach(list => {
      list.items.forEach(item => {
        itemFrequency[item.name] = (itemFrequency[item.name] || 0) + 1;
      });
    });
    const mostFrequent = Object.keys(itemFrequency).reduce((a, b) =>
      itemFrequency[a] > itemFrequency[b] ? a : b
    );
    setMostFrequentItem(mostFrequent);
  };

  return (
    <View style={styles.container}>
      {/* Общие затраты за месяц */}
      <View style={styles.block}>
        <Text style={styles.title}>Общие затраты за месяц</Text>
        <Text style={styles.amount}>{monthlyExpense.toFixed(2)}₸</Text>
      </View>

      {/* Анализ трат по категориям */}
      <View style={styles.block}>
        <Text style={styles.title}>Затраты по категориям</Text>
        {Object.entries(categoryExpense).map(([category, total]) => (
          <View key={category} style={styles.categoryRow}>
            <Text style={styles.categoryText}>{category}</Text>
            <Text style={styles.amount}>{total.toFixed(2)}₸</Text>
          </View>
        ))}
      </View>

      {/* Самая дорогая покупка */}
      <View style={styles.block}>
        <Text style={styles.title}>Самая дорогая покупка</Text>
        {mostExpensiveItem ? (
          <>
            <Text style={styles.detailText}>Товар: {mostExpensiveItem.name}</Text>
            <Text style={styles.detailText}>Категория: {mostExpensiveItem.category}</Text>
            <Text style={styles.amount}>{mostExpensiveItem.price.toFixed(2)}₸</Text>
          </>
        ) : (
          <Text style={styles.detailText}>Нет покупок</Text>
        )}
      </View>

      {/* Наиболее часто покупаемый товар */}
      <View style={styles.block}>
        <Text style={styles.title}>Наиболее часто покупаемый товар</Text>
        <Text style={styles.detailText}>{mostFrequentItem || 'Нет данных'}</Text>
      </View>
    </View>
  );
};

