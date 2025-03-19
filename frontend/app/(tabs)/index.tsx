import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView
} from 'react-native';
import { 
  Ionicons, 
  FontAwesome5, 
  MaterialIcons,
  Feather
} from '@expo/vector-icons';

export default function ScheduleCalendar() {
  const [selectedDate, setSelectedDate] = useState(5);
  
  // Calendar data
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const datesFirstRow = [25, 26, 27, 28, 1, 2, 3];
  const datesSecondRow = [4, 5, 6, 7];
  
  // Schedule data
  const scheduleItems = [
    { 
      title: 'Blood Pressure Check', 
      time: '9:00 AM', 
      category: 'Medical',
      categoryColor: '#8de5d3'
    },
    { 
      title: 'Take Thyroid Medicine', 
      time: '11:00 AM', 
      category: 'Medicine',
      categoryColor: '#e9d6ff'
    },
    { 
      title: 'Doctor Appointment', 
      time: '2:30 PM', 
      category: 'Appointment',
      categoryColor: '#d6e9ff'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Calendar</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome5 name="microphone" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Month Navigation */}
        <View style={styles.monthContainer}>
          <Text style={styles.monthTitle}>March 2025</Text>
          <View style={styles.monthNavigation}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Calendar Days */}
        <View style={styles.calendarContainer}>
          {/* Days of week */}
          <View style={styles.daysRow}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.dayText}>{day}</Text>
            ))}
          </View>
          
          {/* First row of dates */}
          <View style={styles.datesRow}>
            {datesFirstRow.map((date, index) => (
              <Text 
                key={index} 
                style={[
                  styles.dateText, 
                  date < 25 ? styles.currentMonthDate : styles.prevMonthDate
                ]}
              >
                {date}
              </Text>
            ))}
          </View>
          
          {/* Second row of dates */}
          <View style={styles.datesRow}>
            {datesSecondRow.map((date, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.dateButton,
                  date === selectedDate ? styles.selectedDateButton : null
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text 
                  style={[
                    styles.dateText, 
                    date === selectedDate ? styles.selectedDateText : null
                  ]}
                >
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Today's Schedule */}
        <View style={styles.scheduleHeaderContainer}>
          <Text style={styles.scheduleHeaderTitle}>Today's Schedule</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonIcon}>+</Text>
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>
        </View>
        
        {/* Schedule Items */}
        {scheduleItems.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <View style={styles.scheduleItemContent}>
              <Text style={styles.scheduleItemTitle}>{item.title}</Text>
              <View style={styles.scheduleItemTime}>
                <Feather name="clock" size={18} color="#555" />
                <Text style={styles.scheduleItemTimeText}>{item.time}</Text>
              </View>
            </View>
            <View 
              style={[
                styles.scheduleItemCategory, 
                { backgroundColor: item.categoryColor }
              ]}
            >
              <Text style={styles.scheduleItemCategoryText}>{item.category}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="black" />
          <Text style={styles.navText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.navText}>Care</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={24} color="black" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9e8b8',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  monthNavigation: {
    flexDirection: 'row',
    gap: 16,
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayText: {
    fontSize: 18,
    color: '#666',
    width: 40,
    textAlign: 'center',
  },
  datesRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    width: 40,
    textAlign: 'center',
  },
  prevMonthDate: {
    color: '#aaa',
  },
  currentMonthDate: {
    color: '#000',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateButton: {
    backgroundColor: '#d6e9ff',
  },
  selectedDateText: {
    color: '#0066ff',
    fontWeight: 'bold',
  },
  scheduleHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 20,
  },
  scheduleHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#0066ff',
    marginRight: 4,
  },
  addButtonText: {
    fontSize: 18,
    color: '#0066ff',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9e8b8',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  scheduleItemContent: {
    flex: 1,
  },
  scheduleItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scheduleItemTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleItemTimeText: {
    fontSize: 18,
    color: '#555',
    marginLeft: 8,
  },
  scheduleItemCategory: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scheduleItemCategoryText: {
    fontSize: 16,
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
  navText: {
    fontSize: 14,
    marginTop: 4,
  },
});