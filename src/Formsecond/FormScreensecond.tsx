import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Appbar, useTheme, Text, Card } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

interface OfftypeField {
  id: string;
  numberOfPlants: string;
  natureOfOfftypes: string;
}

const FormScreensecond = ({ navigation }: { navigation: any }) => {
  const { colors } = useTheme();
  const [offtypeFields, setOfftypeFields] = useState<OfftypeField[]>([
    { id: '1', numberOfPlants: '', natureOfOfftypes: '' }
  ]);
  const [isFocus, setIsFocus] = useState(false);

  // Dummy data for the dropdown
  const natureOfOfftypesData = [
    { label: 'Nature of offtypes one', value: 'one' },
    { label: 'Nature of offtypes two', value: 'two' },
    { label: 'Nature of offtypes three', value: 'three' },
    { label: 'Nature of offtypes Four', value: 'four' },
  ];

  const handleAddField = () => {
    const newField: OfftypeField = {
      id: Date.now().toString(),
      numberOfPlants: '',
      natureOfOfftypes: ''
    };
    setOfftypeFields([...offtypeFields, newField]);
  };

  const handleRemoveField = (id: string) => {
    if (offtypeFields.length > 1) {
      setOfftypeFields(offtypeFields.filter(field => field.id !== id));
    }
  };

  const handleFieldChange = (id: string, field: keyof OfftypeField, value: string) => {
    setOfftypeFields(offtypeFields.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#70B04F' }}>
        <Appbar.BackAction color="white" onPress={() => navigation.navigate('FromScreen')} />
        <Appbar.Content 
          title="Percentage of Offtypes"
          titleStyle={{ color: 'white' }} 
        />
      </Appbar.Header>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={[styles.card]}>
          <Card.Content>
              

            
            {offtypeFields.map((field, index) => (
              <View key={field.id} style={styles.fieldContainer}>
                <Text style={styles.fieldNumber}>Percentage of  Offtype {index + 1}</Text>
                
                <TextInput
                  label="Number Of Plant of offtypes"
                  mode="outlined"
                  style={styles.input}
                  value={field.numberOfPlants}
                  outlineColor="#999"
                  activeOutlineColor="#70B04F"
                  onChangeText={(text) => handleFieldChange(field.id, 'numberOfPlants', text)}
                  left={<TextInput.Icon icon="seed" />}
                  keyboardType="numeric"
                />

                <View style={styles.inputGroup}>
                  <Text variant="labelLarge" style={[styles.label, { marginBottom: 8 }]}>
                    Nature of offtypes
                  </Text>
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#70B04F' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={natureOfOfftypesData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select nature of offtypes' : '...'}
                    searchPlaceholder="Search..."
                    value={field.natureOfOfftypes}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      handleFieldChange(field.id, 'natureOfOfftypes', item.value);
                      setIsFocus(false);
                    }}
                    mode="modal"
                  />
                </View>

                {offtypeFields.length > 1 && (
                  <Button 
                    mode="outlined" 
                    onPress={() => handleRemoveField(field.id)}
                    style={styles.removeButton}
                    textColor="#ff4444"
                    icon="delete"
                  >
                    Remove
                  </Button>
                )}
              </View>
            ))}

            <Button 
              mode="outlined" 
              onPress={handleAddField}
              style={styles.addButton}
              textColor="#70B04F"
              icon="plus"
            >
              Add More Offtypes
            </Button>
        
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('Formthree')}
              style={styles.submitButton}
              labelStyle={styles.buttonLabel}
            >
              Next
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
  fieldContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  fieldNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#70B04F',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
    fontSize : 14
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  submitButton: {
    marginTop: 24,
    paddingVertical: 8,
    backgroundColor: '#70B04F',
  },
  addButton: {
    marginTop: 10,
    borderColor: '#70B04F',
  },
  removeButton: {
    marginTop: 10,
    borderColor: '#ff4444',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  buttonLabel: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default FormScreensecond;