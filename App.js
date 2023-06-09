import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, AppState } from 'react-native';

export default function App() {
  const [appActivities, setAppActivities] = useState([]);

  useEffect(() => {
    // Add AppState change event listener
    AppState.addEventListener('change', handleAppStateChange);

    // Fetch initial app activity
    fetchAppActivities(AppState.currentState);

    // Poll every 5 seconds
    const interval = setInterval(() => {
      fetchAppActivities(AppState.currentState);
    }, 5000);

    // Clean up interval and event listener on component unmount
    return () => {
      clearInterval(interval);
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    // Fetch app activities on app state change
    fetchAppActivities(nextAppState);
  };

  const fetchAppActivities = (currentAppState) => {
    const activity = {
      app: getAppName(currentAppState),
      activity: currentAppState
    };

    setAppActivities((prevActivities) => [...prevActivities, activity]);
  };

  const getAppName = (appState) => {
    switch (appState) {
      case 'active':
        return 'Your App Name';
      case 'background':
        return 'Another App Name';
      default:
        return 'Unknown App Name';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>App Activities</Text>
      {appActivities.map((activity, index) => (
        <View key={index} style={styles.activityContainer}>
          <Text style={styles.appName}>{activity.app}</Text>
          <Text style={styles.appActivity}>{activity.activity}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activityContainer: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 18,
    marginBottom: 8,
  },
  appActivity: {
    fontSize: 16,
  },
});
