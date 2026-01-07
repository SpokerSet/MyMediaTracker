import { StyleSheet } from 'react-native';

export const cardStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#dee2e6',
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#212529',
    lineHeight: 22,
  },
  typeTag: {
    fontSize: 10,
    color: '#6200ee',
    backgroundColor: '#f0e6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addBtn: { backgroundColor: '#6200ee' },
  removeBtn: { backgroundColor: '#ff5252' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});