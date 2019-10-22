export function racePosition(position) {
  switch (position) {
    case '1':
      return 'yellow darken-1';

    case '2':
      return 'grey lighten-1';

    case '3':
      return 'deep-orange accent-2';

    case '4':
      return 'light-green';

    case '5':
      return 'light-blue lighten-1';

    case '6':
      return 'purple lighten-3';

    case '7':
      return 'purple lighten-2';

    case '8':
      return 'purple lighten-1';

    case '9':
      return 'purple';

    case '10':
      return 'purple darken-1';
    case 'no-data':
      return 'black white-text'

    default:
      return 'blue';
  }
}