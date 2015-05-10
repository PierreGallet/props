# linkedin-automation


##  This project is still in the works, but progress is being made :)

To run:

1. Download the repo to your computer.
2. Navigate into the root directory.
3. `brew update`
4. If you have CasperJS: `brew upgrade casperjs`
5. Otherwise: `brew install casperjs --devel`
6. `npm install`

Then, create a file named cred.js in the root directory with the following content:

```javascript
var username = __YOUR LINKEDIN USERNAME AS A STRING__;
var password = __YOUR LINKEDIN PASSWORD AS A STRING__;


module.exports = {
  username: username,
  password: password,
};
```

Finally, run `casperjs casperapp.js`.