import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f0f0f0',
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: 'white',
    },
    sortOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    sortText: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    sortButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 12,
    },
    sortButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    sortButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    listContent: {
      flex: 1,
      marginRight: 10,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    listDetails: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
    },
    deleteButton: {
      padding: 8,
    },
    deleteButtonText: {
      fontSize: 14,
      fontWeight: '500',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modalInput: {
      width: '80%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      marginBottom: 10,
    },
    confirmContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Затемнение фона
      },
      confirmBox: {
        backgroundColor: '#4a4a4a', // Серый цвет для модального блока
        borderRadius: 16,
        padding: 24,
        width: '80%',
        alignItems: 'center',
      },
      confirmText: {
        fontSize: 18,
        color: '#ffffff', // Белый текст
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      confirmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
      },
      confirmButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#6a6a6a', 
        alignItems: 'center',
        marginHorizontal: 5,
      },
      confirmButtonText: {
        color: '#ffffff', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      },
      textAdd: {
        color: '#ffffff', 
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
      },
  });
  