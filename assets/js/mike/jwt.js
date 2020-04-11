
function onJwtOutChanged(input) {
}

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


function highlightJwtHeader(input) {
    var headerPart = input.split('.')[0];
    var header = undefined;
    if (headerPart !== undefined) {
        header = parseJwt(headerPart);
    }
    var ret = header === undefined ? "Not a valid JWT" : JSON.stringify(header, null, 2);
    document.getElementById("jwt-header").value = ret;
    $('#jwt-header').highlightWithinTextarea('update');
    $('#jwt-payload').highlightWithinTextarea('update');
    if (header !== undefined)
        return headerPart;
}

function highlightJwtPayload(input) {
    var payloadPart = input.split('.')[1];
    var payload = undefined;
    if (payloadPart !== undefined) {
        payload = parseJwt(payloadPart);
    }
    var ret = payload === undefined ? "Not a valid JWT" : JSON.stringify(payload, null, 2);
    document.getElementById("jwt-payload").value = ret;
    $('#jwt-header').highlightWithinTextarea('update');
    $('#jwt-payload').highlightWithinTextarea('update');
    if (payload !== undefined)
        return payloadPart;
}

function highlightJwtSignature(text) {

}

function highlightError(text) {
    if (text === "Not a valid JWT") {
        return text;
    }
}

function jwtInhighlightError(text) {
    // var parts = text.split('.');
    // if (parts.length !== 3) {
    //     $('#jwt-header').highlightWithinTextarea('update');
    //     $('#jwt-payload').highlightWithinTextarea('update');
    //     return text;
    // }
}

function highlightDecodedJwt(text) {

}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

var jwtIn = document.getElementById("jwt-in");
var jwtHeader = document.getElementById("jwt-header");
var jwtPayload = document.getElementById("jwt-payload");
var jwtSignature = document.getElementById("jwt-signature");
var jwtInEditor = CodeMirror.fromTextArea(jwtIn, { lineNumbers : true, mode: 'javascript' });
var jwtHeaderEditor = CodeMirror.fromTextArea(jwtHeader, { lineNumbers : true, mode: 'javascript' });
var jwtPayloadEditor = CodeMirror.fromTextArea(jwtPayload, { lineNumbers : true, mode: 'javascript' });
var jwtSignatureEditor = CodeMirror.fromTextArea(jwtSignature, { lineNumbers : true, mode: 'javascript' });