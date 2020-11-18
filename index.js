/*const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require('yargs').argv;
const url = require('url');
const fs = require('fs');
const check = require('check-types');


const launchChromeAndRunLighthouse = url => {
  return chromeLauncher.launch().then(chrome => {
    const opts = {
      port: chrome.port
    };
    return lighthouse(url, opts).then(results => {
      return chrome.kill().then(() => {
      	return {
      //js: results.lhr,
      json: results.report
    };
      });
    });
  });
};

if (argv.url) {
	const urlObj = new URL(argv.url);
	let dirName = urlObj.host.replace('www.','');
	if (urlObj.pathname !== "/") {
  	dirName = dirName + urlObj.pathname.replace(/\//g, "_");
	}
	if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName);
}
  launchChromeAndRunLighthouse(argv.url).then(results => {
  	//console.log(check.object(results));
    fs.writeFile("./report.json", Buffer.from(JSON.stringify(results)), err => {
    if (err) throw err;
  });
  });
} else {
  throw "You haven't passed a URL to Lighthouse";
}
*/
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance','accessibility'], port: chrome.port};
  const runnerResult = await lighthouse('https://www.google.com', options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.json', reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();