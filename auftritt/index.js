var handleAuftritt = function(req, res, next) {
  if (!req || !req.body || !req.body.text) {
    console.log('no body');
    res.send(getSampleText());
    return next;
  }
  var parsedData = req.body.text.split('" "');
  if (!parsedData || parsedData.length !== 4) {
    console.log('bad body');
    res.send(getSampleText());
    return next;
  }
  res.send('/polly "[Anfrage "' + parsedData[0] + ',' + parsedData[1] + ',' + parsedData[2] + ',' + parsedData[3] + ']\n' +
    'Wir haben eine Anfrage bekommen von XY für ' + parsedData[1] + ' in ' + parsedData[2] + ' am ' + parsedData[0] + ' um ' + parsedData[3] + '.\n' +
    '\n' +
    'Auftritte in den 2 Wochen zuvor:\n' +
    'Auftritte in den 2 Wochen danach:\n' +
    '\n' +
    'Anreise dauert XY, losfahren müsste man in Stuttgart um XY."' +
    '\n' +
    '"Kann (Spielen)"' +
    '"Kann (Musik)"' +
    '"Kann (Fahren)"' +
    '"Kann nicht"' +
    '"Noch unklar (Kommentar)"');
};

function getSampleText() {
  return 'SampleUseage: /auftritt "16.10.2018" "Show" "Merlin Kulturzentrum" "19 Uhr"';
}

module.exports = handleAuftritt;
