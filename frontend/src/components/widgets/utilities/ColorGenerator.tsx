export default class ColorGenerator {
  public static CSS_COLOR_NAMES: string[] = [
    "Black",
    "BlueViolet",
    "Brown",
    "CadetBlue",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Crimson",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DeepSkyBlue",
    "DimGray",
    "DodgerBlue",
    "FireBrick",
    "ForestGreen",
    "GoldenRod",
    "Green",
    "IndianRed",
    "Indigo",
    "Maroon",
    "MediumAquaMarine",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "Navy",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "PaleVioletRed",
    "Peru",
    "Plum",
    "Purple",
    "RebeccaPurple",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SlateBlue",
    "SteelBlue",
    "Teal",
    "Tomato",
    "Turquoise",
  ];
  public static nameToColor(name: string): string {
    var hash = ColorGenerator.hashStr(name);
    var index = hash % ColorGenerator.CSS_COLOR_NAMES.length;
    return ColorGenerator.CSS_COLOR_NAMES[index];
  }

  public static hashStr(str: string): number {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      hash += charCode;
    }
    return hash;
  }
}
