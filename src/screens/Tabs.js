import React, { Component } from 'react';
import {
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Pressable container
  View                // Container component
} from 'react-native';


export default class Tabs extends Component {

    // Initialize State
    state = {
      // First tab is active by default
      activeTab: 0
    }
  
    // Pull children out of props passed from App component
    render({ children } = this.props) {
      return (
        <View style={styles.container}>
          {/* Tabs row */}
          <View style={styles.tabsContainer}>
            {/* Pull props out of children, and pull title out of props */}
            {children.map(({ props: { title } }, index) =>
              <TouchableOpacity
                style={[
                  // Default style for every tab
                  styles.tabContainer,
                  // Merge default style with styles.tabContainerActive for active tab
                  index === this.state.activeTab ? styles.tabContainerActive : []
                ]}
                // Change active tab
                onPress={() => this.setState({ activeTab: index }) }
                // Required key prop for components generated returned by map iterator
                key={index}
              >
                <Text style={styles.tabText}>
                  {title}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Content */}
          <View style={styles.contentContainer}>
            {children[this.state.activeTab]}
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    // Component container
    container: {
      flex: 1,                            // Take up all available space
    },
    // Tabs row container
    tabsContainer: {
      flexDirection: 'row',               // Arrange tabs in a row
      paddingTop: 30, 
      fontFamily:'Prompt-Light'                    // Top padding
    },
    // Individual tab container
    tabContainer: {
      flex: 1,                            // Take up equal amount of space for each tab
      paddingVertical: 15,                // Vertical padding
      borderBottomWidth: 3,               // Add thick border at the bottom
      borderBottomColor: 'transparent', 
      fontFamily:'Prompt-Light'  // Transparent border for inactive tabs
    },
    // Active tab container
    tabContainerActive: {
      borderBottomColor: '#FFFFFF', 
      fontFamily:'Prompt-Light'     // White bottom border for active tabs
    },
    // Tab text
    tabText: {
      color: '#FFFFFF',
      fontFamily:'Prompt-Light',     
      textAlign: 'center',

    },
    // Content container
    contentContainer: {
      flex: 1             ,
      fontFamily:'Prompt-Light'                // Take up all available space
    }
  });