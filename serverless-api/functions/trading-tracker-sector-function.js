const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'sector';
const healthPath = '/health';
const sectorPath = '/sector';
const sectorsPath = '/sectors';

exports.handler = async (event) => {
  console.log('Request event: ', event);
  let response;

  switch (true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === sectorPath:
      response = await getSector(event.queryStringParameters.sectorId);
      break;
    case event.httpMethod === 'GET' && event.path === sectorsPath:
      response = await getSectors();
      break;
    case event.httpMethod === 'POST' && event.path === sectorPath:
      response = await saveSector(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === sectorPath:
      const requestBody = JSON.parse(event.body);
      response = await updateSector(requestBody.sectorId, requestBody.updateKey, requestBody.updateValue);
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

async function getSectors() {
  const params = {
    TableName: dynamodbTableName
  };
  const allSectors = await scanDynamoRecords(params, []);
  const body = {
    Sectors: allSectors
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

async function updateSector(sectorId, updateKey, updateValue) {
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
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    };
    return buildResponse(200, body);
  }, (error) => {
    console.error('update failed for sector ${sectorId} with error: ', error);
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
}
