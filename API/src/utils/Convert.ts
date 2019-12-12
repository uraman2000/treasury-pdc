export class Convert {
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
}

export default Convert;
