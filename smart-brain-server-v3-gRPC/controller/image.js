const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key YOUR_CLARIFAI_API_KEY");
metadata.set("authorization", "Key b8962c2705744018a0bd25cbc1434e74");

// const Clarifai = require('clarifai')
// console.log(Clarifai)
// const app = new Clarifai.App({
//     //  apiKey: 'YOUR_API_KEY'
//      apiKey: 'b8962c2705744018a0bd25cbc1434e74'
//     });

const handleApiCall = (req, res) => {
    // app.models
    //   .predict(
    //     Clarifai.FACE_DETECT_MODEL, 
    //     req.body.input)
    //   .then(data => {
    //       return res.json(data);
    //   })
    //   .catch(err => res.status(400).json('unable to work with API'))
    stub.PostModelOutputs(
      {
          // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
          // model_id: "aaa03c23b3724a16a56b629203edc62c", 
          model_id: "a403429f2ddf4b49b307e318f00e528b", 
          // inputs: [{data: {image: {url: "https://samples.clarifai.com/dog2.jpeg"}}}]
          inputs: [{data: {image: {url: req.body.input}}}]
      },
      metadata,
      (err, response) => {
          // console.log(response)
          if (err) {
              console.log("Error: " + err);
              return;
          }
    
          if (response.status.code !== 10000) {
              console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
              return;
          }
    
          console.log("Predicted concepts, with confidence values:")
          for (const c of response.outputs[0].data.concepts) {
              console.log(c.name + ": " + c.value);
          }
          res.json(response)
      }
    );
}

module.exports = handleApiCall;