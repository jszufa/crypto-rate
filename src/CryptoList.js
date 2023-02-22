import React from 'react';

import './CryptoList.css';

const CryptoList = (props) => {

    let cryptoArray = props.cryptoRate.map(
        (data) => {
            return (
                <li key={data.currency}>
                    <span className='CryptoLabel'>Latest rate:</span>
                    <span className={`CryptoRate ${data.cssClass}`}>{data.lastRate} {data.htmlArray} </span>
                    <span className='CurrencyTicker'>{data.currency}</span>
                    {/*  <span className='CurrencySymbol'>[$]</span> Serwer nie przekazuje już symbolu */} </li>)
        }
    )


    return (
        <div className='CryptoList'>
            <ul className='TheList'>
                {cryptoArray}
            </ul>
        </div>
    )
}


export default CryptoList;