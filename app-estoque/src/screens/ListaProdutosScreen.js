// src/screens/ListaProdutosScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Button, Alert, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { api } from '../api';

export default function ListaProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const carregar = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/produtos');
      setProdutos(data);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await carregar();
    setRefreshing(false);
  };

  const excluir = (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/produtos/${id}`);
            await carregar();
          } catch {
            Alert.alert('Erro', 'Falha ao excluir.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Qtd: {item.quantidade}</Text>
      <Text>Preço: R$ {Number(item.preco).toFixed(2)}</Text>
      <View style={styles.row}>
        <Button title="Editar" onPress={() => navigation.navigate('EditProduto', { id: item.id })} />
        <View style={{ width: 12 }} />
        <Button title="Excluir" color="#c1121f" onPress={() => excluir(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Produtos</Text>
        <Button title="Adicionar" onPress={() => navigation.navigate('AddProduto')} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text>Nenhum produto cadastrado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '600' },
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
  nome: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  row: { flexDirection: 'row', marginTop: 8 },
});
