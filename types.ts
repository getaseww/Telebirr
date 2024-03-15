export type EncryptionPayloadType={
        appId: string,
        shortCode: string,
        nonce: string,
        outTradeNo: string,
        returnUrl: string,
        subject: string,
        timeoutExpress: string,
        timestamp: string,
        totalAmount: string,
        receiveName?: string,
        notifyUrl?: string,
}


export type SignaturePayloadType={
    appId: string,
    appKey: string,
    shortCode: string,
    nonce: string,
    outTradeNo: string,
    returnUrl: string,
    subject: string,
    timeoutExpress: string,
    timestamp: string,
    totalAmount: string,
    receiveName?: string,
    notifyUrl?: string,
}