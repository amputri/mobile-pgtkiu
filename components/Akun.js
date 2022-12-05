import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { AuthContext } from '../assets/AuthContext';
import { linkYPS } from '../assets/axios/Link';

const Akun = ({ navigation }) => {
    const { contextSiswa, keluarAkun } = useContext(AuthContext);

    const [inputPassword, setInputPassword] = useState('');
    const [inputPasswordBaru, setInputPasswordBaru] = useState('');
    const [inputKonfirmasi, setInputKonfirmasi] = useState('');
    const [errortext, setErrortext] = useState('');

    function logout() {
        keluarAkun()
        navigation.navigate('Login')
    }

    async function simpan() {
        if (inputPasswordBaru === inputKonfirmasi && inputPassword !== "" && inputPasswordBaru !== "") {
            const data = {
                idsiswa: contextSiswa?.idsiswa,
                password: inputPasswordBaru,
                passwordlama: inputPassword
            }
            const res = await linkYPS.post('Siswa/ubahpassword', data)
            setErrortext(res.data.status)
        } else {
            setErrortext('Input Password Tidak Valid')
        }

        this.textInput.clear()
        this.textInput2.clear()
        this.textInput3.clear()
    }

    return (
        <View style={styles.mainBody}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', margin: 15 }}>Ubah Password Akun Siswa</Text>
                        <Text style={{ margin: 15 }}>Username / NISN : {contextSiswa?.nisn}</Text>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                ref={input => { this.textInput = input }}
                                style={styles.inputStyle}
                                onChangeText={(inputPwd) =>
                                    setInputPassword(inputPwd)
                                }
                                placeholder="Masukkan Password Lama"
                                keyboardType="default"
                                secureTextEntry={true}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                ref={input => { this.textInput2 = input }}
                                style={styles.inputStyle}
                                onChangeText={(inputPwdBaru) =>
                                    setInputPasswordBaru(inputPwdBaru)
                                }
                                placeholder="Masukkan Password Baru"
                                keyboardType="default"
                                secureTextEntry={true}
                                returnKeyType="next"
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                ref={input => { this.textInput3 = input }}
                                style={styles.inputStyle}
                                onChangeText={(inputKonf) =>
                                    setInputKonfirmasi(inputKonf)
                                }
                                placeholder="Konfirmasi Password Baru"
                                keyboardType="default"
                                secureTextEntry={true}
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
                            onPress={() => simpan()}>
                            <Text style={styles.buttonTextStyle}>Simpan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyleTwo}
                            activeOpacity={0.5}
                            onPress={() => logout()}>
                            <Text style={styles.buttonTextStyle}>Logout</Text>
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
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        margin: 10
    },
    buttonStyle: {
        backgroundColor: '#2196f3',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#2196f3',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        margin: 15
    },
    buttonStyleTwo: {
        backgroundColor: '#e91e63',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#e91e63',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        margin: 15,
        marginTop: 30
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'black',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
    },
    errorTextStyle: {
        color: 'red',
        fontSize: 16,
        margin: 15,
        marginVertical: 0,
        textAlign: 'center'
    },
});

export default Akun;