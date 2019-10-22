export function nationToNationality(nation) {
  switch (nation) {
    case 'German':
      return 'Germany';

    case 'Austrian':
      return 'Austria';

    case 'French':
      return 'France';

    case 'Italian':
      return 'Italy';

    case 'British':
      return 'Great Britain';

    case 'Indian':
      return 'India';

    case 'Swiss':
      return 'Switzerland';

    case 'Russian':
      return 'Russia';

    case 'Malaysian':
      return 'Malaysia';

    case 'Hong Kong':
      return 'China - Hong Kong';

    case 'Mexican':
      return 'Mexico';

    case 'New Zealand':
      return 'New Zealand';

    default:
      return 'World';
  }
}