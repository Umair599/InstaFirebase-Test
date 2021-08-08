import {Modal, Dimensions, TouchableOpacity, View, Text,Image,TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';

const {height} =Dimensions.get('window');
const {width} =Dimensions.get('window');
class Popup extends Component{
constructor(props){
    super(props);
    this.state={
        show:false
    }
}
show=()=>{
    this.setState({show:true});
}
close=()=>{
    this.setState({show:false});
}
renderOutsideTouchable(onTouch){
    const view=<View style={{ width:'100%'}}/>
    if(!onTouch) return view
    return (
        <TouchableWithoutFeedback onPress={onTouch}>
        {view}
        </TouchableWithoutFeedback>
    )
}
renderPost=(onTouch)=>{
    const {post}= this.props;
    return(
        <View style={{flexDirection:'column', alignContent:'center', maxHeight:height*0.9,maxWidth:width*0.8, justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', flex:1, marginVertical:5}}>
            <View style={{flexDirection:'column'}}>
            <Text style={{color: '#182e44', fontSize: 20, fontWeight: '500',marginHorizontal:10, justifyContent:'center'}}>
{post.username}
    </Text>
    <Text style={{color: '#182e44', fontSize: 15, fontWeight: '900', marginHorizontal:10}}>
{post.caption}
    </Text>
            </View>
            <TouchableOpacity onPress={onTouch} style={{
                flex:1, justifyContent:'flex-end',alignContent:'flex-end',cursor: 'pointer', marginRight:10}}><Text style={{alignContent:'flex-end', textAlign:'right', fontSize:30, fontWeight:'bold', color:'red'}}>X</Text></TouchableOpacity>
            </View>
    <Image resizeMode='contain' style={{height: 400, width: 500, marginBottom:5}}
      source={{ uri: post.mediaUrl }}
    />
    </View>
    );
}
render(){
    let {show}=this.state;
    const {onTouchOutside}=this.props;
    return(
        <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
        >
            <View style={{flex:1, backgroundColor: '#000000AA', justifyContent: 'center', alignItems:'center', alignContent:'center'}}>
            {this.renderOutsideTouchable(onTouchOutside)}
            
                <View style={{justifyContent:'center',marginVertical: 10, borderTopRightRadius:10, borderBottomLeftRadius:10, paddingHorizontal:10, backgroundColor: '#FFFFFFFF'}}>
    
                {this.renderPost(onTouchOutside)}
                
                </View>
            </View>
        </Modal>
    )
}
}
export default Popup;