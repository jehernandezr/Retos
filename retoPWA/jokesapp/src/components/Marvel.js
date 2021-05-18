import React, { useEffect, useState } from 'react';
import CryptoJS from "crypto-js";
import Heroe from "./Heroe";

export default function Marvel(props) {
    const [heroes, setHeroes] = useState([]);


    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("heroes") === "") {
                setHeroes("Loading...")
            } else {
                setHeroes(JSON.parse(localStorage.getItem("heroes")));
            }
        } else {
            const ts = new Date().getTime();
            const apikey = "0f2e42524ac219c11afb28d0127b547b";
            const privatekey ="19839a12d4a5d75c6120dfb7703be96b9df475f5";
            const hash = CryptoJS.MD5(ts+privatekey+apikey);
            const URL = "http://gateway.marvel.com/v1/public/characters?ts="+ts+"&apikey="+apikey+"&hash="+hash;
            fetch(URL).then(res=>res.json()).then(res=>{
                setHeroes(res.data.results);
                localStorage.setItem("heroes", JSON.stringify(res.data.results));
            })
        }
    }, []);

    return (
        <div className="row justify-content-center">
            {heroes.map(h => {return <Heroe heroe={h} key = {h.id}/>})}
        </div>);
}