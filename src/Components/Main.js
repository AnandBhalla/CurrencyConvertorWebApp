import React, { useEffect, useState } from 'react';
import './Main.css';
import CurrencySelector from './CurrencySelector';

function Main() {
    const [fromCurrency, setfromCurrency] = useState('USD');
    const [toCurrency, settoCurrency] = useState('INR');
    const [amount, setamount] = useState(1);
    const [result, setresult] = useState(0);
    const [rate, setrate] = useState(0);

    const swap = () => {
        setfromCurrency(toCurrency);
        settoCurrency(fromCurrency);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        convert();
    };

    const convert = async () => {
        const API_KEY = process.env.REACT_APP_API;
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
        const response = await fetch(url);
        const data = await response.json();
        setrate(data.conversion_rate);
        setresult((amount * data.conversion_rate).toFixed(2));
    };

    useEffect(() => {
        convert();
    }, [fromCurrency, toCurrency]);

    return (
        <div className="container">
            <div className="input">
                <h5>Input Value</h5>
                <textarea id="input-value" value={amount} onChange={e => setamount(e.target.value)}></textarea>
            </div>
            <div className="conversion">
                <div className="conversion-input">
                    <CurrencySelector
                        selectedCurrency={fromCurrency}
                        handleCurrency={e => setfromCurrency(e.target.value)}
                    />
                </div>
                <span><i className="fa-solid fa-arrow-right-arrow-left" id="interchange" onClick={swap}></i></span>
                <div className="conversion-output">
                    <CurrencySelector
                        selectedCurrency={toCurrency}
                        handleCurrency={e => settoCurrency(e.target.value)}
                    />
                </div>
            </div>
            <div className="output">
                <h5>Output Value</h5>
                <textarea id="output-value" value={result} readOnly></textarea>
            </div>
            <button className="exchange" onClick={handleSubmit}>CONVERT</button>
            <h5 id="last"></h5>
            <div>
                {result && (
                    <h5>1 {fromCurrency} = {rate} {toCurrency}</h5>
                )}
            </div>
        </div>
    );
}

export default Main;
