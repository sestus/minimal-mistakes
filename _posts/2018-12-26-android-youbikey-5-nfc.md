---
title:  "Setting up Password store on Android using Youbikey 5 NFC"
excerpt: "How to set up the Unix Password manager on android using ya oubikey 5 NFC"
header:
    teaser: /assets/images/posts/youbikey.jpg
categories: 
  - Cryptography
tags:
  - youbikey
  - openpgp
  - crypto
  - gpg
toc: true
toc_sticky: true

---

![no-alignment]({{ site.url }}{{ site.baseurl }}/assets/images/posts/youbikey.jpg)

## Introduction

Having used the [unix password manager]({% post_url 2018-01-30-unix-pass %}) for a while I managed to have a simple,
secure and powerful password manager that makes my passwords available on every computer that I use.
However, there is still something that's missing: making my passwords available on my Android phone. 

In this post I will address this issue by describing how to utilize the new [Youbikey 5 NFC](https://www.yubico.com/product/yubikey-5-nfc/),
my phone's NFC reader and the apps
[Openkeychain](https://www.openkeychain.org/) and [Password Store](https://play.google.com/store/apps/details?id=com.zeapo.pwdstore&hl=en_US) 
in order to bring the power of the Unix Password Manager into my Android phone. Let's start!

## Setting up the Youbikey

First of all, let me explain why a Youbikey is needed. So if we want to use the Unix password manager on an Android phone,
we need to be able to decrypt the files that contain our passwords. Now we can do that by copying the private encryption
key into the Android phone but IMHO, putting the private key in my phone is not a good idea. That's were Youbikey comes into
the picture. Using the new [Youbikey 5 NFC](https://www.yubico.com/product/yubikey-5-nfc/) or the older
[Youbikey Neo](https://support.yubico.com/support/solutions/articles/15000006494-yubikey-neo) we can have them store our
private key(s), making them available to the phone only when needed, via NFC.

Setting up the Youbikey with OpenPGP is quite easy, following the instructions on [Youbico's](https://support.yubico.com/support/solutions/articles/15000006420-using-your-yubikey-with-openpgp)
website. Assuming that we have an encryption subkey with id `1F077BAE` ( have a look on my [previous post]({% post_url 2018-01-30-unix-pass %}#create-a-pgp-key) ):

1.  Create a backup of the encryption key and keep it in a safe location, in case the Youbikey is lost or stolen:
   
    ```bash
    $ gpg --output 1F077BAE-bak.asc --export-secret-subkeys --armor 1F077BAE!
    ```

    <p class="notice--info">
        <strong>Note</strong>: This will export only the encryption key, as if it is decoupled from its main key. Don't forget the "!" in the end.
    </p>
   
2.  With the Youbikey plugged in:

    ```bash
    $ gpg --edit-key 1F077BAE
    $ key 1                     # Depending on the number of subkeys, the number 1 may be different
    $ keytocard                 # Key password and Youbikey admin pin are needed for this step
    ```

Here's a asciinema of what's described above:

<script id="asciicast-QEi40F3mFUzpAFPAoIFkdD05p" src="https://asciinema.org/a/QEi40F3mFUzpAFPAoIFkdD05p.js" data-rows="25" data-theme="asciinema" async></script>
    
<p class="notice--info">
    <strong>Note</strong>: I obviously didn't replace my existing key in the Youbikey thus the bad password in the end :smile:
</p>

## Setting up the phone

We are going to need two apps:

* [Password Store](https://f-droid.org/en/packages/com.zeapo.pwdstore/) 
* [Openkeychain](https://f-droid.org/en/packages/org.sufficientlysecure.keychain/)


### Setting up OpenKeyChain

The setup is really easy here. Having the app installed, we open it and move the Youbikey near the NFC reader of the Android phone,
then we 're being asked for the Youbikey pin, and the key is imported successfully. 


### Setting up Password store

For this step, we 're going to need our password-store available in a git repository (see [here]({% post_url 2018-01-30-unix-pass %}#adding-a-remote) how to add one).

We open the Password Store app, go to Settings->Crypto->Select OpenPGP Provider and select OpenKeychain. Then we add our
git remote url, and the password-store is cloned in the App storage space. 


### Conclusion

We should now be able to decrypt our password-store using an Android device and a Youbikey. The app is intuitive and easy to use,
with search features and the ability to add / update passwords. And as an extra bonus we can use our Youbikey to add an
extra layer of security to our 2-factor-authentication using the [Youbico Authenticator App](https://www.yubico.com/products/services-software/download/yubico-authenticator/).

Enjoy!

