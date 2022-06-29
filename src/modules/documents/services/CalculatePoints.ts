import { ActivityDTO } from '../dtos/ActivityDTO';

export default class CalculatePoints {
  public async calculate({
    activity,
    group,
    hours,
  }: ActivityDTO): Promise<number | null> {
    var points;

    switch (group) {
      case 'Grupo 1':
        switch (activity) {
          case '1':
            return 10;
          case '2':
            return 10;
          case '3':
            return 10;
          case '4':
            return 10;
          case '5':
            return 10;
          default:
            return null;
        }
      case 'Grupo 2':
        switch (activity) {
          case '1':
            return 10;
          case '2':
            return 10;
          case '3':
            return 10;
          case '4':
            points = 5 * Number(hours);
            if (points >= 30) return 30;
            else return points;
          case '5':
            return 30;
          case '6':
            return 30;
          case '7':
            return 30;
          default:
            return null;
        }
      case 'Grupo 3':
        switch (activity) {
          case '1':
            points = 1 * Number(hours);
            if (points >= 40) return 40;
            else return points;
          case '2':
            points = 1 * Number(hours);
            if (points >= 40) return 40;
            else return points;
          case '3':
            points = 5 * Number(hours);
            if (points >= 50) return 50;
            else return points;
          case '4':
            return 30;
          case '5':
            return 10;
          case '6':
            return 10;
          case '7':
            return 10;
          case '8':
            return 20;
          case '9':
            return 40;
          case '10':
            points = 0.5 * Number(hours);
            if (points >= 40) return 40;
            else return points;
          case '11':
            points = 1 * Number(hours);
            if (points >= 40) return 40;
            else return points;
          case '12':
            points = 1 * Number(hours);
            if (points >= 40) return 40;
            else return points;
          case '13':
            return 10;
          case '14':
            return 10;
          case '15':
            return 30;
          case '16':
            return 30;
          case '17':
            return 40;
          case '18':
            return 40;
          default:
            return null;
        }
      default:
        return null;
    }
  }
}
