
// current date and time
const d = new Date();
console.log(d);

// current date and time in ms
dtNow = Date.now()

// get specific date/time info. month is 0 indexed
console.log(d.getMonth());
console.log(d.getDate());

// API Key can be referenced but will not be pushed 

const api = {
    key: 'b503d8a6459931e887b80c46f6457b28',
    lat: '33.67',
    lon: '-117.82',
    time: dtNow,
    city: "Irvine"
};  

