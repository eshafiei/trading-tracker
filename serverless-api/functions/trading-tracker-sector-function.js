const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'sector';
const healthPath = '/health';
const sectorPath = '/sector';
const sectorsPath = '/sectors';
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
    case event.httpMethod === 'GET' && event.path === sectorPath:
      response = await getSector(event.queryStringParameters.sectorId);
      break;
    case event.httpMethod === 'GET' && event.path === sectorsPath &&
        event.queryStringParameters.action === undefined:
      response = await getSectors(event.queryStringParameters.userId);
      break;
    case event.httpMethod === 'GET' && event.path === sectorsPath &&
        event.queryStringParameters.action === 'getSectorChoices':
      response = await getSectorChoices(event.queryStringParameters.userId);
      break;
    case event.httpMethod === 'POST' && event.path === sectorPath:
      response = await saveSector(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === sectorPath:
      const requestBody = JSON.parse(event.body);
      response = await modifySector(requestBody.sectorId, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'PUT' && event.path === sectorPath:
      response = await updateSector(JSON.parse(event.body));
      break;
    case event.httpMethod === 'DELETE' && event.path === sectorPath:
      response = await deleteSector(JSON.parse(event.body).sectorId);
      break;
  }

  return response;
};

async function getSector(sectorId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'sectorId': sectorId
    }
  };
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Getting sector ${sectorId} failed with error: ', error);
  });
}

async function getSectors(userId) {
  const params = {
    FilterExpression:
      "contains(userId, :userId)",
    ExpressionAttributeValues:
      {":userId": userId},
    TableName: dynamodbTableName
  };
  const allSectors = await scanDynamoRecords(params, []);
  const body = {
    sectors: allSectors
  };
  return buildResponse(200, body);
}

async function getSectorChoices(userId) {
  const params = {
    FilterExpression:
      "contains(userId, :userId)",
    ExpressionAttributeValues:
      {":userId": userId},
    ProjectionExpression: "sectorName, sectorId",
    TableName: dynamodbTableName
  };
  const sectors = await scanDynamoRecords(params, []);
  const body = {
    sectorChoices: sectors
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
    console.error('Getting sectors failed with error: ', error);
  }
}

async function saveSector(requestBody) {
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
    console.error('Save sector failed with error: ', error);
  });
}

async function modifySector(sectorId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'sectorId': sectorId
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
    console.error('update failed for sector ${sectorId} with error: ', error);
  });
}

async function updateSector(requestBody) {
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
    console.error('Update sector failed with error: ', error);
  });
}

async function deleteSector(sectorId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'sectorId': sectorId
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
    console.error('delete failed for sector ${sectorId} with error: ', error);
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
