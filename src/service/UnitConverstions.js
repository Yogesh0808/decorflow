export function convertUnit(value, fromUnit, toUnit) {
    const units = {
        meter: {
            meter: 1,
            squareMeter: 1,
            yard: 1.09361,
            squareYard: 1.19599,
            inches: 39.3701,
            cm: 100,
            feet: 3.28084,
            squareFeet: 10.7639,
        },
        squareMeter: {
            meter: 1,
            squareMeter: 1,
            yard: 1.19599,
            squareYard: 1.19599,
            inches: 1550.0031,
            cm: 10000,
            feet: 10.7639,
            squareFeet: 10.7639,
        },
        mm: {
            meter: 0.001,
            squareMeter: 0.000001,
            yard: 0.00109361,
            squareYard: 0.000001196,
            inches: 0.0393701,
            cm: 0.1,
            feet: 0.00328084,
            squareFeet: 0.0000107639,
            mm: 1,
        },
        yard: {
            meter: 0.9144,
            squareMeter: 0.836127,
            yard: 1,
            squareYard: 1,
            inches: 36,
            cm: 91.44,
            feet: 3,
            squareFeet: 9,
        },
        squareYard: {
            meter: 0.836127,
            squareMeter: 0.836127,
            yard: 1,
            squareYard: 1,
            inches: 1296,
            cm: 8361.27,
            feet: 9,
            squareFeet: 9,
        },
        inches: {
            meter: 0.0254,
            squareMeter: 0.00064516,
            yard: 0.0277778,
            squareYard: 0.000771605,
            inches: 1,
            cm: 2.54,
            feet: 0.0833333,
            squareFeet: 0.00694444,
        },
        cm: {
            meter: 0.01,
            squareMeter: 0.0001,
            yard: 0.0109361,
            squareYard: 0.000119599,
            inches: 0.393701,
            cm: 1,
            feet: 0.0328084,
            squareFeet: 0.00107639,
        },
        feet: {
            meter: 0.3048,
            squareMeter: 0.092903,
            yard: 0.333333,
            squareYard: 0.111111,
            inches: 12,
            cm: 30.48,
            feet: 1,
            squareFeet: 1,
        },
        squareFeet: {
            meter: 0.092903,
            squareMeter: 0.092903,
            yard: 0.111111,
            squareYard: 0.111111,
            inches: 144,
            cm: 929.0304,
            feet: 1,
            squareFeet: 1,
        },
    };

    if (!(fromUnit in units) || !(toUnit in units)) {
        throw new Error("Invalid units provided");
    }

    return value * units[fromUnit][toUnit];
}