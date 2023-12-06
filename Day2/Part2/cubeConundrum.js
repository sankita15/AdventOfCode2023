const calculateGameScore = (text) => {
    const colorMap = new Map();
    colorMap.set('red', 'R')
    colorMap.set('blue', 'B')
    colorMap.set('green', 'G')

    let sum = 0;
    const eachGameList = text.split('\n');
    const allGameMap = new Map();
    for(let i=0;i < eachGameList.length; i++) {
        const gameDetails = eachGameList[i].split(':');
        const gameId = gameDetails[0].split(' ')[1];
        const eachGameSet = gameDetails[1].split(';')
        const eachGameMap = new Map();
        for(let j = 0; j < eachGameSet.length;j++) {
            const eachGameSetMap = new Map();
            const eachTurn = eachGameSet[j].split(',')
            for(let k=0; k < eachTurn.length; k++) {
                const count = eachTurn[k].split(' ')[1];
                const color = eachTurn[k].split(' ')[2];
                if(colorMap.has(color)) {
                    eachGameSetMap.set(colorMap.get(color), parseInt(count))
                }
            }
            eachGameMap.set(j+1, eachGameSetMap);
        }
        allGameMap.set(parseInt(gameId), eachGameMap);
    }
    for(const [_, parentValue] of allGameMap) {
        let product = 0;
        let red = 1;
        let green = 1;
        let blue = 1;
        for (const [childKey, childValue] of parentValue) {
            for (const [key, value] of childValue) {
                if (key.startsWith('R') && red < value) {
                    red = value;
                } else if (key.startsWith('B') && blue < value) {
                    blue = value;
                } else if (key.startsWith('G') && green < value) {
                    green = value;
                }
            }
        }
        product = red * green * blue;
        sum = sum + product;
    }
    return sum;
}

const text = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'

console.log(calculateGameScore(text))

