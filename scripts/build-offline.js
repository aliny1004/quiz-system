const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

function readPublic(filePath) {
  return fs.readFileSync(path.join(publicDir, filePath), 'utf8');
}

function getStructureComment(html) {
  return html.match(/^<!--[\s\S]*?-->/)?.[0] || '';
}

function getBodyChunk(html, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  if (start < 0) throw new Error(`Missing marker: ${startMarker}`);
  const end = endMarker ? html.indexOf(endMarker, start) : html.indexOf('<script', start);
  if (end < 0) throw new Error(`Missing end marker after: ${startMarker}`);
  return html.slice(start, end).trim();
}

const homeHtml = readPublic('home.html');
const quizHtml = readPublic('quiz.html');
const css = readPublic('css/app.css');
const appJs = readPublic('js/app.js');

const structureComment = getStructureComment(homeHtml);
const commonHeader = getBodyChunk(homeHtml, '<div class="exam-header"', '<div id="managementSection"');
const managementSection = getBodyChunk(homeHtml, '<div id="managementSection"', '<script');
const quizSection = getBodyChunk(quizHtml, '<div id="quizSection"', '<script')
  .replace('style="display: flex; flex-direction: column;"', 'style="display: none; flex-direction: column;"');

const offlineHtml = `${structureComment}
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PQS 離線版</title>
<style>
${css}
</style>
</head>
<body data-page="home" data-offline="true">
${commonHeader}

${managementSection}

${quizSection}

<script>
window.PQS_OFFLINE_MODE = true;
${appJs}
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'PQS_offline.html'), offlineHtml, 'utf8');
console.log('Generated public/PQS_offline.html');
