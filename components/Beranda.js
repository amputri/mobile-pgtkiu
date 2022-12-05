import React, { useContext } from 'react';
import { AuthContext } from '../assets/AuthContext';
import { View, Image, ScrollView, Text } from 'react-native';
import { Divider, Paragraph, Button } from 'react-native-paper';

const Beranda = ({ navigation }) => {
    const { contextSiswa, contextPg, contextTka, contextTkb } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <Divider />
            <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', padding: 15 }}>
                <View style={{ marginEnd: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{
                            width: 120,
                            height: 160,
                        }}
                        source={{ uri: contextTka?.foto_masuk !== '' ? contextTka?.foto_masuk : contextPg?.foto_masuk !== '' ? contextPg?.foto_masuk : 'https://api-pgtkiu.sihaq.com/assets/images/logo.png' }}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{contextSiswa?.nama_siswa}</Text>
                    <Divider style={{ marginVertical: 5 }} />
                    <Text style={{ fontSize: 14 }}>{contextSiswa?.panggilan}</Text>
                </View>
            </View>
            <Divider />
            <ScrollView style={{ padding: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        contentStyle={{ justifyContent: 'flex-start' }}
                        uppercase={false}
                        color="lightblue"
                        mode="contained"
                        onPress={() => navigation.navigate("Biodata")}>
                        <Paragraph>Biodata Siswa</Paragraph>
                    </Button>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Paragraph style={{ fontWeight: 'bold', color: 'green' }}>
                        Riwayat Perkembangan dan Pencapaian
                    </Paragraph>
                    <Divider style={{ marginBottom: 5 }} />
                    {
                        contextPg?.kelasnamakelas ? (
                            <Button
                                contentStyle={{ justifyContent: 'flex-start' }}
                                style={{ marginBottom: 5 }}
                                uppercase={false}
                                color="lightgreen"
                                mode="contained"
                                onPress={() => navigation.navigate('Rapot PG')}>
                                <Paragraph>Rapot PG</Paragraph>
                            </Button>
                        ) : ''
                    }
                    {
                        contextTka?.kelasnamakelas ? (
                            <Button
                                contentStyle={{ justifyContent: 'flex-start' }}
                                style={{ marginBottom: 5 }}
                                uppercase={false}
                                color="lightgreen"
                                mode="contained"
                                onPress={() => navigation.navigate('Rapot TK A')}>
                                <Paragraph>Rapot TK A</Paragraph>
                            </Button>
                        ) : ''
                    }
                    {
                        contextTkb?.kelasnamakelas ? (
                            <Button
                                contentStyle={{ justifyContent: 'flex-start' }}
                                style={{ marginBottom: 5 }}
                                uppercase={false}
                                color="lightgreen"
                                mode="contained"
                                onPress={() => navigation.navigate('Rapot TK B')}>
                                <Paragraph>Rapot TK B</Paragraph>
                            </Button>
                        ) : ''
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Button
                        contentStyle={{ justifyContent: 'flex-start' }}
                        style={{ marginBottom: 5 }}
                        uppercase={false}
                        color="pink"
                        mode="contained"
                        onPress={() => navigation.navigate('Akun')}>
                        <Paragraph>Data Akun Siswa</Paragraph>
                    </Button>
                </View>
                <View style={{ marginBottom: 20 }}></View>
            </ScrollView>
        </View>
    );
};

export default Beranda;