import Quagga from "quagga";
import React, { useEffect, useRef } from "react";
import "../styles/Scanner.scss";
const Scanner = ({ onDetected }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: videoRef.current,
        },
        decoder: {
          readers: ["ean_reader"], // Code-barres EAN pour les livres
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      if (data.codeResult && data.codeResult.code) {
        onDetected(data.codeResult.code);
      }
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return <div className="scanner-container" ref={videoRef} />;
};

export default Scanner;
