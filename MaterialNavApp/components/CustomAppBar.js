import React from 'react';
import { Appbar } from 'react-native-paper';

export default function CustomAppBar({ navigation, back, options }) {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      
      <Appbar.Content title={options.title} />

      {!back ? (
        <Appbar.Action 
          icon="arrow-right" 
          onPress={() => navigation.navigate('Second')} 
        />
      ) : null}
    </Appbar.Header>
  );
}

