// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListaProdutosScreen from './src/screens/ListaProdutosScreen';
import AddProdutoScreen from './src/screens/AddProdutoScreen';
import EditProdutoScreen from './src/screens/EditProdutoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
        <Stack.Screen name="ListaProdutos" component={ListaProdutosScreen} options={{ title: 'Estoque' }} />
        <Stack.Screen name="AddProduto" component={AddProdutoScreen} options={{ title: 'Adicionar Produto' }} />
        <Stack.Screen name="EditProduto" component={EditProdutoScreen} options={{ title: 'Editar Produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
