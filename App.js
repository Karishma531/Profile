import { Text, StyleSheet, View, Image, TextInput,
   ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import Icon from 'react-native-vector-icons/AntDesign'
import  Icon  from 'react-native-vector-icons/Entypo'

import AsyncStoreage from '@react-native-async-storage/async-storage'
import { Colors } from 'react-native/Libraries/NewAppScreen'
// import {useDrawerStatus} from '@react-navigation/drawer'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      name: '',
      email: '',
      password: '',

      usererror: 'a',
      nameerror: 'a',
      mailerror: 'a',
      passworderror: 'a',
      isvisible:true,
      passwordVisible:true
    }
  }
  forusercheack = () => {
    let checkuser = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/gm;
    this.setState({
      usererror: this.state.user.match(checkuser) ? '' : 'Enter valid userid',
      
    });
    
  };
  fornamecheack = () => {
    let checkname = /^[a-zA-Z]+ [a-zA-Z]+$/gm;
    this.setState({
      nameerror: this.state.name.match(checkname) ? '' : 'Enter valid user name',
    });
  };
  formailcheack = () => {
    let checkemail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gm;
    this.setState({
      mailerror: this.state.email.match(checkemail) ? '' : 'Enter valid email',
    });
  };

  forpasswordcheack = () => {
    
    let checkpassword={
      // SrongPass:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/gm,
      mediumPass:/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/gm
      //weakPass: /[a-zA-Z0-9]+/gm,
     

    }
     // let checkpassword =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    this.setState({
      passworderror: this.state.password.match(checkpassword.mediumPass) ? '' : 'Enter valid password',
    });
  };

  handleEmail = (text) => {
    this.setState({
      email: text
    },
      this.formailcheack)

  }

  handleUser = (text) => {
    this.setState({
      user: text
    },
      this.forusercheack)
  }
  handleName = (text) => {
    this.setState({
      name: text
    },
      this.fornamecheack)
  }
  handlePassword = (text) => {
    this.setState({
      password: text
    },
      this.forpasswordcheack)
  }

  handleSubmit = async () => {
    // console.log('abc');
    
    const { user, name, email, password } = this.state

                 if (this.state.usererror===''&&this.state.nameerror===''
                  &&this.state.mailerror===''&&this.state.passworderror==='')
                 
                  
                  {
                  
                    try {
                      Alert.alert('karishma')
                      console.log('user value', this.state.user);
                      console.log('name', this.state.name);
                
                      AsyncStoreage.setItem('user', user)
                      AsyncStoreage.setItem('name', name)
                      AsyncStoreage.setItem('email', email)
                      AsyncStoreage.setItem('password', password)
                
                      this.setState({
                        user: '',
                        name: '',
                        email: '',
                        password: ''
                      })
                
                      console.log('user successfully edited!:')
                      Alert.alert('Save Success', 'Finished saving ')
                
                    } catch (err) {
                      Alert.alert('Save Error', 'Error saving ')
                      console.log('error signing up: ', err)
                    }
                  }
                  else{
                    Alert.alert('Please enter the field')
                  }
                  }

  //   try {
  //     console.log('user value', this.state.user);
  //     console.log('name', this.state.name);

  //     AsyncStoreage.setItem('user', user)
  //     AsyncStoreage.setItem('name', name)
  //     AsyncStoreage.setItem('email', email)
  //     AsyncStoreage.setItem('password', password)

  //     this.setState({
  //       user: '',
  //       name: '',
  //       email: '',
  //       password: ''
  //     })

  //     console.log('user successfully edited!:')
  //     Alert.alert('Save Success', 'Finished saving ')

  //   } catch (err) {
  //     Alert.alert('Save Error', 'Error saving ')
  //     console.log('error signing up: ', err)
  //   }
  // }
  displayData = async () => {
    try {
      // Alert.alert('There is no data found')
      let user = await AsyncStoreage.getItem('user');
      let name = await AsyncStoreage.getItem('name')
      let email = await AsyncStoreage.getItem('email')
      let password = await AsyncStoreage.getItem('password')

      this.setState({
        user, name, email, password
      })
    }
    catch (error) {
      alert(error)
    }
  }


  componentDidMount() {
    let user = (async () => {
      const user = await AsyncStoreage.getItem('user')
      if (user !== null) {
        this.setState(user)
      }
    });
    let name = (async () => {
      const name = await AsyncStoreage.getItem('name')
      console.log(name);
    })
    let email = (async () => {
      const email = await AsyncStoreage.getItem('email')
      console.log(email);
    })
    let password = (async () => {
      const password = await AsyncStoreage.getItem('password')
      console.log('password');
    })
    // let name =JSON.parse(await AsyncStoreage.getItem('name'));
    // let email =JSON.parse(await AsyncStoreage.getItem('email'));
    // let password =JSON.parse(await AsyncStoreage.getItem('password'));
    this.setState({ user: user })
    this.setState({ name: name })
    this.setState({ email: email })
    this.setState({ password: password })
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Icon name='menu' style={styles.upicn} />
            <Text style={styles.txt}>Profile</Text>
          </View>
          <View style={styles.imgcon}>
            {/* <Icon name="mail"/> */}
            {/* <Icon name="user" style={styles.icon} /> */}
            <Image style={styles.img} source={require("./assets/user.png")} />

          </View>
          <View style={styles.headbar}>
            
            <Text style={styles.txtheader}>User ID</Text>
            <View style={styles.input}>
            <Icon name='user' style={styles.icon1}/>
            <TextInput  value={this.state.user}
              placeholder='User ID'
              style={styles.mainInput}
              onChangeText={this.handleUser} />
            </View>
            <Text style={styles.errtxt}>{this.state.usererror!='a'?this.state.usererror:''}</Text>
          </View>
          <View style={styles.headbar}>
            <Text style={styles.txtheader}>Full Name</Text>
            <View style={styles.input}>
              <Icon name='user' style={styles.icon1}/>
            <TextInput  value={this.state.name}
            style={styles.mainInput}
              placeholder='Name'
              onChangeText={this.handleName} />
            </View>
            <Text style={styles.errtxt}>{this.state.nameerror!='a'?this.state.nameerror:''}</Text>
           
          </View>
          <View style={styles.headbar}>
            <Text style={styles.txtheader}>Email</Text>
            <View style={styles.input}>
              <Icon name='mail' style={styles.icon1}/>
             <TextInput
              value={this.state.email}
              placeholder='email'
              style={styles.mainInput}
              onChangeText={this.handleEmail}
            />
            </View>
            <Text style={styles.errtxt}>{this.state.mailerror!='a'?this.state.mailerror:''}</Text>
          </View>
          <View style={styles.headbar}>
            <Text style={styles.txtheader}>Password</Text>
           <View style={styles.input}>
            <Icon name='lock' style={styles.icon1}/>
            
           <TextInput value={this.state.password}
              secureTextEntry={this.state.isvisible ? true : false}
              placeholder='password'
              style={styles.mainInput}
              onChangeText={this.handlePassword} />
            {this.state.isvisible? <Icon name='eye' style={styles.icon2} onPress ={ () => {
              this.setState({
                isvisible : !this.state.isvisible
              })
             } } />:<Icon name='eye-with-line' style={styles.icon2} onPress ={ () => {
              this.setState({
                isvisible : !this.state.isvisible
              })
             } } />}
           </View>
           <Text style={styles.errtxt}>{this.state.passworderror!='a'?this.state.passworderror:''}</Text>
          </View>
          <TouchableOpacity onPress={this.handleSubmit
                // ()=>{
                //   if (this.state.usererror!=''||this.state.nameerror!=''
                //   ||this.state.mailerror!=''||this.state.passworderror) {
                //     this.handleSubmit()
                //   }
                // }
// console.log('user:',this.state.usererror,"name:",this.state.nameerror,'mail:',this.state.mailerror,'password',this.state.passworderror)         
        }
            style={styles.button}><Text style={styles.txt1}>Submit</Text></TouchableOpacity>
          <TouchableOpacity onPress={this.displayData}
            style={styles.button1}><Text style={styles.txt3}>Display Data</Text></TouchableOpacity>
        </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  txt1: {
    fontSize: 25,
    textAlign: 'center',
    bottom: 6,
    // marginLeft: 20,
    // padding:50

  },
  txt3: {
    fontSize: 25,
    textAlign: 'center',
    bottom: 6,
    marginTop:10

  },
  t1:{
    marginLeft:20
  },

  input: {
    borderWidth: 0.3,
    height: 40,
    width: 330,
    alignItems:'stretch',
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    alignContent:'center',
    borderRadius:20,
    borderWidth:1,
    

  },
  txt: {
    fontSize: 25,
    fontFamily: 'AppleSDGothicNeo-Bold',
    margin: 10,
    width: "90%",
    borderRadius: 9,
  },

  head: {
    alignItems: "center",
    margin: 30,
    flexDirection: "row",
   
  },
  headbar: {
    // marginLeft: 20,
    // padding:5,
    color:'green'
   
    // width:'100%'
  //  alignItems:'center'
  },
  icon: {
    fontSize:30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 80,
    height: 80,
    borderWidth: 5,
    padding: 15

  },
  imgcon: {
    alignItems: "center"
  },
  img: {
    alignItems: "center",

  },
  button: {
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 15,
    height: 50,
    fontSize: 30,
    width: '80%',
    // padding:2,
    borderRadius: 60,
    backgroundColor: '#FF9F29',
    marginLeft: 30
  },
  button1: {
    alignItems: 'center',
    alignContent: 'center',
    margin:30,
    height: 50,
    fontSize: 30,
    width: '80%',
    borderRadius: 60,
    backgroundColor: '#FF9F29',
    marginLeft: 30
  },
  icon1:{
    fontSize:15,
    padding:12
  },
  icon2:{
    fontSize:20,
    padding:8,
    position:'absolute',
    left:270
  },
  upicn:{
    fontSize:20
  },
  errtxt:{
   marginLeft: 29,
    padding:5,
    color:'green'
  },
  txtheader:{
    marginLeft:35
  },
  mainInput:{
    width:240
  }
 
})