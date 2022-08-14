const AWS = require("aws-sdk");
const { writeDataToFile } = require("../utils");

const s3Client = new AWS.S3();

const s3 = {
  async get() {},
  async writeDataToJSON(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const newData = await s3Client.putObject(params).promise();

    if (!newData) {
      throw Error("There was an error writing to the file");
    }

    return newData;
  },
};
