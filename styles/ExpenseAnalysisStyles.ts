import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    block: {
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 8,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    amount: { fontSize: 18, color: '#333' },
    categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
    categoryText: { fontSize: 16, color: '#555' },
    detailText: { fontSize: 16, color: '#666' },
  });