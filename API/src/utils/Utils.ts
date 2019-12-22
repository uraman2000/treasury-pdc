export class Utils {
  //converting int by * 1 is much faster see this
  //https://flaviocopes.com/how-to-convert-string-to-number-javascript/
  static amount = (value: number) => {
    if (Number.isInteger(value)) {
      return (value * 1).toString();
    }
    return (value * 1).toFixed(4);
  };

  static total = (obj: any, value: string) => {
    var totalValue = obj.reduce((a, b) => {
      return a + b[value] * 1;
    }, 0);

    return totalValue;
  };

  static isPresent = (obj, key: string, value) => {
    return obj.some(e => e[key] === value);
  };

  static calculatePercentage = (value, total) => {
    return `${Utils.amount((value / total) * 100)}%`;
  };
}

export default Utils;
