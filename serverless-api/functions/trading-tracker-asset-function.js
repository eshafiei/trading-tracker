const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'asset';
const healthPath = '/health';
const assetPath = '/asset';
const assetsPath = '/assets';
let origin = 'http://trading-tracker.s3-website-us-east-1.amazonaws.com';

exports.handler = async (event) => {
  console.log('Request event: ', event);
  let response;

  if (event.headers !== null && event.headers !== undefined && event.headers['origin'] !== undefined) {

          console.log("Received origin header: " + event.headers.origin);

          if(event.headers.origin === 'https://localhost:8100') {
              origin = event.headers.origin;
          }
  } else {
      console.error('No origin header received');
  }

  switch (true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === assetPath:
      response = await getAsset(event.queryStringParameters.assetId);
      break;
    case event.httpMethod === 'GET' && event.path === assetsPath:
      response = await getAssets(event.queryStringParameters.userId);
      break;
    case event.httpMethod === 'POST' && event.path === assetPath:
      response = await saveAsset(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === assetPath:
      const requestBody = JSON.parse(event.body);
      response = await modifyAsset(requestBody.assetId, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'PUT' && event.path === assetPath:
      response = await updateAsset(JSON.parse(event.body));
      break;
    case event.httpMethod === 'DELETE' && event.path === assetPath:
      response = await deleteAsset(JSON.parse(event.body).assetId);
      break;
  }

  return response;
};

async function getAsset(assetId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'assetId': assetId
    }
  };
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Getting asset ${assetId} failed with error: ', error);
  });
}

async function getAssets(userId) {
  const params = {
    FilterExpression:
      "contains(userId, :userId)",
    ExpressionAttributeValues:
      {":userId": userId},
    TableName: dynamodbTableName
  };
  const allAssets = await scanDynamoRecords(params, []);
  const body = {
    assets: allAssets
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Getting assetss failed with error: ', error);
  }
}

async function saveAsset(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  };
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    };
    return buildResponse(200, body);
  }, (error) => {
    console.error('Save asset failed with error: ', error);
  });
}

async function modifyAsset(assetId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'assetId': assetId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  };
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'PATCH',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    };
    return buildResponse(200, body);
  }, (error) => {
    console.error('update failed for asset ${assetId} with error: ', error);
  });
}

async function updateAsset(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  };
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      Item: requestBody
    };
    return buildResponse(200, body);
  }, (error) => {
    console.error('Update asset failed with error: ', error);
  });
}

async function deleteAsset(assetId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'assetId': assetId
    },
    ReturnValues: 'ALL_OLD'
  };
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    };
    return buildResponse(200, body);
  }, (error) => {
    console.error('delete failed for asset ${assetId} with error: ', error);
  });
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,PATCH,OPTIONS'
    },
    body: JSON.stringify(body)
  };
}
