// src/screens/AddProdutoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { api } from '../api';

export default function AddProdutoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const salvar = async () => {
    if (!nome || !quantidade || !preco) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    try {
      await api.post('/produtos', { nome, quantidade: Number(quantidade), preco: Number(preco) });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Erro', 'Falha ao adicionar o produto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Produto</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 10 },
});
