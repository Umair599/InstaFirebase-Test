import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
const Pagination =({postsPerPage, totalPosts, paginate})=>{
    const pageNumbers=[];
    for(let i=1;i<=Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }
    return(
<View style={{flexDirection:'row'}}>
{
pageNumbers.map(number=>(
<View key={number} style={{marginHorizontal:10, width: 30, justifyContent: 'center',alignContent:'center',
    height: 30,
    borderRadius: 100 / 2,backgroundColor:'#debdaa', flexWrap:'wrap'}}>
<TouchableOpacity onPress={()=>paginate(number)}>
    <Text style={{color: '#000000', fontSize: 20, justifyContent:'center'}}>{number}</Text>
</TouchableOpacity></View>
    ))
}
</View>
    );
}
export default Pagination;