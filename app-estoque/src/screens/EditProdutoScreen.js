// src/screens/EditProdutoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../api';

export default function EditProdutoScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await api.get(`/produtos/${id}`);
        setNome(data.nome);
        setQuantidade(String(data.quantidade));
        setPreco(String(data.preco));
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, [id]);

  const salvar = async () => {
    try {
      await api.put(`/produtos/${id}`, { nome, quantidade: Number(quantidade), preco: Number(preco) });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar alterações.');
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Produto</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 10 },
});
