import React, { useState } from 'react';

export const AuthContext = React.createContext(null);

const initContextSiswa = {nama_siswa: 'tes'}
const initContextPg = {nama_kelas: 'tes'}
const initContextTka = {nama_kelas: 'tes'}
const initContextTkb = {nama_kelas: 'tes'}

export const ContextProvider = props => {
    const [contextSiswa, setContextSiswa] = useState(initContextSiswa);
    const [contextPg, setContextPg] = useState(initContextPg);
    const [contextTka, setContextTka] = useState(initContextTka);
    const [contextTkb, setContextTkb] = useState(initContextTkb);

    const masukAkun = (loginSiswa, loginPg, loginTka, loginTkb) => {
        setContextSiswa(loginSiswa);
        setContextPg(loginPg);
        setContextTka(loginTka);
        setContextTkb(loginTkb);
    }

    const keluarAkun = () => {
        setContextSiswa({nama_kelas: 'tes'});
        setContextPg({nama_kelas: 'tes'});
        setContextTka({nama_kelas: 'tes'});
        setContextTkb({nama_kelas: 'tes'});
    }

    return (
        <AuthContext.Provider
            value={{
                contextSiswa,
                contextPg,
                contextTka,
                contextTkb,
                masukAkun,
                keluarAkun,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};