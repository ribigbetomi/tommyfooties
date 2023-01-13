// const request = require("request");

// const paystack = (request) => {
//   const MySecretKey = "sk_test_df8ac117e16de01f31505eb7883fc0f359aa680e";

//   const initializePayment = (form, mycallback) => {
//     const options = {
//       url: "https://api.paystack.co/transaction/initialize",
//       headers: {
//         authorization: MySecretKey,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//       form,
//     };
//     const callback = (error, response, body) => {
//       return mycallback(error, body);
//     };
//     request.post(options, callback);
//   };
//   const verifyPayment = (ref, mycallback) => {
//     const options = {
//       url:
//         "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
//       headers: {
//         authorization: MySecretKey,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//     };
//     const callback = (error, response, body) => {
//       return mycallback(error, body);
//     };
//     request(options, callback);
//   };
//   return initializePayment, verifyPayment;
// };

// module.exports = paystack;
