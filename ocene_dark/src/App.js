import React, { useState, useRef } from 'react';
import './App.css';

const apiHost = process.env.REACT_APP_API_HOST;
export default function App() {
    const [ocene, setOcene] = useState();
    const [ocena, setOcena] = useState('');
    const [predmet, setPredmet] = useState('');
    const o = useRef();

    const dodajPredmet = async () => {
        console.log('ja');
        const data = { ocena: ocena, predmet: predmet };
        setPredmet('');
        setOcena('');
        document.getElementById('ocena').value = '';
        document.getElementById('predmet').value = '';
        const res = await fetch(`api/dodajPredmet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        //axios request na /dodajpredmet, ki ga doda v podatkovno bazo
    };

    const prikaziVse = async () => {
        //axios request na /pokaziVse, ki vrne use predmete ki so shranjeni v podatkovni bazi
        const res = await fetch(`api/vseOcene`);
        const jsona = await res.json();
        console.log(res);
        console.log(jsona);
        console.log('jabadabadu');
        setOcene(jsona);
    };
    return (
        <div className="something">
            <div className="top">MOJA REDOVALNICA</div>
            {/* {ocene && <p>{'neki imamo'}</p>} */}
            {ocene &&
                ocene.map(({ ocena, predmet }) => {
                    return (
                        <div className="linija" key={predmet}>
                            {predmet} --> {ocena}
                        </div>
                    );
                })}
            {/* <div className="linija">6 opb</div>
            <div className="linija">6 opb</div>
            <div className="linija">6 opb</div>
            <div className="linija">6 opb</div> */}
            <input
                type="text"
                id="ocena"
                placeholder="vnesi oceno"
                onChange={(e) => {
                    setOcena(e.target.value);
                }}
                ref={o}
            />
            <input
                type="text"
                id="predmet"
                placeholder="vnesi predmet"
                onChange={(e) => {
                    setPredmet(e.target.value);
                }}
            />
            <button onClick={dodajPredmet}>dodaj v redovalnico</button>
            <button onClick={prikaziVse}>prikazi redovalnico</button>
        </div>
    );
}
