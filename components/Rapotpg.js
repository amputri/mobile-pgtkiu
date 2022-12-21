import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../assets/AuthContext';
import { View, Text, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Divider, Paragraph } from 'react-native-paper';
import { link, komentarCapaian, surah, jilid, komentarHuruf } from '../assets/axios/Link';

const Rapotpg = () => {
    const [visiblePerkembangan, setVisiblePerkembangan] = useState(false);
    const [visibleAbsen, setVisibleAbsen] = useState(false);
    const [visiblePencapaian, setVisiblePencapaian] = useState(false);
    const [visibleNgaji, setVisibleNgaji] = useState(false);

    const [bidangPengembangan, setBidangPengembangan] = useState([]);
    const [indikator, setIndikator] = useState([]);
    const [nilaiPengembanganSatu, setNilaiPengembanganSatu] = useState([]);
    const [fotoPengembanganSatu, setFotoPengembanganSatu] = useState([]);
    const [nilaiPengembanganDua, setNilaiPengembanganDua] = useState([]);
    const [fotoPengembanganDua, setFotoPengembanganDua] = useState([]);
    const [absenFisikSatu, setAbsenFisikSatu] = useState([]);
    const [absenFisikDua, setAbsenFisikDua] = useState([]);
    const [capaianNgajiSatu, setCapaianNgajiSatu] = useState([]);
    const [capaianNgajiDua, setCapaianNgajiDua] = useState([]);
    const [capaian, setCapaian] = useState([]);
    const [subcapaian, setSubcapaian] = useState([]);
    const [nilaiCapaianSatu, setNilaiCapaianSatu] = useState([]);
    const [nilaiCapaianDua, setNilaiCapaianDua] = useState([]);

    const { contextPg } = useContext(AuthContext);

    useEffect(() => {
        getBidangPengembangan()
        getNilaiPengembangan()
        getFotoPengembangan()
        getAbsenFisik()
        getCapaianNgaji()
        getCapaian()
        getNilaiCapaian() // eslint-disable-next-line
    }, [])

    async function getBidangPengembangan() {
        const res = await link.get('Bidangpengembangan/' + contextPg?.rombelidtapel)
        setBidangPengembangan(res.data)
        getBidangPengembanganWithIndikator(res.data)
    }

    async function getIndikator(idBidangPengembangan) {
        const res = await link.get('Indikator/' + idBidangPengembangan)
        return res.data
    }

    async function getBidangPengembanganWithIndikator(bidangPengembangan) {
        const withDetail = await Promise.all(bidangPengembangan.map(bp => getIndikator(bp.id)))
        setIndikator(withDetail)
    }

    async function getNilaiPengembangan() {
        const resSatu = await link.get(`Nilaipengembangan/${contextPg?.siswarombelid}/1`)
        setNilaiPengembanganSatu(resSatu.data)

        const resDua = await link.get(`Nilaipengembangan/${contextPg?.siswarombelid}/2`)
        setNilaiPengembanganDua(resDua.data)
    }

    async function getFotoPengembangan() {
        const resSatu = await link.get(`Fotopengembangan/${contextPg?.siswarombelid}/1`)
        setFotoPengembanganSatu(resSatu.data)

        const resDua = await link.get(`Fotopengembangan/${contextPg?.siswarombelid}/2`)
        setFotoPengembanganDua(resDua.data)
    }

    async function getAbsenFisik() {
        const resSatu = await link.get(`Absenfisik/${contextPg?.siswarombelid}/1`)
        setAbsenFisikSatu(resSatu.data[0])

        const resDua = await link.get(`Absenfisik/${contextPg?.siswarombelid}/2`)
        setAbsenFisikDua(resDua.data[0])
    }

    async function getCapaianNgaji() {
        const resSatu = await link.get(`Capaianummitahfidz/${contextPg?.siswarombelid}/1`)
        setCapaianNgajiSatu(resSatu.data[0])

        const resDua = await link.get(`Capaianummitahfidz/${contextPg?.siswarombelid}/2`)
        setCapaianNgajiDua(resDua.data[0])
    }

    async function getCapaian() {
        const res = await link.get(`Capaian/${contextPg?.rombelidtapel}/${contextPg?.kelastingkat}`)
        setCapaian(res.data)
        getCapaianWithSubcapaian(res.data)
    }

    async function getSubcapaian(idCapaian) {
        const res = await link.get('Subcapaian/' + idCapaian)
        return res.data
    }

    async function getCapaianWithSubcapaian(capaian) {
        let idCapaian = []

        capaian.map(async val => {
            idCapaian.push(val.id)
            val.sub.map(async val2 => {
                idCapaian.push(val2.id)
                val2.sub.map(val3 => idCapaian.push(val3.id))
            })
        })

        const withDetail = await Promise.all(idCapaian.map(id => getSubcapaian(id)))
        setSubcapaian(withDetail)
    }

    async function getNilaiCapaian() {
        const resSatu = await link.get(`Nilaicapaian/${contextPg?.siswarombelid}/1`)
        setNilaiCapaianSatu(resSatu.data)

        const resDua = await link.get(`Nilaicapaian/${contextPg?.siswarombelid}/2`)
        setNilaiCapaianDua(resDua.data)
    }

    let no = 0

    return (
        <View style={{ flex: 1, padding: 15 }}>
            <Paragraph style={{ fontWeight: 'bold', color: 'green' }}>
                Perkembangan Siswa
            </Paragraph>
            <Divider style={{ marginVertical: 10 }} />
            <TouchableOpacity
                onPress={() => setVisiblePerkembangan(true)}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#2196f3',
                    borderRadius: 5,
                    shadowRadius: 3,
                    marginBottom: 10
                }}>
                <Text style={{ color: 'white' }}>Lihat Perkembangan Siswa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setVisibleAbsen(true)}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#e91e63',
                    borderRadius: 5,
                    shadowRadius: 3
                }}>
                <Text style={{ color: 'white' }}>Lihat Absen dan Kesehatan Siswa</Text>
            </TouchableOpacity>

            <Paragraph style={{ fontWeight: 'bold', color: 'green', marginTop: 30 }}>
                Pencapaian Siswa
            </Paragraph>
            <Divider style={{ marginVertical: 10 }} />
            <TouchableOpacity
                onPress={() => setVisiblePencapaian(true)}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#2196f3',
                    borderRadius: 5,
                    shadowRadius: 3,
                    marginBottom: 10
                }}>
                <Text style={{ color: 'white' }}>Lihat Pencapaian Siswa</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setVisibleNgaji(true)}
                style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#e91e63',
                    borderRadius: 5,
                    shadowRadius: 3
                }}>
                <Text style={{ color: 'white' }}>Lihat Pencapaian Mengaji Siswa</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                visible={visiblePerkembangan}
                onRequestClose={() => {
                    setVisiblePerkembangan(false);
                }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: '#2196f3',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                            Perkembangan Siswa
                        </Text>
                        <TouchableOpacity onPress={() => setVisiblePerkembangan(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, borderRadius: 100, backgroundColor: '#e91e63', paddingVertical: 5, paddingHorizontal: 10, color: 'white' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Kelas : {contextPg?.kelasnamakelas}</Text>
                            {
                                bidangPengembangan?.map((val, index) => (
                                    <View key={`bp` + index} style={{ marginBottom: 15 }}>
                                        <View style={{ backgroundColor: '#2196f3', padding: 3 }}>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>{val.nomor_urut + '. Bidang Pengembangan ' + val.bidang_pengembangan}</Text>
                                        </View>
                                        {
                                            indikator[index]?.map((val2, index2) => (
                                                <View key={`i` + index2}>
                                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#e91e63' }}>
                                                        <Text style={{ color: 'white' }}>{val2.nomor_indikator}. {val2.indikator}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarCapaian[nilaiPengembanganSatu[nilaiPengembanganSatu.map(item => item.idindikator).indexOf(val2.id)]?.nilai - 1]}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarCapaian[nilaiPengembanganDua[nilaiPengembanganDua.map(item => item.idindikator).indexOf(val2.id)]?.nilai - 1]}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                            <Text style={{ color: 'white' }}>Foto Pengembangan</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                                <Image
                                                    source={{ uri: fotoPengembanganSatu[fotoPengembanganSatu.map(item => item.idbidangpengembangan).indexOf(val.id)]?.foto }}
                                                    style={{
                                                        width: '100%',
                                                        height: 120,
                                                        resizeMode: 'contain',
                                                        margin: 10,
                                                    }}
                                                />
                                            </View>
                                            <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                                <Image
                                                    source={{ uri: fotoPengembanganDua[fotoPengembanganDua.map(item => item.idbidangpengembangan).indexOf(val.id)]?.foto }}
                                                    style={{
                                                        width: '100%',
                                                        height: 120,
                                                        resizeMode: 'contain',
                                                        margin: 10,
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <Divider style={{ marginTop: 15 }} />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={visibleAbsen}
                onRequestClose={() => {
                    setVisibleAbsen(false);
                }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: '#e91e63',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                            Absen dan Kesehatan Siswa
                        </Text>
                        <TouchableOpacity onPress={() => setVisibleAbsen(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, borderRadius: 100, backgroundColor: '#2196f3', paddingVertical: 5, paddingHorizontal: 10, color: 'white' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Kelas : {contextPg?.kelasnamakelas}</Text>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ backgroundColor: '#e91e63', padding: 3 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>Ketidakhadiran</Text>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>1. Sakit</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.sakit} hari</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.sakit} hari</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>2. Izin</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.izin} hari</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.izin} hari</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>3. Tanpa Keterangan</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.alpha} hari</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.alpha} hari</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{ marginTop: 15 }} />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ backgroundColor: '#e91e63', padding: 3 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>Kesehatan Fisik</Text>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>1. Tinggi Badan</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.tinggibadan} cm</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.tinggibadan} cm</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>2. Berat Badan</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.beratbadan} kg</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.beratbadan} kg</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#2196f3' }}>
                                        <Text style={{ color: 'white' }}>3. Lingkar Kepala</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{absenFisikSatu?.lingkarkepala} cm</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{absenFisikDua?.lingkarkepala} cm</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{ marginTop: 15 }} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={visiblePencapaian}
                onRequestClose={() => {
                    setVisiblePencapaian(false);
                }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: '#2196f3',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                            Pencapaian Siswa
                        </Text>
                        <TouchableOpacity onPress={() => setVisiblePencapaian(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, borderRadius: 100, backgroundColor: '#e91e63', paddingVertical: 5, paddingHorizontal: 10, color: 'white' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Kelas : {contextPg?.kelasnamakelas}</Text>
                            {
                                capaian?.map((val, index) => (
                                    <View key={'c' + index} style={{ marginBottom: 15 }}>
                                        <View style={{ backgroundColor: '#2196f3', padding: 3 }}>
                                            <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>{val.nomor_capaian}. {val.capaian}</Text>
                                        </View>
                                        {
                                            subcapaian[no++]?.map((val4, index4) => (
                                                <View key={'s' + index4}>
                                                    <View style={{ flex: 1, padding: 3, backgroundColor: '#e91e63' }}>
                                                        <Text style={{ color: 'white' }}>{val4.nomor_subcapaian}. {val4.subcapaian}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianSatu[nilaiCapaianSatu.map(item => item.idsubcapaian).indexOf(val4.id)]?.nilai - 1]}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                                            <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianDua[nilaiCapaianDua.map(item => item.idsubcapaian).indexOf(val4.id)]?.nilai - 1]}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))
                                        }
                                        {
                                            val.sub.map((val2, index2) => (
                                                <View key={'d' + index2}>
                                                    <View style={{ backgroundColor: '#2196f3', padding: 3 }}>
                                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>{val2.nomor_capaian}. {val2.capaian}</Text>
                                                    </View>
                                                    {
                                                        subcapaian[no++]?.map((val5, index5) => (
                                                            <View key={'su' + index5}>
                                                                <View style={{ flex: 1, padding: 3, backgroundColor: '#e91e63' }}>
                                                                    <Text style={{ color: 'white', marginStart: 10 }}>{val5.nomor_subcapaian}. {val5.subcapaian}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianSatu[nilaiCapaianSatu.map(item => item.idsubcapaian).indexOf(val5.id)]?.nilai - 1]}</Text>
                                                                    </View>
                                                                    <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                                                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianDua[nilaiCapaianDua.map(item => item.idsubcapaian).indexOf(val5.id)]?.nilai - 1]}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        ))
                                                    }
                                                    {
                                                        val2.sub.map((val3, index3) => (
                                                            <View key={'3' + index3}>
                                                                <View style={{ backgroundColor: '#2196f3', padding: 3 }}>
                                                                    <Text style={{ fontWeight: 'bold', color: 'white', marginStart: 10 }}>{val3.nomor_capaian}. {val3.capaian}</Text>
                                                                </View>
                                                                {
                                                                    subcapaian[no++]?.map((val6, index6) => (
                                                                        <View key={'sub' + index6}>
                                                                            <View style={{ flex: 1, padding: 3, backgroundColor: '#e91e63' }}>
                                                                                <Text style={{ color: 'white', marginStart: 20 }}>{val6.nomor_subcapaian}. {val6.subcapaian}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: 'row' }}>
                                                                                <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                                                    <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                                                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianSatu[nilaiCapaianSatu.map(item => item.idsubcapaian).indexOf(val6.id)]?.nilai - 1]}</Text>
                                                                                </View>
                                                                                <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                                                                    <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                                                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{komentarHuruf[nilaiCapaianDua[nilaiCapaianDua.map(item => item.idsubcapaian).indexOf(val6.id)]?.nilai - 1]}</Text>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    ))
                                                                }
                                                            </View>
                                                        ))
                                                    }
                                                </View>
                                            ))
                                        }
                                        <Divider style={{ marginTop: 15 }} />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                visible={visibleNgaji}
                onRequestClose={() => {
                    setVisibleNgaji(false);
                }}>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            backgroundColor: '#e91e63',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                            Pencapaian Mengaji Siswa
                        </Text>
                        <TouchableOpacity onPress={() => setVisibleNgaji(false)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, borderRadius: 100, backgroundColor: '#2196f3', paddingVertical: 5, paddingHorizontal: 10, color: 'white' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Kelas : {contextPg?.kelasnamakelas}</Text>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ backgroundColor: '#e91e63', padding: 3 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>Capaian UMMI</Text>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{jilid[capaianNgajiSatu?.jilid]}</Text>
                                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Nilai : {komentarHuruf[capaianNgajiSatu?.nilaiummi - 1]}</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{jilid[capaianNgajiDua?.jilid]}</Text>
                                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Nilai : {komentarHuruf[capaianNgajiDua?.nilaiummi - 1]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{ marginTop: 15 }} />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={{ backgroundColor: '#e91e63', padding: 3 }}>
                                    <Text style={{ fontWeight: 'bold', marginBottom: 5, color: 'white', textAlign: 'center' }}>Capaian Tahfidz</Text>
                                </View>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 1</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{surah[capaianNgajiSatu?.surah]}</Text>
                                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Nilai : {komentarHuruf[capaianNgajiSatu?.nilaitahfidz - 1]}</Text>
                                        </View>
                                        <View style={{ flex: 1, borderWidth: 1, padding: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline' }}>Semester 2</Text>
                                            <Text style={{ fontWeight: 'bold' }}>{surah[capaianNgajiDua?.surah]}</Text>
                                            <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Nilai : {komentarHuruf[capaianNgajiDua?.nilaitahfidz - 1]}</Text>
                                        </View>
                                    </View>
                                </View>
                                <Divider style={{ marginTop: 15 }} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

export default Rapotpg;