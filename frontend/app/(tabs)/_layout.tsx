import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from 'react-native';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#f9e8b8',
          borderTopLeftRadius: 20, // Optional: for rounded corners
          borderTopRightRadius: 20, // Optional: for rounded corners
          height: 60, // Adjust height if needed
        
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home', 
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <IconSymbol size={28} name="house.fill" color={'black'} />,
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'schedule',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <FontAwesome name="calendar" size={24} color="black" />,
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="carePage"
        options={{
          title: 'Care', 
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <MaterialCommunityIcons name="human" size={24} color="black" />,
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings', 
            tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <FontAwesome name="gear" size={24} color="black" />,
            </View>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
 
  },
  activeIcon: {
    color: 'black', // Light gray background when active
    borderRadius: 10, // Rounded edges for the background 
    
  },
});
