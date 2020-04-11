---
title:  "JWT viewer"
permalink: /tools/jwt/
excerpt: "JSON Web Token viewer"
classes: wide
last_modified_at: 2020-01-14T22:10:31-02:00
---
 <div class="left-split">
    <h2>Encoded JWT</h2>
    <textarea id="jwt-in" rows="13"></textarea>
</div>


<div class="right-split">
    <h2 class="ping-text">Header</h2>
    <textarea id="jwt-header" rows="4" name="jwt-header"></textarea>
</div>

<div class="right-split">
    <h2 class="blue-text">Payload</h2>
    <textarea id="jwt-payload" rows="5" name="jwt-payload"></textarea>
</div>

<div class="right-split">
    <h2 class="ping-text">Signature</h2>
    <textarea id="jwt-signature" rows="2" name="jwt-signature" placeholder="<Paste the base64 encoded key used to sign / verify the jwt>"></textarea>
</div>


<script type="text/javascript" src="{{site.baseurl}}/assets/js/mike/codemirror/lib/codemirror.js"></script>
<script type="text/javascript" src="{{site.baseurl}}/assets/js/mike/jwt.js"></script>