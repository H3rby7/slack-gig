import {parseText} from "./parser";

export const AuftrittsHandler = (req, res, next) => {
  if (!req || !req.body || !req.body.text) {
    console.log('no body');
    res.send(getSampleText());
    return next;
  }
  const result = parseText(req.body.text);
  if (!result) {
    res.send(getSampleText());
    return next;
  }
  res.send('/polly "[Anfrage ' + result.day + ', ' + result.format + ', ' + result.location + ', ' + result.time + ']\n' +
    'Wir haben eine Anfrage bekommen von XY für ' + result.format + ' in ' + result.location + ' am ' + result.day + ' um ' + result.time + '.\n' +
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
  return 'Bitte so nutzen: /orbo Anfrage für FORMAT am DD.MM.YYYY um HH:mm Uhr im/bei/in LOCATION';
}
