// Arquivo: app-cursos/src/components/ListaCursos.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// SUBSTITUA 'SEU_IP_LOCAL' PELO IP DA SUA MÁQUINA!
const API_URL = 'http://192.168.1.211:3000/cursos';

const ListaCursos = () => {
  // Estados para guardar os dados, o status de carregamento e possíveis erros
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os dados da API assim que o componente montar
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(API_URL);
        setCursos(response.data); // Sucesso: guarda os cursos no estado
      } catch (err) {
        setError('Não foi possível carregar os cursos.'); // Falha: guarda a mensagem de erro
      } finally {
        setLoading(false); // Termina o carregamento, independente de sucesso ou falha
      }
    };

    fetchCursos();
  }, []); // O array vazio [] faz com que rode apenas uma vez

  // Renderização condicional
  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // AQUI FICA A FLATLIST! Ela só é renderizada se não houver erro e o carregamento tiver terminado.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos Disponíveis (da API BES)</Text>
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.nome}</Text>
            <Text style={styles.itemArea}>{item.area}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  itemContainer: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 },
  itemName: { fontSize: 18, fontWeight: '500' },
  itemArea: { fontSize: 14, color: 'gray', marginTop: 5 },
  errorText: { color: 'red', textAlign: 'center', marginTop: 50, fontSize: 16 },
});

export default ListaCursos;







