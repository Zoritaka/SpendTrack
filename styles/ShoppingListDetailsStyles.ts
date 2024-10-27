import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    input: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    itemContainer: {
      flexDirection: 'column',
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      marginBottom: 8,
    },
    itemText: {
      fontSize: 16,
    },
    deleteButton: {
      color: 'red',
      marginTop: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: 'white',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
  });
  