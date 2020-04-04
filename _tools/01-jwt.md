---
title:  "JWT viewer"
permalink: /tools/jwt/
excerpt: "JSON Web Token viewer"
classes: wide
last_modified_at: 2020-01-14T22:10:31-02:00
---
 <div class="left-split">
  <div>
    <h2>Encoded JWT</h2>
    <textarea id="jwt-in" oninput="onJwtInChanged()" rows="20" name="jwt-in" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkrDtGhuIETDs8OoIiwiYWRtaW4iOnRydWV9.469tBeJmYLERjlKi9u6gylb-2NsjHLC_6kZNdtoOGsA"></textarea>
  </div>
</div>

<div class="right-split">
  <div>
    <h2>Decoded JWT</h2>
    <textarea id="jwt-out" oninput="onJwtOutChanged()" rows="20" name="jwt-out"></textarea>
  </div>
</div>