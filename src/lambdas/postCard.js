var AWS = require("aws-sdk");
var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const tableName = "Cards";

exports.handler = async (event) => {
  console.log("Received: " + JSON.stringify(event, null, 2));
  try {
    const id = event.requestContext.requestId;
    const body = JSON.parse(event.body);
    var params = {
      TableName: tableName,
      Item: {
        id,
        title: body.title,
        category:body.category
      },
    };
    await documentClient.put(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify({ id: id }),
    };
  } catch (error) {
    console.error(error);
    response = {
      statusCode: 500,
      body: JSON.stringify({ "Message: ": error }),
    };
  }
};
