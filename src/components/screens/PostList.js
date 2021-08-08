
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPosts, signOut} from '../actions';
import Header from './Header';
import {useLocation} from 'react-router-dom';
import {StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import Pagination from '../utilities/Pagination';
import Popup from '../utilities/Popup';

const PostList= (props)=> {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const queryCode = searchParams.get('accessToken');
    const [code]= useState(queryCode);
    const [posts, setPosts]=useState([]);
    const [post, setPost]=useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [postsPerPage]=useState(10);
    let popupRef=React.createRef();
    useEffect(()=>{
        if(code) {
            props.fetchPosts(code);
          }
    },[]);
    useEffect(()=>{
       setPosts(props.posts);
    },[props.posts]);
    const indexOfLastPost=currentPage * postsPerPage;
    const indexOfFirstPost=indexOfLastPost - postsPerPage;
    const currentPosts=posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate=(pageNumber)=>setCurrentPage(pageNumber);
  
    const onClosePopup=()=>{
        popupRef.close();
    }
    const pressHander=(id, username, mediaUrl, caption)=>{
        setPost({id, username, mediaUrl, caption});
        popupRef.show();
    }
    const renderList=()=>{
        return (
            <FlatList
            numColumns={3}
            keyExtractor={(item)=>item.id}
            data={currentPosts}
            renderItem={({item}) => (
            <View
            style={{
            flexDirection: 'column',
            flex: 1,
            margin: 8,
            backgroundColor: '#fafafa',
            }}>
          <TouchableOpacity style={{cursor: 'pointer'}} onPress={()=>pressHander(item.id, item.username,item.media_url,item.caption)}>
            <Image
            style={styles.imageThumbnail}
            source={{ uri: item.media_url }}
            /> </TouchableOpacity>
    </View>
   
  )}
  
/>
        );
    };
    if(props.posts){
return(
    <View style={styles.container}>
    <Header/>
    <Popup post={post} ref={(target)=>popupRef=target} onTouchOutside={onClosePopup}/>
    <View style={{alignItems: 'center',justifyContent: 'center'}}>     
    {renderList()}
    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </View> </View>
);
    }
        return (
            <View style={styles.container}><Text>Please Sign In to view Images</Text></View>
        
    );
};
const mapStateToProps=(state)=>{
    return {
        accessToken: state.auth.accessToken,
        isSignedIn: state.auth.isSignedIn,
        posts: state.posts
    };
}
export default connect(mapStateToProps, {fetchPosts, signOut})(PostList);
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        position: 'relative',
        flexShrink: false,
        flexGrow: 1,          
        marginVertical: 0,
      },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        width: 300,
        borderRadius: 10,
      },
  });
  