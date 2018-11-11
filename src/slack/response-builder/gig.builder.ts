import {EventMetadata} from '../../model/eventMetadata';

export const buildGigResponseFromMetaData = (metaData: EventMetadata): string => {
  return 'TODO: Auftritte heraussuchen, Anreise recherchieren + einfügen, One-Vote-Max Option abschalten in der Umfrage' +
    '\n\n' +
    '/polly "[Anfrage ' + metaData.day + ', ' + metaData.format + ', ' + metaData.location + ', ' + metaData.time + ']\n' +
    'Wir haben eine Anfrage bekommen von ' + metaData.requester + ' für das Format: '
    + metaData.format + ' in ' + metaData.location + ' am ' + metaData.day + ' um ' + metaData.time + '.' +
    '\n\n' +
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
