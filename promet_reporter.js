'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');

module.exports = {
  begin: emptyFunction,
  error: reportError,
  debug: emptyFunction,
  info: emptyFunction,
  results: reportResults,
  process: buildHtml
};

function emptyFunction() {}

function reportError(message) {
  console.error(message);
}

function reportResults(results, url) {
  console.log(buildHtml(results, url));
}

function buildHtml(results, url) {
  var renderMain = template(path.join(__dirname, '/promet_reporter/report.html'));
  return renderMain({
    date: new Date(),
    errorCount: results.filter(isError).length,
    warningCount: results.filter(isWarning).length,
    noticeCount: results.filter(isNotice).length,
    results: buildResultsHtml(results),
    url: url
  });
}

function buildResultsHtml(results) {
  var renderResult = template(path.join(__dirname, '/promet_reporter/result.html'));
  return results.map(function(result) {
    result.typeLabel = upperCaseFirst(result.type);
    result.linked_codes = buildCodelink(result.code);
    return renderResult(result);
  }).join('');
}

function template(filePath) {
  var content = fs.readFileSync(filePath, 'utf-8');
  return function(context) {
    var output = content;
    Object.keys(context).forEach(function(key) {
      output = output.replace(new RegExp('\\{' + key + '\\}', 'g'), escapeHtml(context[key]));
      output = output.replace(new RegExp('\\{' + key + '\\|raw\\}', 'g'), context[key]);
    });
    return output.replace(/\s+/g, ' ').trim();
  };
}

function upperCaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function escapeHtml(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function isError(result) {
  return (result.type === 'error');
}

function isNotice(result) {
  return (result.type === 'notice');
}

function isWarning(result) {
  return (result.type === 'warning');
}

function buildCodelink(result) {
  var arr = result.split('.');
  var link_c = [];
  arr.forEach(function(val, key){
    if (val.indexOf(',') > -1) {
      var cc = val.split(',')
      cc.forEach(function(v, k){
        link_c[k] = "<a target=_blank href=https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/" + v + ">" + arr[0] + "." + arr[1] + "." + arr[2] + "." + v + "</a>";
      });
    } else {
      link_c[0] = "<a target=_blank href=https://www.w3.org/TR/2016/NOTE-WCAG20-TECHS-20161007/" + arr[4] + ">" + arr[0] + "." + arr[1] + "." + arr[2] + "." + arr[4] + "</a>";
    }
  });
  return link_c.join('<br/>');
}
