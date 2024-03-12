// import React, { useState, useRef } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScannerInput = () => {
    return (
        <Scanner
            onResult={(_text, result) => alert(result)}
            onError={(error) => console.log(error?.message)}
        />
    );
}

export default QrScannerInput;