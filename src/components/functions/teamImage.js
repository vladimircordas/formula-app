export function teamImage(tname) {
  switch (tname) {
    case 'Ferrari':
      return '../images/teams/ferrari.jpg';

    case 'Red Bull':
      return '../images/teams/redbull.jpg';

    case 'Mercedes':
      return '../images/teams/mercedes.jpg';

    case 'Lotus F1':
      return '../images/teams/lotus.jpg';

    case 'McLaren':
      return '../images/teams/mclaren.jpg';

    case 'Force India':
      return '../images/teams/forceindia.jpg';

    case 'Sauber':
      return '../images/teams/sauber.jpg';

    case 'Toro Rosso':
      return '../images/teams/tororosso.jpg';

    case 'Williams':
      return '../images/teams/williams.png';

    case 'Marussia':
      return '../images/teams/marussia.jpg';

    case 'Caterham':
      return '../images/teams/caterham.jpg';


    default:
      return 'blue';
  }
}