import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Appbar, useTheme, RadioButton, Text, Card, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const CropConditionForm = ({ navigation }: { navigation: any }) => {
  const [formData, setFormData] = useState({
    cropConfirmsStandard: '',
    isFinalReport: false,
    estimatedSeedYields: '',
    representativePresent: false,
    representativeName: '',
    remarks: '',
  });

  const { colors } = useTheme();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#70B04F' }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content 
          title="Crop Condition Report"
          titleStyle={{ color: 'white' }} 
        />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionHeader}>Crop Condition Assessment</Text>
            
            <Text style={styles.question}>Does this crop confirm the standard for particular class of seed?</Text>
            <View style={styles.radioGroup}>
              <View style={styles.radioButton}>
                <RadioButton
                  value="yes"
                  status={formData.cropConfirmsStandard === 'yes' ? 'checked' : 'unchecked'}
                  onPress={() => handleChange('cropConfirmsStandard', 'yes')}
                  color="#70B04F"
                />
                <Text>Yes</Text>
              </View>
              <View style={styles.radioButton}>
                <RadioButton
                  value="no"
                  status={formData.cropConfirmsStandard === 'no' ? 'checked' : 'unchecked'}
                  onPress={() => handleChange('cropConfirmsStandard', 'no')}
                  color="#70B04F"
                />
                <Text>No</Text>
              </View>
            </View>

            {formData.cropConfirmsStandard && (
              <TextInput
                label="Reason *"
                mode="outlined"
                style={styles.input}
                value={formData.cropConfirmsStandard === 'yes' ? 'Meets all required standards' : formData.remarks}
                outlineColor="#999"
                activeOutlineColor="#70B04F"
                onChangeText={(text) => handleChange('remarks', text)}
                multiline
                numberOfLines={3}
              />
            )}

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={formData.isFinalReport ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('isFinalReport')}
                color="#70B04F"
              />
              <Text style={styles.checkboxLabel}>Is this final report?</Text>
            </View>

            <TextInput
              label="Estimated Seed Yields *"
              mode="outlined"
              style={styles.input}
              value={formData.estimatedSeedYields}
              outlineColor="#999"
              activeOutlineColor="#70B04F"
              onChangeText={(text) => handleChange('estimatedSeedYields', text)}
              keyboardType="numeric"
              left={<TextInput.Icon icon="weight" />}
            />

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={formData.representativePresent ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxChange('representativePresent')}
                color="#70B04F"
              />
              <Text style={styles.checkboxLabel}>Was the grower or representative present at inspection?</Text>
            </View>

            {formData.representativePresent && (
              <TextInput
                label="Name of Representative *"
                mode="outlined"
                style={styles.input}
                value={formData.representativeName}
                outlineColor="#999"
                activeOutlineColor="#70B04F"
                onChangeText={(text) => handleChange('representativeName', text)}
                left={<TextInput.Icon icon="account" />}
              />
            )}

            <TextInput
              label="Remarks / Advice Given *"
              mode="outlined"
              style={[styles.input, { height: 100 }]}
              value={formData.remarks}
              outlineColor="#999"
              activeOutlineColor="#70B04F"
              onChangeText={(text) => handleChange('remarks', text)}
              multiline
              numberOfLines={4}
              left={<TextInput.Icon icon="comment-text" />}
            />

            <Button 
              mode="contained" 
              onPress={() => navigation.goBack()}
              style={styles.submitButton}
              labelStyle={styles.buttonLabel}
            >
              Submit Report
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    padding: 8,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
    color: '#333',
  },
  question: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 8,
    backgroundColor: '#70B04F',
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
});

export default CropConditionForm;