# Props
## A script for endorsing multiple connections on LinkedIn from the command line.

#####*Note: You must be connected with somebody to endorse them.

###To run:

1. Download the repo to your computer.
2. Navigate into the project directory.
3. `brew update`
4. If you have CasperJS: `brew upgrade casperjs`
5. Otherwise: `brew install casperjs --devel`
6. `npm install`

###Create a file named cred.js in the project directory with the following content:

```javascript
var username = __YOUR LINKEDIN USERNAME AS A STRING__;
var password = __YOUR LINKEDIN PASSWORD AS A STRING__;


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