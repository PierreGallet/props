# Props
## A script for endorsing multiple connections on LinkedIn from the command line.

#####*Note: You must be connected with somebody to endorse them.

###To run:

1. Download the repo to your computer.
2. Navigate into the project directory.
3. `brew update`
4. If you have CasperJS: `brew upgrade casperjs`
5. Otherwise: `brew install casperjs --devel`

###Update cred.js in the project directory with your LinkedIn login credentials:

For Example: 

```javascript
var username = 'username@example.com';
var password = 'thisismypassword';


module.exports = {
  username: username,
  password: password,
};
```

Finally, define `userURLs` and `skillsToEndorse` in props.js, then run `casperjs props.js` from the project directory.

For example:

```javascript
var userUrls = ['https://www.linkedin.com/in/zfisch', 'https://www.linkedin.com/in/frankbowers'];
var skillsToEndorse = ['Javascript', 'Casper.js'];
```