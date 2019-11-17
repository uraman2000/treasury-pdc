export class Convert {
  static amount = (value: number) => {
  
    return parseFloat(value.toFixed(4));
  };
}

export default Convert;
