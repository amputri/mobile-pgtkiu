import React, {useState, useContext} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { AuthContext } from '../assets/AuthContext';
import { linkYPS, link } from '../assets/axios/Link';

const Login = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errortext, setErrortext] = useState('');

    const { masukAkun } = useContext(AuthContext);

    async function masuk() {
        const data = {
            username: userEmail,
            password: userPassword
        }
        const res = await linkYPS.post('Siswa/login', data)

        if (res.data.status === 200) {
            const res2 = await link.get('Siswa/riwayat/'+res.data.data.idsiswa)
            masukAkun(res.data.data, res2.data[0], res2.data[1], res2.data[2])
            
            setErrortext('')
            this.textInput.clear()
            this.textInput2.clear()
            navigation.navigate('Root')
        } else if (res.data.status === 400) {
            setErrortext('Data tidak Valid')
            this.textInput.clear()
            this.textInput2.clear()
        }
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={{uri: 'https://api-pgtkiu.sihaq.com/assets/images/logo.png'}}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    resizeMode: 'contain',
                                    margin: 10,
                                }}
                            />
                            <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>E-Rapot PG TKIU EL-HAQ</Text>
                            <Text style={{color:'white', fontSize:14, fontStyle:'italic'}}>(untuk wali murid)</Text>
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                ref={input => { this.textInput2 = input }}
                                style={styles.inputStyle}
                                onChangeText={(UserEmail) =>
                                    setUserEmail(UserEmail)
                                }
                                placeholder="Masukkan NISN Siswa" 
                                keyboardType='numeric'
                                placeholderTextColor="white"
                                autoCapitalize="none"
                                returnKeyType="next"
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                ref={input => { this.textInput = input }}
                                style={styles.inputStyle}
                                onChangeText={(UserPassword) =>
                                    setUserPassword(UserPassword)
                                }
                                placeholder="Masukkan Password" 
                                placeholderTextColor="white"
                                keyboardType="default"
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        {errortext != '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errortext}
                            </Text>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={()=> masuk()}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#2196f3',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#e91e63',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#e91e63',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    registerTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default Login;