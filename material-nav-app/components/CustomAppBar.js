import * as React from 'react';
import { Appbar } from 'react-native-paper';

export default function CustomAppBar({ navigation, back, options }) {
  const title = options?.title ?? 'MD Nav Demo';

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}

      <Appbar.Content title={title} />

      {!back ? (
        <Appbar.Action
          icon="arrow-right"
          onPress={() => navigation.navigate('Second')}
        />
      ) : null}
    </Appbar.Header>
  );
}

