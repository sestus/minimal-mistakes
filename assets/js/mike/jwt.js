function parseJwt (base64Payload) {
    var base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
    try {
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        var a = ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        return '%' + a;
    }).join(''));
        ret = JSON.parse(jsonPayload);
    } catch (e) {
        return undefined;
    }
    return ret;
}

CodeMirror.defineSimpleMode("jwtmode", {
    start: [
        {regex: /(^[A-Za-z0-9-_=]+)(\.)([A-Za-z0-9-_=]+)(\.?)([A-Za-z0-9-_.+/=]*$)/, token: ["jwt-header", null, "jwt-payload", null, "jwt-signature"], sol:true}
    ]
});

var defaultJwtIn = document.createElement("div", {});
defaultJwtIn.innerHTML = "<span class='ping-text'>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>.<span class='blue-text'>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkrDtGhuIETDs8OoIiwiYWRtaW4iOnRydWV9</span>.<span class='orange-text'>469tBeJmYLERjlKi9u6gylb-2NsjHLC_6kZNdtoOGsA</span>";
var defaultJwtHeader = `{
 "alg": "HS256",
 "typ": "JWT"
}`;
var defaultJwtPayload = `{
  "sub": "1234567890",
  "name": "Jôhn Dóè",
  "admin": true 
}`;

var jwtIn = document.getElementById("jwt-in");
var jwtHeader = document.getElementById("jwt-header");
var jwtPayload = document.getElementById("jwt-payload");
var jwtSignature = document.getElementById("jwt-signature");
var jwtInEditor = CodeMirror.fromTextArea(jwtIn, {theme: 'night', mode: 'jwtmode', viewportMargin: Infinity, autofocus: true, placeholder: defaultJwtIn, lineWrapping: true, minLines: 4 });
var jwtHeaderEditor = CodeMirror.fromTextArea(jwtHeader, {lineNumbers: true, theme: 'night', mode: "application/json",matchBrackets: true, viewportMargin: Infinity, placeholder: defaultJwtHeader, lineWrapping: true, gutters: ["Codemirror-lint-markers"], lint: true});
var jwtPayloadEditor = CodeMirror.fromTextArea(jwtPayload, {lineNumbers: true, theme: 'night', mode: "application/json",matchBrackets: true, viewportMargin: Infinity, placeholder: defaultJwtHeader, lineWrapping: true, gutters: ["Codemirror-lint-markers"], lint: true});
var jwtSignatureEditor = CodeMirror.fromTextArea(jwtSignature, {theme: 'night', mode: 'javascript', viewportMargin: Infinity });


function setJwtHeader(input) {
    if (input === "") {
        jwtHeaderEditor.setValue("");
        return;
    }
    var headerPart = input.split('.')[0];
    var header = undefined;
    if (headerPart !== undefined) {
        header = parseJwt(headerPart);
    }
    var ret = header === undefined ? "Not a valid JWT header" : JSON.stringify(header, null, 2);
    jwtHeaderEditor.setValue(ret);
}

function setJwtPayload(input) {
    if (input === "") {
        jwtPayloadEditor.setValue("");
        return;
    }
    var payloadPart = input.split('.')[1];
    var payload = undefined;
    var ret = undefined;
    if (payloadPart !== undefined) {
        payload = parseJwt(payloadPart);
    }
    if (payload) {
        ret = JSON.stringify(payload, null, 2);
    }
    else if (payloadPart) {
        ret = "Not a valid JWT payload";
    }
    else {
        ret = "N/A";
    }
    jwtPayloadEditor.setValue(ret);
}

jwtInEditor.on("change", function () {
    var text = jwtInEditor.getValue();
    setJwtHeader(text);
    setJwtPayload(text);
});

document.getElementById("page-title").innerHTML = "<span class='ping-text'>J</span><span class='blue-text'>W</span><span class='orange-text'>T</span> decoder";