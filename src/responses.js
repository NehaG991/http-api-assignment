// JSON response
const respondJSON = (request, response, object, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// XML response
const respondXML = (request, response, object, statusCode) => {
  response.writeHead(statusCode, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

// 200 status code
const success = (request, response) => {
  // Checks if XML was selected
  if (request.headers.accept === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respondXML(request, response, responseXML, 200);
  }

  // Default JSON
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, responseJSON, 200);
};

// 400 status code valid != true
// 200 status code = true
const badRequest = (request, response, params) => {
  // checking query
  if (!params.valid || params.valid !== 'true') {
    // XML - NOT VALID
    if (request.headers.accept === 'text/xml') {
      const responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
      return respondXML(request, response, responseXML, 400);
    }

    // Default JSON - NOT VALID
    const responseJSON = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };

    return respondJSON(request, response, responseJSON, 400);
  }

  // VALID
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  return respondJSON(request, response, responseJSON, 200);
};

// 401 status code loggedin != true
// 200 status code loggedin = true
const unauthorized = (request, response, params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // XML - NOT LOGGED IN
    if (request.headers.accept === 'text/xml') {
      const responseXML = '<response><message>Missing loggedIn query parameter set to true</message><id>unauthorized</id></response>';
      return respondXML(request, response, responseXML, 401);
    }

    // Default JSON - NOT LOGGEDIN
    const responseJSON = {
      message: 'Missing loggedIn query parameter set to true',
      id: 'unauthorized',
    };

    return respondJSON(request, response, responseJSON, 401);
  }

  // VALID
  const responseJSON = {
    message: 'You have successfully view the content',
  };

  return respondJSON(request, response, responseJSON, 200);
};

// 403 status code
const forbidden = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
    return respondXML(request, response, responseXML, 403);
  }

  // Default JSON
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  return respondJSON(request, response, responseJSON, 403);
};

// 500 status code
const internal = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = '<response><message>Internal Server Error. Something went wrong</message><id>internalError</id></response>';
    return respondXML(request, response, responseXML, 500);
  }

  // Default JSON
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };

  return respondJSON(request, response, responseJSON, 500);
};

// 501 status code
const notImplemented = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content</message><id>notImplemented</id></response>';
    return respondXML(request, response, responseXML, 501);
  }

  // Default JSON
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    id: 'notImplemented',
  };

  return respondJSON(request, response, responseJSON, 501);
};

// 404 status code for any other page not specified
const anythingElse = (request, response) => {
  if (request.headers.accept === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found</message><id>notFound</id></response>';
    return respondXML(request, response, responseXML, 404);
  }

  // Default JSON
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, responseJSON, 404);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  anythingElse,
};
