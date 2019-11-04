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
      
    case 'Finished':
    case 'no-data':
      return 'black white-text'

    case '+1 Lap':
    case '+2 Laps':
    case '+3 Laps':
    case '+4 Laps':
    case '+5 Laps':
    case '+6 Laps':
    case '+7 Laps':
    case '+8 Laps':
    case '+9 Laps':
    case '+10 Laps':
    case '+11 Laps':
    case '+12 Laps':
    case '+13 Laps':
    case '+14 Laps':
    case '+15 Laps':
    case '+16 Laps':
    case '+17 Laps':
    case '+18 Laps':
    case '+19 Laps':
    case '+20 Laps':
    case 'Wheel bearing	':
    case 'Gearbox':
    case 'Engine':
    case 'Withdrew':
    case 'Did not qualify':
    case 'Accident':
    case 'Injection':
    case 'Wheel':
    case 'Fuel system':
    case 'Water leak':
    case 'Electrical':
    case 'Driver unwell':
    case 'Suspension':
    case 'Transmission':
    case 'Clutch':
    case 'Not classified':
    case 'Oil pressure':
    case 'Throttle':
    case 'Oil leak':
    case 'Handling':
    case 'Differential':
    case 'Physical':
    case 'Radiator':
    case 'Chassis':
    case 'Out of fuel':
    case 'Did not prequalify':
    case 'Spun off':
    case 'Tyre':
    case 'Steering':
    case 'Brakes':
    case 'Turbo':
    case 'Collision':
    case 'Fuel leak':
    case 'Disqualified':
    
      return 'red accent-4 white-text'

    default:
      return 'blue';
  }
}