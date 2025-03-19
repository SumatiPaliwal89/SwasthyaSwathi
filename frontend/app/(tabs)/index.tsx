import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialIcons,
  Feather,
  FontAwesome,
  AntDesign
} from '@expo/vector-icons';

export default function HomePage() {
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Thyronorm', doseAmount: '50mg', instruction: 'Before breakfast', status: 'pending' },
    { id: 2, name: 'Metformin', doseAmount: '500mg', instruction: 'After lunch', status: 'pending' },
    { id: 3, name: 'Atorvastatin', doseAmount: '10mg', instruction: 'Before bedtime', status: 'pending' },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/medicines'); // Replace with actual API
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeMedicine = (id) => {
    setMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === id ? { ...medicine, status: 'taken' } : medicine
      )
    );
  };  


  useEffect(() => {
    fetchMedicines();
  }, []);

 
  const handleEmergencyPress = () => {
    Linking.openURL('tel:112'); // Replace 911 with the emergency number
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.profileImage} 
            />
            <View>
              <Text style={styles.profileName}>SwasthyaSaathi</Text>
              <Text style={styles.profileSubtitle}>स्वास्थ्य साथी</Text>
            </View>
          </View>
          <View style={styles.languageToggle}>
            <Text style={styles.languageText}>A</Text>
            <Text style={styles.languageText}>हि</Text>
          </View>
        </View>
        
        {/* Emergency Help */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyPress}>
          <FontAwesome name="phone" size={24} color="white" />
          <Text style={styles.emergencyText}>Emergency Help</Text>
        </TouchableOpacity>
        
        {/* Today's Medicines */}
        <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Today's Medicines</Text>
        <FontAwesome5 name="pills" size={20} color="black" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={medicines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.medicineCard}>
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>{item.name} <Text style = {styles.doseAmount}>{item.doseAmount}</Text></Text>
                <Text style={styles.medicineInstruction}>{item.instruction}</Text>
              </View>
              {item.status === 'pending' ? (
                <TouchableOpacity style={styles.takeNowPill} onPress={() => handleTakeMedicine(item.id)}>
                  <Text style={styles.takeNowText}>Take Now</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.takenPill}>
                  <Text style={styles.takenText}>Taken</Text>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
        
        {/* Voice Commands */}
        <TouchableOpacity style={styles.voiceCommandCard}>
          <FontAwesome5 name="microphone" size={24} color="black" />
          <Text style={styles.voiceCommandText}>Tap to give voice commands</Text>
        </TouchableOpacity>
        
        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="file-medical" size={24} color="black" />
            <Text style={styles.actionButtonText}>Scan Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="shopping-cart" size={24} color="black" />
            <Text style={styles.actionButtonText}>Order Medicines</Text>
          </TouchableOpacity>
        </View>
        
        {/* Daily Wellness Check */}
        <View style={styles.wellnessContainer}>
          <Text style={styles.wellnessTitle}>Daily Wellness Check</Text>
          <View style={styles.wellnessQuestion}>
            <Text style={styles.wellnessQuestionText}>Feeling good today?</Text>
            <View style={styles.wellnessButtons}>
              <TouchableOpacity style={styles.yesButton}>
                <Text style={styles.yesButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton}>
                <Text style={styles.noButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9e6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff9e6',
  },
  doseAmount: {
    fontSize: 15,
    fontWeight: '500',
    color: 'green',

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
  },
  
  content: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9e8b8',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 4,
  },
  languageText: {
    color: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emergencyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e05d5d',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  emergencyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionContainer: {
    backgroundColor: '#f9e8b8',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicineCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9e8c9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  medicineInstruction: {
    fontSize: 14,
    color: '#666',
  },
  takenPill: {
    backgroundColor: '#8de5d3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  takenText: {
    fontSize: 14,
  },
  takeNowPill: {
    backgroundColor: '#d6e9ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  takeNowText: {
    fontSize: 14,
    color: '#0066ff',
  },
  voiceCommandCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9e8b8',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 24,
    borderRadius: 12,
    gap: 12,
  },
  voiceCommandText: {
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f9e8b8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  wellnessContainer: {
    backgroundColor: '#f9e8b8',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
  },
  wellnessTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  wellnessQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wellnessQuestionText: {
    fontSize: 16,
  },
  wellnessButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  yesButton: {
    backgroundColor: '#8de5d3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  yesButtonText: {
    fontSize: 14,
  },
  noButton: {
    backgroundColor: '#ffcccb',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
  },
  noButtonText: {
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f9e8b8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0d890',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  navText: {
    fontSize: 14,
    marginTop: 4,
  },
});