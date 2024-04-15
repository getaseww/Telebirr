# Telebirr Mobile Wallet Payment API Integration

This npm package facilitates seamless integration with the Telebirr Mobile Wallet payment API, empowering developers to effortlessly incorporate Telebirr's payment capabilities into their Node.js applications.

## Installation

You can install the package via npm:

```bash
npm install telebirr-sdk
```

## Usage

### Initialize

First, initialize the Telebirr payment API with your API credentials:

```javascript
import { Telebirr } from 'telebirr-sdk';

const telebirr = new Telebirr(appId, appKey, shortCode, publicKey);
```

### Encrypt Payload

Encrypt a payload using the provided encryption method:

```javascript
const encryptedData = telebirr.encrypt({
  nonce: 'unique_nonce',
  outTradeNo: 'transaction_id',
  returnUrl: 'return_url',
  subject: 'payment_subject',
  timeoutExpress: 'timeout_express',
  timestamp: 'timestamp',
  totalAmount: 'total_amount',
  receiveName: 'receiver_name', // optional
  notifyUrl: 'notification_url', // optional
});
```

### Sign Data

Sign the payload data for security purposes:

```javascript
const signature = telebirr.signData({
  nonce: 'unique_nonce',
  outTradeNo: 'transaction_id',
  returnUrl: 'return_url',
  subject: 'payment_subject',
  timeoutExpress: 'timeout_express',
  timestamp: 'timestamp',
  totalAmount: 'total_amount',
  receiveName: 'receiver_name', // optional
  notifyUrl: 'notification_url', // optional
});
```

### Initialize Web Payment

Initiate a web payment transaction:

Use signature as a value of sign and encryptedData as a value of ussd when you initiate payment.

```javascript
telebirr.initWebPayment(url, sign, ussd)
  .then(response => {
    console.log("Response from Telebirr:", response);
    // Handle successful response here
  })
  .catch(error => {
    console.error("Error from Telebirr:", error);
    // Handle error here
  });
```

#### Example Response

Upon successful request, the API returns a response like this:

code 0 always indicates success
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "toPayUrl": "https://h5pay.trade.pay/payId=RE9879T0972S"
  }
}
```

<!-- ## API Documentation

For detailed API documentation, please refer to the [Telebirr Mobile Wallet API documentation](https://telebirr.et/developer). -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Variables and Types

| Variable       | Type    | Required | Description                     |
|----------------|---------|----------|---------------------------------|
| appId          | string  | Yes      | Application ID provided by Telebirr |
| appKey         | string  | Yes      | Application key provided by Telebirr |
| shortCode      | string  | Yes      | Short code provided by Telebirr |
| publicKey      | string  | Yes      | Public key provided by Telebirr |
| nonce          | string  | Yes      | Unique nonce for the transaction |
| outTradeNo     | string  | Yes      | Unique identifier for the transaction |
| returnUrl      | string  | Yes      | URL to redirect after payment completion |
| subject        | string  | Yes      | Subject of the payment |
| timeoutExpress | string  | Yes      | Timeout duration for the payment |
| timestamp      | string  | Yes      | Timestamp of the transaction |
| totalAmount    | string  | Yes      | Total amount of the transaction |
| receiveName    | string  | No       | Name of the receiver (optional) |
| notifyUrl      | string  | No       | URL for receiving payment notifications (optional) |

---

Please replace `appId`, `appKey`, `shortCode`, and `publicKey` with the actual values provided by Telebirr. Adjust the usage examples and descriptions according to your package's specific functionalities.