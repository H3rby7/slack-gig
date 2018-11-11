import {EventMetadata} from '../../model/eventMetadata';

export const buildGigResponseFromMetaData = (metaData: EventMetadata): string => {
  return'/polly "[Anfrage ' + metaData.day + ', ' + metaData.format + ', ' + metaData.location + ', ' + metaData.time + ']\n' +
    'Wir haben eine Anfrage bekommen von XY für ' + metaData.format + ' in ' + metaData.location + ' am ' + metaData.day + ' um ' + metaData.time + '.\n' +
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
    '"Noch unklar (Kommentar)"';
};
