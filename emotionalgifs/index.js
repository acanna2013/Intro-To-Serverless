const multipart = require("parse-multipart");
const fetch = require("node-fetch");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // here's your boundary:
  const boundary = multipart.getBoundary(req.headers["content-type"]);

  // TODO: assign the body variable the correct value
  const body = req.body;

  // parse the body
  const parts = multipart.Parse(body, boundary);
  // FILL IN THE BLANK
  //module.exports function
  //analyze the image
  const result = await analyzeImage(parts[0].data);
  context.res = {
    body: {
      result,
    },
  };
  console.log(result);
  context.done();
}

async function analyzeImage(img) {
  // const subscriptionKey = process.env.SUBSCRIPTIONKEY;
  const subscriptionKey = "822bc40507aa4fc6920b60ea63f87e2f";
  // const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
  const uriBase =
    "https://annasfaceapi.cognitiveservices.azure.com/" + "/face/v1.0/detect";
  let params = new URLSearchParams({
    returnFaceId: "true",
    returnFaceAttributes: "emotion", //FILL IN THIS LINE
  });
  let resp = await fetch(uriBase + "?" + params.toString(), {
    method: "POST", //WHAT TYPE OF REQUEST?
    body: "img", //WHAT ARE WE SENDING TO THE API?
    headers: {
      "Content-Type": 'application/octet-stream', //do this in the next section
      "0cp-Apim-Subscription-Key": subscriptionKey,
    },
  });
  let data = await resp.json();

  return data;
}
