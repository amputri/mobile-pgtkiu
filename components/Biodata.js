import React, { useContext } from 'react';
import { AuthContext } from '../assets/AuthContext';
import { View, Text, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { bulan, pendidikan, pekerjaan, penghasilan } from '../assets/axios/Link'

const Biodata = () => {
    const { contextSiswa } = useContext(AuthContext);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ padding: 20 }}>
                <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 5 }}>Data Pribadi Siswa</Text>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Nama Siswa : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.nama_siswa}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>L/P : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.jenis_kelamin === "L" ? 'Laki-Laki' : 'Perempuan'}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Panggilan : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.panggilan}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>NISN : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.nisn}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Tempat Lahir : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.tempat_lahir}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Tanggal Lahir : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.tanggal_lahir.split('-')[2]} {bulan[contextSiswa?.tanggal_lahir.split('-')[1]-1]} {contextSiswa?.tanggal_lahir.split('-')[0]}</Text>
                </View>

                <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 5, marginTop: 15 }}>Data Ayah</Text>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Nama Ayah : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.nama_ayah}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pendidikan Ayah : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pendidikan[contextSiswa?.pendidikan_ayah]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pekerjaan Ayah : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pekerjaan[contextSiswa?.pekerjaan_ayah]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Penghasilan Ayah : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{penghasilan[contextSiswa?.penghasilan_ayah]}</Text>
                </View>

                <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 5, marginTop: 15 }}>Data Ibu</Text>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Nama Ibu : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.nama_ibu}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pendidikan Ibu : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pendidikan[contextSiswa?.pendidikan_ibu]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pekerjaan Ibu : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pekerjaan[contextSiswa?.pekerjaan_ibu]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Penghasilan Ibu : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{penghasilan[contextSiswa?.penghasilan_ibu]}</Text>
                </View>

                <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 5, marginTop: 15 }}>Data Wali</Text>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Nama Wali : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.nama_wali}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pendidikan Wali : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pendidikan[contextSiswa?.pendidikan_wali]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Pekerjaan Wali : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{pekerjaan[contextSiswa?.pekerjaan_wali]}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Penghasilan Wali : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{penghasilan[contextSiswa?.penghasilan_wali]}</Text>
                </View>

                <Text style={{ fontWeight: 'bold', color: 'blue', marginBottom: 5, marginTop: 15 }}>Data Kontak</Text>
                <Divider />
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Alamat Tinggal : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.alamat_tinggal}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Telepon : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.telp_siswa}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text>Telepon : </Text>
                    <Text style={{ flex: 1, fontWeight: 'bold' }}>{contextSiswa?.telp_siswa}</Text>
                </View>
            </ScrollView>

        </View>
    );
};

export default Biodata;