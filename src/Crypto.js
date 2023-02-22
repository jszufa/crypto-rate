import React, { Component } from 'react';
import './Crypto.css';
import axios from 'axios';

import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cryptoList: [],
            filteredCryptoList: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.getCryptoData();

        }, 5000)
        /* console.log(this.state.cryptoList); */
      /*   console.log(`Mounting lifeCycle componentDidMount()`); */

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
        /* console.log(`Unmounting lifeCycle componentWillUnmount()`) */
    }

    getCryptoData = () => {

        axios.get('https://blockchain.info/ticker', { mode: 'cors' })
            .then((response) => {
                const tickers = response.data;
                /* console.log(tickers); */

                this.setState(
                    (prevState) => {
                        let newCryptoList = [];
                        for (const [ticker, cryptoObject] of Object.entries(tickers)) {

                            let lastCryptoObj = prevState.cryptoList.find((cryptoObj) => {

                                return (cryptoObj.currency === ticker);
                            });

                            /* console.log(lastCryptoObj); */




                            let newCryptoObj = {
                                currency: ticker,
                                symbol: cryptoObject.symbol,
                                buy: cryptoObject.buy,
                                sell: cryptoObject.sell,
                                lastRate: cryptoObject.last,

                            }

                            if (lastCryptoObj !== undefined) {
                                // code here
                                if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                    newCryptoObj.cssClass = 'green';
                                    newCryptoObj.htmlArray = String.fromCharCode(8593);
                                }
                                else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                    newCryptoObj.cssClass = 'red';
                                    newCryptoObj.htmlArray = String.fromCharCode(8595);
                                }
                                else {
                                    newCryptoObj.cssClass = 'blue';
                                    newCryptoObj.htmlArray = String.fromCharCode(8596);
                                }

                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArray = String.fromCharCode(8596);

                            }

                            newCryptoList.push(newCryptoObj)
                        }

                        return ({ cryptoList: newCryptoList })
                    }
                );
                this.filterCryptoList();
                /* console.log(this.state.cryptoList); */
            });

    }


    /* Filtrowanie */

    filterCryptoList = () => {
        this._inputData.value = this._inputData.value.trim().toUpperCase();
       /*  console.log(this._inputData.value); */

        this.setState(
            (prevState) => {
                let newfilteredCryptoList = prevState.cryptoList.filter(cryptoObj => cryptoObj.currency.includes(this._inputData.value));

               /*  console.log(newfilteredCryptoList) */
                return ({ filteredCryptoList: newfilteredCryptoList })
            })


    }


    render() {
        return (
            <div className='Crypto'>
                <input ref={data =>  this._inputData = data } type="text" placeholder='Filter' onChange={this.filterCryptoList}/>
                <CryptoList cryptoRate={this.state.filteredCryptoList} />
            </div>
        );
    }



}

export default Crypto;