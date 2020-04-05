---
title:  "JWT viewer"
permalink: /tools/jwt/
excerpt: "JSON Web Token viewer"
classes: wide
last_modified_at: 2020-01-14T22:10:31-02:00
---
 <div class="left-split">
    <h2>Encoded JWT</h2>
    <textarea id="jwt-in" rows="13" name="jwt-in">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkrDtGhuIETDs8OoIiwiYWRtaW4iOnRydWV9.469tBeJmYLERjlKi9u6gylb-2NsjHLC_6kZNdtoOGsA</textarea>
</div>


<div class="right-split">
    <h2 class="ping-text">Header</h2>
    <textarea class="autoExpand" id="jwt-header" rows="4" name="jwt-header">{
        "alg": "HS256",
        "typ": "JWT"
}</textarea>
</div>

<div class="right-split">
    <h2 class="blue-text">Payload</h2>
    <textarea id="jwt-payload" rows="5" name="jwt-payload">{
       "sub": "1234567890",
       "name": "Jôhn Dóè",
       "admin": true
}</textarea>
</div>

<div class="right-split">
    <h2 class="ping-text">Signature</h2>
    <textarea id="jwt-signature" rows="2" name="jwt-signature" placeholder="<Paste the base64 encoded key used to sign / verify the jwt>"></textarea>
</div>

