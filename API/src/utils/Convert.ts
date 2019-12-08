export class Convert {
  static amount = (value: number) => {
    if (Number.isInteger(value)) {
      return (value * 1).toString();
    }
    return (value * 1).toFixed(4);
  };
}

export default Convert;
