// import React, { useState, useRef } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrScannerInput = () => {
    return (
        <Scanner
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
        />
    );
}

export default QrScannerInput;