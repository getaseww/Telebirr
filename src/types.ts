export type EncryptionPayloadType={
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