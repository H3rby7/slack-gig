import {EventMetadata} from '../../model/eventMetadata';

export const buildCastResponseFromMetaData = (metaData: EventMetadata): string => {
  return 'TODO: Treffpunkt definieren, Menschen markieren, One-Vote-Max Option abschalten in der Umfrage' +
    '\n\n' +
    '/polly "[Orgapost ' + metaData.day + ', ' + metaData.format + ', ' + metaData.location + ', ' + metaData.time + ']' +
    '\n\n' +
    'Nach letztem Stand\n' +
    'machen Musik: \n' +
    'können: \n' +
    'notfalls: \n' +
    '\n\n' +
    'Maskottchen und Requisiten sind gerne gesehen' +
    '\n\n' +
    'Treffpunkt ist um ??:00 Uhr' +
    '\n\n' +
    'Wer macht was?"' +
    '\n' +
    '"Moderation"' +
    '"Licht"' +
    '"Musik"' +
    '"Spielen"' +
    '"Einlass"' +
    '"Pizza"' +
    '"Kässle"' +
    '"Kann nicht"' +
    '"Notfall"' +
    '"Flyer"';
};
