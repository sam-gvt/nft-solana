import React, { useEffect, useState } from "react";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Home = () => {


  const [walletAddress, setWalletAddress] = useState(null)

  const checkIfWalletIsConnected = async () => {
      console.log("objet window : ", window.solana);
      try {
        const { solana } = window;
        if (solana) {
          if (solana.isPhantom) {
            console.log("Phantom wallet found !");
            const response = await solana.connect({onlyIfTrusted: true})
            console.log('Connect with Public key: ', response.publicKey.toString());

            setWalletAddress(response.publicKey.toString())
          }
        } else {
          alert("Solana object not found, please get a Phantom Wallet !");
        }
      } catch (err) {
        console.log(err);
      }
    
  };

  const connectWallet = async() => {
    const {solana} = window;
    if (solana) {
        const response = await solana.connect()
        console.log('Connect with Public key: ', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString())

    }
  }

  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>Connect</button>
  )


  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    //'load' se produit lorsque la page web et
    // tous ses éléments (images, feuilles de style, etc.) ont été complètement chargés.
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          { !walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
