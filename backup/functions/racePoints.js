export function racePoints(points) {
  switch (points) {
    case '25':
      return 'yellow darken-1';

    case '18':
      return 'grey lighten-1';

    case '15':
      return 'deep-orange accent-2';

    case '12':
    case '10':
    case '8':
    case '6':
    case '4':
    case '2':
    case '1':
      return 'light-green';

    default:
      return 'purple';
  }
}