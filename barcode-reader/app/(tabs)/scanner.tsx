import {
    BarcodeScanningResult,
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import React, { useCallback, useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ScannerScreen(): React.ReactElement {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string>("");

  const barcodeTypes = useMemo(() => ["ean13", "ean8"] as const, []);

  const onBarcodeScanned = useCallback((result: BarcodeScanningResult) => {
    setScanned(true);
    setBarcode(String(result.data));
  }, []);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Tarkistetaan kameran oikeuksia…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={[styles.text, { marginBottom: 12 }]}>
          Sovellus tarvitsee kameran käyttöoikeuden viivakoodin lukemiseen.
        </Text>
        <Button title="Salli kamera" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: [...barcodeTypes] }}
        onBarcodeScanned={scanned ? undefined : onBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.label}>
          {barcode ? `Barcode: ${barcode}` : "Skannaa EAN-viivakoodi"}
        </Text>

        {scanned && (
          <View style={{ marginTop: 10 }}>
            <Button
              title="SCAN AGAIN"
              onPress={() => {
                setBarcode("");
                setScanned(false);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  text: { color: "#fff", textAlign: "center" },
});
