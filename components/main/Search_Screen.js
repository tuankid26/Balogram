// // import React, { useState } from 'react'
// // import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

// // export default function Search(props) {

// //     const fetchUsers = (search) => {
// //     }
// //     return (
// //         <View>
// //             <TextInput
// //                 placeholder="Type Here..."
// //                 onChangeText={(search) => fetchUsers(search)} />

// //             <FlatList
// //                 numColumns={1}
// //                 horizontal={false}
// //                 data={users}
// //                 renderItem={({ item }) => (
// //                     <TouchableOpacity
// //                         onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
// //                         <Text>{item.name}</Text>
// //                     </TouchableOpacity>

// //                 )}
// //             />
// //         </View>
// //     )
// // }

// import { SearchBar } from 'react-native-elements';

// export default class Search_Screen extends React.Component {
//     state = {
//         search: '',
//     };

//     updateSearch = (search) => {
//         this.setState({ search });
//     };

//     render() {
//         return (
//         <SearchBar
//             placeholder="Type Here..."
//             onChangeText={this.updateSearch}
//             value={search}
//         />
//         );
//     }
// }

// // export default Search_Screen;