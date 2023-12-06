const calculatePoints = (text) => {
    const allCardStr = text.split('\n')
    const instances = new Array(allCardStr.length)
    instances.fill(0);
    for(let i = 0; i< allCardStr.length; i++) {
        let count = 0;
        const regex = /Card\s+/
        const cardId = allCardStr[i].split(': ')[0].split(regex)[1];
        const eachCardStr = allCardStr[i].split(': ')[1];
        const winingCardStr = eachCardStr.split(' | ')[0]
        const winingCardWithSpaces = winingCardStr.split(' ')
        const winingCard = []
        const cardsYouOwnStr = eachCardStr.split(' | ')[1]
        const cardsYouOwnWithSpaces = cardsYouOwnStr.split(' ')
        const cardsYouOwn = []
        const winningSet = new Set()
        for(let j = 0; j< winingCardWithSpaces.length; j++) {
            if(winingCardWithSpaces[j] !== '') {
                winingCard.push(winingCardWithSpaces[j]);
            }
        }
        for(let j = 0; j< cardsYouOwnWithSpaces.length; j++) {
            if (cardsYouOwnWithSpaces[j] !== '') {
                cardsYouOwn.push(cardsYouOwnWithSpaces[j]);
            }
        }

        for(let j = 0; j< winingCard.length; j++) {
            winningSet.add(winingCard[j])
        }
        for(let j = 0; j< cardsYouOwn.length; j++) {
            if(winningSet.has(cardsYouOwn[j])) {
                count++;
            }
        }
        let k = instances[parseInt(cardId)-1]*count
        console.log(cardId, '->', instances[parseInt(cardId)-1])
        let temp = count;
        while(k !== 0) {
            while(temp !== 0) {
                const key = parseInt(cardId)+temp-1
                instances[key] = instances[key] + 1;
                k--;
                temp--;
            }
            temp = count;
        }
        instances[parseInt(cardId)-1] = instances[parseInt(cardId)-1] + 1;
        for(let j= 1;j<=count; j++) {
            const key = parseInt(cardId)+j - 1
            instances[key] = instances[key] + 1;
        }
    }
    return instances.reduce((a, b) => a + b, 0);
}

const text = 'Card   1: 82 41 56 54 18 62 29 55 34 20 | 37 14 10 80 58 11 65 96 90  8 59 32 53 21 98 83 17  9 87 25 71 77 70 73 24\n' +
    'Card   2:  3 18 94 53 23 49 60 44 67  9 | 77 10 44 41 17 23 83 60 49 43 94 76 67 87 66  9 73 29  3 33 92 53 18  6 47\n' +
    'Card   3: 85  9 33 66 70 28 91 60 96 65 | 33 56 83 65 15 23 99 60 26 66  9 70 97 11 38  1 85 96 28 59 50 91 71 48 89\n' +
    'Card   4: 51  5 25 18 53 30 43 49 91 21 | 21 48  1 85 51 80 18 16  9 87 66  3 14 13 39 34  5 70 69 49 28 37 72  6 98\n' +
    'Card   5: 32 62 99 93 37 22 64 57 94 55 | 23  1 26 15 16  6 88  4 17 69 21 46 49 70 51 45 89 91 29 52 60 86 80  8 12\n' +
    'Card   6: 44 52 33 82  8 30 32 62 26 61 | 59 10 89 41 24 56 48 70 92 20  3 17 94 85 97 42  8 93 51 57 44 13 12 63 78\n' +
    'Card   7: 71 42 27 38 36 41 95 97 34 10 | 61 36 10 38 95 71 53 99 59 88 50 72 40 27  3 78 41 28 16 42 48 54  6 82 97\n' +
    'Card   8: 88 80 86 60  7 77 72 29 55 36 | 91 15  8  3 16 59 70 10 90 77 56 48 22 95 78 69 94  9 38 23 35  1 17 39  7\n' +
    'Card   9: 79 32 28 61 34 19 71 47 87  5 | 19 87 47 14  3 68 25 71  5 65 91 89 98 36 24 34 61 38 80 32 62 28 74 79  2\n' +
    'Card  10: 18 95 55  5 98 22 68 70 74 92 |  5 39 92 95 36 65 98 88 70 22  3 68 45 25 15 61 63 52 74 14 55 18 17 60 47\n' +
    'Card  11: 89 34 46 96  6 17 45 20 69 37 | 69 28 48 79 26 17  8 37 10 18 95 88  2 94 47 46 20 45 24 11  6 32 96 89 50\n' +
    'Card  12: 54 53 89 19 10 64 21 46  5 90 | 52 76 30 97 77  2 91 48 88 16 27 47 39 26 59 57 25 75 11 65 98 89 21 18 84\n' +
    'Card  13: 17 70  7 85 78 51 12 75 99 90 | 78 23 77 47 71 97  7 56 82 85 90 29 10 96 52 92 70 75 99 15 59 12 51 17 89\n' +
    'Card  14: 60 56 14 85 89 32 80  9 22 44 | 46 48 34 28 24 29 72 51  2 15 76 45 73 31 71 30 97 90 66 43 78 53 87 36 18\n' +
    'Card  15: 46  4 92 95  1 54 94 52 69 77 | 37 66 97 95  1 94 48 60 36 25 15 85 38 31 93 92 54 11 42 47  2 18  4 52 28\n' +
    'Card  16: 67 63 76 41 24 17 91 71 65 58 | 52 22 77 13 33 42 20 80  9 37 54 46 67 40 81 14 29 79 43 88  1 76 65 53 15\n' +
    'Card  17: 40  3 13 95 56 98 51 36 44 62 | 40 11 71 57 50 48 98 35 56 26 34 90 62 78  8 16 36 65 44 41 61 97 93 84 59\n' +
    'Card  18: 67 99  9 38  6  5 77 87 82 89 | 67 61 28 84 94 45 37  6 41 24 99 82 36 98 95 18 29 30 69 31 10  9 87 93  2\n' +
    'Card  19: 13 28 56 25  4 46 82 47 27 43 | 68 78 83 62 50 41  9 58 34 89 46 25 98 57 28 63 94 90  3 56 79 40 99 32 27\n' +
    'Card  20: 57 87 51 42 52 61 81 47 56 88 | 89 80 28 91 41 51 48 11 53  4 95 24 98 45 57 40 34 70 54 47 67 12 39  1 61\n' +
    'Card  21: 19 66 32 45 89 96 84 98 60 41 | 93 83 71 81 52 55 80 89 46 87  8 32 62 97 44 16  6  1 28 49 78 99 31 96 69\n' +
    'Card  22: 15 23 97 64 29 55 14 59 79  9 | 75 35 31  2 70 98 90 72 16 61 22 96 58 77 38 10  4 46 92 95 26 89 44 71  5\n' +
    'Card  23: 64 54 70 32 28 20 77 55 56 76 |  2 71 53 86 92 45 13 22  4 94  5 62 98 38 44 35 36  8  6 87 25 95 16 26  9\n' +
    'Card  24: 48 69 83 39 38 37 43 65  9 12 | 71 56 66 91 95 32 52 13 88 39 25 16 55 96 33 23 63  1 76 44  6 62 14  4 89\n' +
    'Card  25:  7 71  6 97 19 98 78 88 53 49 | 82 66 22 46 55 24 30 27 80 15 39 62 72 43 90 14 44 36 67 95 48  1 28 89 23\n' +
    'Card  26: 82 23 72 12 60 26 17 83 99 21 | 39 76 51 17 69 12 81 30 24 72 46 75 23 95 60 74 82 59 52 26 15 47 32 22 28\n' +
    'Card  27: 17 81 19 24 57 76 36 15 40  4 | 10 51 34 44 70 13 82  4 11 74 23 53  1 64  6 72 55 93 58 86 26 28 84 83 46\n' +
    'Card  28: 81 47 59 56  3 90 29 69 51 42 | 47 98 16 51 24 79 59 80 83 68 55 34 93 81 56 69 48 90 31 60  1  9 46 40 15\n' +
    'Card  29: 16 11  5 62 54 92 57 42  3 21 | 83 18 91 94 57 61 87 69 68 50  8  2  3  5 23  1 12 80 11 21 98 53 29 59 84\n' +
    'Card  30:  6 34 99 49  3 41 85 23 60 94 | 98 57 99 94  3  5 34 88 81 78 92 24  4 36  7 49  6 13 22 23 60 85 83 15 41\n' +
    'Card  31: 10 77 14 39  9 74 73 23 76 43 | 10 83 12 74 33 50 66 67 73 81 23 76 44  6 43 14 90 77 29 57 64 72 39 96  9\n' +
    'Card  32: 20 76 53 21 40 17  3 57 63 39 | 39 89  6 76 10 32 44 92 57 26 86 24 15 40 53 37 75 21 35 38 58 61 17 74 95\n' +
    'Card  33: 46 45 64 58 82 28 14 38 50 53 | 15 82 48  1 73 69 77 28 18 26 57 58 31 27 38 53 93 79 14 46 32 45 50 80 87\n' +
    'Card  34:  3 47 63 65 75 82 31 25 96 11 | 60 31 62 86 97 42 16 39 71 38 82 34 43 41 11 26 94 75  9 23 29 27 49 22 79\n' +
    'Card  35: 11 67 28 98 29 44 72 41 56 62 | 52 40 65 93 28 50 72 62 49 79 30 97 44  6 91 67 29 80 11 41 99 56 14 98 37\n' +
    'Card  36: 22 45 70 51 16 65 46 37 31 27 | 31 19 11 37 14 80 22 99  2 27 13 65  6  1 12 51 16 57 60 40 17 46 53 45 70\n' +
    'Card  37: 37 41 56 23 55  7 45 54  1 94 | 85 21 18 61 43 44 10 51 33 24 45 42 11 86 14 99 57  8 66 59 74 17 35 80 32\n' +
    'Card  38: 88  5 54  1 95 35 43 92 98 91 | 91 31 80 94 74 21 92 98 54 66 11 20 95 88 79 78  5 46 43 90 51 65 10 44 25\n' +
    'Card  39: 38 84 37 59 18 40 53 28 67 77 | 19 20 21 18  8 26 86 28 17 68  4 10 88 95 53 41  9 52 15 56 11 73 40 59 66\n' +
    'Card  40:  8 63 67 15 83 38 24 50 71 64 | 42  7 72 83 51 74 62 14 21 85 99 41 30 64 22 86 44 47 96 17 66 32 49 12 61\n' +
    'Card  41: 65 87 10 43 19 79 18 46 73 30 | 88 82  9 33 91 76 42 96 56 15 50  7 83  1 97 23 55 57 59 94 71  2 36 12 81\n' +
    'Card  42: 41 73 63 44 31  7 59 28 50 53 | 64 40 13 80 23 96 16 88 65 75 45  5 22 86 15 74 41 56 21 69 38 68 82 66  4\n' +
    'Card  43: 10 80 63 20 60 76 12 75 31  8 | 93 37 34 67 21 56 22 16 94 57 71 47 33 73 54 81 51 46 70 63 42 14 26 86 66\n' +
    'Card  44: 77 72 94 88  3 85 51 54 61 90 | 89 66 25 16  5 50 87  4 24  2 36  3 33 32 55 59 17 14 28  6 21 42 81 43 22\n' +
    'Card  45: 13 39 75 73 29 53 23  8 51 12 | 26 59 84 67 76 28 85 69 90 57 79 96 25 63 99 45 56 95 19 15 58 87 89  7 97\n' +
    'Card  46: 56 98 44 82 27 10 96  1 51 22 | 50  2 64 93 86  4 83 15 97 84 75 89 22 28 73 34  8 21 14 57 94 48 40 65 13\n' +
    'Card  47: 40 16  3 52 46  6 79 42 69 90 | 58 94 75 81 95 78 18 24 54 89 20 19 83  4 56 70 74 31 61 85 80 33 64 84 23\n' +
    'Card  48: 28  2 83 53 20 34 98 38 96 26 | 15 54 28 19 38  5 26 98 64 10 83 51  2 53 67 24 96 56 73 20 34 44 68 17 43\n' +
    'Card  49: 95 86 49 97 80  1 22 55 29 68 | 42 55 86  5 26 92 49 29 68 99 22  1 38 97 32 91 36 80 63 79 41 53 95 82 58\n' +
    'Card  50: 55 53 62 91 79 51 31 97 64 75 | 31 63 75 49 23 51 91 65 78 29 97 64 53  6 71 96 20 44 38 62 18 79 83 30 55\n' +
    'Card  51: 44  1 88 22  3 69 95 10 75 90 |  1 90 54 99 96  3 10 63 17 69 22 27 21 36 88 82 26 16 44 56 83 95 93 34 75\n' +
    'Card  52: 55 11 44 84  7 52 16 88 31 98 | 89 91  1 43  6 79 33 44 31 60 96 13 10 32 76 63 36 94 40 34 81 30 12 78 17\n' +
    'Card  53: 69 33 44 19 59 47 85 95 52 21 | 95 76 59 52 88 31 41 47 20  7 19 69 62 21 85 75 14 55 79 33 26 73 57 46 61\n' +
    'Card  54: 96 22 24 17 53 26 28 70  9 60 | 73 40 92 80 55 33 74 34 32 12 11  6 46 70  2 94 49 72 38 14 98 79  3  4 17\n' +
    'Card  55: 21 91 93 35 11 76 50 88 97 10 |  6 35 62  8 66 37 94 14 21 25 60 57 22  4 93 18 51 99 84 23 89 44 33 39 24\n' +
    'Card  56: 65 48 34 97 16 69 84 20 46 19 | 72 48 35 81 30  4 96 66 69 12 50 97 45 65 84 46 62 67 98 32 83  2 38  6 44\n' +
    'Card  57: 83 32 43 10 25 82 33 12 30  6 | 99 74 82 30 23  2 77 94 37 87 59 10 25 52 35 34 12 60 49 43 86 83 96 41 76\n' +
    'Card  58:  4 18 87 39 54 32 80 21 16 35 | 16 39 44 25 88 64 21 38 97 86  4 90 76 32  9 80 42 35 50 92 66 37 95 11 30\n' +
    'Card  59: 88 15 11 10 86  6 68 80 89 38 |  9 35 63 54 37 25 98 53 70 30 39 40 55 44 69 68 94 50 15 49 77 31 47 52 65\n' +
    'Card  60: 77 83 24 37 91 15 34 11 72 56 | 78 94 56 97 15 46 77 30 92 48 71 35 27 40 41 61 85 54 16 82  2 42 44 25 62\n' +
    'Card  61: 44 41 38  2 85 76 12 71  4 45 | 99 51  1 40 25 54 21 38 60 59 67 74 72 27 13 23 28 77 62 66 33 89 70 44 68\n' +
    'Card  62: 96 67 51 37 56  3 74 70 50 78 | 19  1 43 94 51 85 92 59 25 31 18 53 89 15 69 10 12 95 41 76 39 61 20 77 79\n' +
    'Card  63: 31  9 39 44 92 34 65 33  6 55 | 73 81 12 15 20 96 22 69 64 97 74 68 57 36 75 35 29 99 21  2 24 58 26 91 43\n' +
    'Card  64: 81  5 76 93 80 19 26 75  7 65 | 18 39 16 74 20 46 79 44 96 63 12 32 38 64 33 49 88 69 51 91 45 48 31 37 92\n' +
    'Card  65: 67 56  4 11 43 74 61 86  3 93 | 59 34 50 78 47 18 79  1 70 44 24 83 41 26 82 92 71 75 73 53 28 77 48 80 13\n' +
    'Card  66: 65 91  8 34 74 61 92 19 87 26 | 13 60 29 87 85 18 36 71 52 62 37 15 28 92 67 35 39  5 34 65 43 16  8 66 81\n' +
    'Card  67: 41  2 10 95 53 31 60 70 88 89 |  9 31 60 38 26 83 58 40 76 41 37 70 44 24 94 13 50 33 39 53 32  5  2 18 10\n' +
    'Card  68: 86 38 10 12 20 54 81  9 85 71 | 63 14 59  1 46 42 58  2 75 54 26 28 16 50 67 62 35 78 77 21 94 73 72 23 80\n' +
    'Card  69: 85 57 26 35 74 17 30 96 36 29 | 86  1 48 68 52 40 51 81 53 97 14 87 23 18 19 93 88 47 73 75 60 16 11 71 24\n' +
    'Card  70: 15 80 31 65 36 78 96 29  2 64 | 72 10  9 97  5 61 86 78 32 45 65 67 56 14 69 98 18  4  1 23 51 19 11 74 64\n' +
    'Card  71: 12 90 70 87 78 96 40 94 65 31 | 64 13 74 78 66 39 12 62 19 59 18 90 17  3 31 40 36 23 45 94 15 71 35  1 52\n' +
    'Card  72: 67 85  6 75  8 23 46 36 48 53 | 68 16 48 95  7 29 69 17 30 88 78 63 54 35 27 85 34 41  2 46 89 36 94 23 67\n' +
    'Card  73: 48 67 78 22  8 50 23 57 70 25 | 82 55 26  3 14 87  4  1 25 24 13 31 48 93 96 77 65 38 75 90 40 32 19 46 11\n' +
    'Card  74: 58 50 70 38 87 14 41 53 26 57 | 86 96 91 10  8 87 35 60 20 12 69 65 45 26 98 40 37 95  2 21  7 17  3 48 74\n' +
    'Card  75: 77 95 97 44 28 67 39 23 21 32 | 69  8 97  5 92 74 76 39 75 58 67 98 72 61 22 53 54 96 70 59 77 83 99 34  4\n' +
    'Card  76: 17 66 82 88 96 85 10 57 23 16 | 22  6 44 87 50 55 73 20 93 46 88 84 21 99 95 16 40 57 83 85 68 92 30 47  3\n' +
    'Card  77: 50 37 55 75 20 97  7 31 10  4 | 76 30 79 74 72 59  9 93 49 86 18 81 23  6 85 36 44 46 96 45 17  1 91 12 26\n' +
    'Card  78: 82  1 44 32 98  7 65 85 45  2 | 56 88 60 13 78 47 86 14 81 30 40 67 29 16  6 34 28 10 50 38 77 73 46 63 75\n' +
    'Card  79:  5 55 59 80  3 70 84 50 47 92 |  4 38 31 14  1 11 95 86 82 48 12 99 94 72 34 32 30 23 35 29 22 19 69 42 44\n' +
    'Card  80: 92 55 86  2 32 90 34 53 20 67 | 48 17 13  7 27 70 35 28  9 40 38 79 69  5 76 83 59 33 91 50 56 25 98 10 36\n' +
    'Card  81:  3 89 25 56 62 39  2 91 48 92 | 25 75 65 85 92  3 54 49  2 67 89 56 29 69 60 91 39 62 16 70  6 32 48 93 37\n' +
    'Card  82: 77 30 14 41 92 90 73  9 43 23 | 92 68 19 90 17  9 72 26 69 80 46 81 59 14 77 98 36 48 23 64 41 73 43 63 30\n' +
    'Card  83: 11 47 10 65 48 25  3 75 81 62 | 22  6 82 84  7 83 42 72 20 10 12  1 33 86 31 24 26 13 32 78 55 74 77 34 50\n' +
    'Card  84:  2 19 54 41 66 86  4 45 46  5 | 89 97  6 49 65 28 29 51 66  5 68 48 45 54 41  4 64 83 37 63 19 50  2 46 86\n' +
    'Card  85: 87 55 45 69 71 86 97 49 88 96 | 18 22 38 90 50 26 20 52 19 74 82 31 60 79 64 51 76 46  4 48 84 58  3 65 54\n' +
    'Card  86: 36 70 56 40 58 18 44 28 75 82 | 81 79 52 66 74 72 15 49 51 17 84 76 77 78  5 65 21 93 60 92 61 14 94 59 73\n' +
    'Card  87: 33 94 91 80 22  8 57 75 64 62 | 96 83 82  4 72 67 69 44 79 73  2 85 65 13 50 71 37 77 99 93 11 14 51 63 45\n' +
    'Card  88: 52  5  1  7 61 25 30 84 29 42 | 75 97 73 70 66 20 33 96 91 21 57 36 39 87  3 55 63 76 13 69 74 71 18 17 80\n' +
    'Card  89:  9 95 17 15 76 49 21 65 31 69 | 12 39 96 51 43 69 76 94 90 42 88  9 19 58 79 33 49 45 84 22  6  7 99 35 15\n' +
    'Card  90: 17 90 26 77 84 46  9 88  5  8 | 76 18 31 11 68 44 12 96 53 57 22  3 72  9 17 40 48 56 46 90 14  2  8 61 34\n' +
    'Card  91: 78 22 94 50  4 39 91 34 31 95 | 75 67 42 24 36 49 87 40 45 89  9 91 99 32 66 26 11  1 58 59 98 54 82 77 33\n' +
    'Card  92: 24 82 61 33 72 37 98 79 86 70 | 27 44 77 50 49 33 56  1 71 47 97 37 53 66 73 36 17 64 38 57 96 92 54  6 61\n' +
    'Card  93: 98 51 73 36 69 92 37 84 31 59 | 40 69 99 94 98 32  3 76 49 64 13 52  6 92 58 51 86 50 27 25 47 36 53 85 80\n' +
    'Card  94: 38 98 46 55 95 56 15 41  7 26 | 79 23 14 28 75 29 63 34 80 89 54 49 62 92 22 72 57 77 68 90 27 39 82 12 74\n' +
    'Card  95: 88 24 82 97 62 69 84 15 72 36 |  9 82 19 30 42 61 76 17 25 64 48 51 93 20 87 62 10  5 52 54 13  7 71 90 27\n' +
    'Card  96: 50 74 53 13 18 98 52 49 39 29 | 58 97 79 69 53 88 42 63 11 30 14  5 96 82 49 40 93 46 24 75 21 17 55 28  3\n' +
    'Card  97: 75 64 40 26 25 51 79 42 62 60 | 13 50 84 38 48 86 53 97 76 99 35 23 33 18 24 49 34 32 43 68 58 44 31 85 72\n' +
    'Card  98: 49 46 32 71  6 80 25  1 40 35 | 79 30 60 34 81 43 61 27 41 99 37  4 95 90 45 67 56 57  9 91 22 23 16 21 11\n' +
    'Card  99: 70 42 24 47 62 66  4 53 99 54 | 24 99 10 46 70 21 68 50  2 54 15 47 41 62 53 66 89 36 69 65 60 56 42 19  4\n' +
    'Card 100: 57 37  4 32 97 89 48 99 16 53 |  6  2 46 30 37 70 97 32 33 55 84 16 24 20 99 62 14 28  4 89 53 57 48 40 44\n' +
    'Card 101: 45 72 50 90 44 40  5 80 55 58 | 98 61 34 60  2 78 62 65 83 31 94 41 20 18 46 32 73 23 37 21 71 12 51 11 25\n' +
    'Card 102: 20 12 47 26 55 92  8 82 60 30 |  1 78  9 31 47 14  8 26 18 66 94 20 97 12 51 36 95 60 30 82 55 98  7 33 25\n' +
    'Card 103: 43 33 52 76 77 13 73 45 40 30 | 58 57 34 67 87 12 16 90 43 48 25 65 84 40 30 42  1 13 53 85 72  8 97 68 77\n' +
    'Card 104: 47 30 62 67 19  7 34 99 18 73 | 38  7 78 34 26 72 27 19 47 73 30 42 11 63 67 59 62 54 20 18 25 68 50 99 15\n' +
    'Card 105: 17  8 41 67 78 30 70 58 11 74 | 74 88 64 70 99 11 54 32 25 42 59  1 58 15 77 63 93 81 57 98 14 29 89 92 41\n' +
    'Card 106: 66 51 30  3 52 67 63 60 55  9 | 35 74 42 13 45 21 22 17 20 60 30 54 67 55 51 92 64 52 72 66 44 69 63 62 78\n' +
    'Card 107:  7 42 26 31 20 28 87  3 29 25 | 16 44 71 21 48 53 54 64 25  4 94 97 83 69 62 45 66 31 38 19 43 33 42 85 65\n' +
    'Card 108: 23 49 65 38 22 96  5 28 93  3 | 48 10 24  8 65 49 90  6  9 28 63 58 35 29  1  3 56 33 85 72 96 79 93  5 50\n' +
    'Card 109: 96 43 41  3 55 19 44  9 69 85 |  6 17 90 28 32 34 19  9 14 27 83 78 74 35 76 12 11 31 96  3 25 46  4 81 44\n' +
    'Card 110: 11  4 50  1 54 21 88 66 53 26 | 81 88 11  9 14  1 21 54 86 75 83 84 66 31 16 32 60 36 69  2 59 80 76 56 26\n' +
    'Card 111: 66 45 53 81 57 63 24  1 46 76 |  8 31 14 82 62 78 37 53 20 85 66  6 51 10 19 47 61  1 45 68 25 33 16 24 22\n' +
    'Card 112: 44 32 55 72 21 79 85 68 67 39 | 75  9 50 64 52 43 39 55 42 67  3 90 54 44 76 21 23  4 81 11 48 88 24 95  5\n' +
    'Card 113: 88 23 60 54 44 65 28 21 12 29 | 29 21 60 22 40 14 15 55 90 12 57 18 94 75 61 54 46 93 53 88 76 65 23 86 32\n' +
    'Card 114: 54 68  7 75 39 19 28 65 69 10 | 36 45 24 61 68 75 51 94 97 13 89 73 65 88 50  3 84 29 93 10  2 56 85 67 76\n' +
    'Card 115: 69 26 44 33 14 41 17 70 92 72 | 94 59 18 81 52 99 17 36 87 20 16 86 72 56 11 65 24 92 83 26  9 89 15 47 77\n' +
    'Card 116: 86 12 11 94 34 10  3 72 77 71 | 75 18 83 76 41 16 22 84 69 63 48 96 45 85 72 10 56 40 95 32 59  4 33  9 51\n' +
    'Card 117: 22 34 79 31  8 73  5 82 99 74 | 49 50 18 35 33 26 20 17  3 81 94 95 74 30 29 38  1 41 52 64 62 93 37 73 10\n' +
    'Card 118: 78 93 14  8 96 57 49 52 67 59 | 40 97 50 71 46 66 63 42 87 64 96  2 98 68  7 35 93 37 16 18 12 92 36 75 24\n' +
    'Card 119: 58 38 20  9 92 15 54 44 63 28 | 31 72 57 85 49 34 15 62 58 83 33 29 94 75 79 19 77 70 39 81  4 50 16  8 84\n' +
    'Card 120: 54 73 59 76 55 83 18 99 74  2 | 60  4 70 20 29 64 92 26 89 81 84 22 71 66 40  9 68 15 65 79 57 31 75  6 97\n' +
    'Card 121: 86 28 62 33 36  2 65 66 77 58 | 50 72 22 69 45 49 44 56 46 84 93 71 81 14 31 68 13 94 16 82 52 30 79  8 26\n' +
    'Card 122: 35 27 46 62 43 28 79 39 16 49 | 95 33 89 19 24 91 15  4 21 31 78 82  5 71 45 70 47 55 84 53  1 69 59 92 14\n' +
    'Card 123: 55 28 29 64 63 79 34 95 83 77 | 36 93 54 88 64  9 94  6 18 74  3 28 83 22 80 96 65 16 62 79 77 70 33 52 38\n' +
    'Card 124: 32 31 85 73 38 94 50 75 22 25 | 57 33 10 64 72 43 53 86 23  8 56 90 45  4 63 47 20 11 28 17 74 18 77 26  5\n' +
    'Card 125: 76 66 70 69 58 75 92 11 45 47 | 17 31 89 19 47 27 87 18 59 12 58 66 11 72 99 45 69 92 94 70 15 93 75 83 76\n' +
    'Card 126: 76 94 11 67 46 70 32 59 18 55 | 51  8 79 35 48 37  2 20  7 30 68 17 33  1 41 39 87 43 73 22 71 13 47 83 15\n' +
    'Card 127: 54 44 14 68 17 22 15 35 11 98 | 65 24 17 90 23 51 35 61  3 98 41 83 12 16 11 13 14 30 86 37 71 32 63 70 15\n' +
    'Card 128: 98 57 41 43 28 58 19 37  3 77 | 46 74 54 41 76 85  4 15 17 59 67 13 91 31  2 20 78 11 18 73 40 16 50 35 47\n' +
    'Card 129:  5 62 94 48 85 32 35 69 16  9 | 56 52  6 98 69 25 87 71 20 81 16  5 38 96 13 53 79 99 45 90 74 72  2 11 68\n' +
    'Card 130: 19 75 99 80 48 98 86 69 34 54 | 34 99 91 95 48 10 75 86 88 40 57 82 11 29 25 70 69 80 19 58 62 54 21 12  6\n' +
    'Card 131: 29 46 97  1 38 15 96 89 16  4 | 51 77 28 88 13 49 60 24 84 82 50 30 56 80  8 22 15 79 17 35 71 54 83  2 43\n' +
    'Card 132:  8 51 28 45 92 78 27 49 50 20 | 90 10 93 52 96 72 30 54 50 43 12 31 74 67 63 92 16 21 51 27 26 98 68 64 20\n' +
    'Card 133: 94 25 68 83 78 50 63 38 58 23 | 20 51 80 90 17 22 76 14 61 16 66 40 89 81 88 47 15 37 11 50 39 71 31  4 48\n' +
    'Card 134: 89 50 86 60  1 61 52 10 71 80 | 21 95 42 86 81 76 50 89 49 91 52  1 67 77 88 96 47 61 55 12 15 80  5 27 64\n' +
    'Card 135: 66 32 89 57 92 34 71 97 43 42 | 29 71 57 18 14 74 82 67 99 59 12 97 19 96 11 24 43 35 89 70 55 83 13 42 84\n' +
    'Card 136: 90 53 50 39 51 68 78 60 15 76 | 81 40 24  8 82 97 62 35 73 83 41 36  5 22 86 29 34  1 85 37 94 13 56 87 93\n' +
    'Card 137: 26 67  5 62 12 89 91 84 96 56 | 53 33 42 97 54 64 96 63 28  9 26 59 12 99 23 34 72 48 30  2 40 65 56 43 76\n' +
    'Card 138: 93 45 99 78 37 31 33 22 96 20 | 68 45 89  4 43 58 73 44 72 75 24 14 71 99 28 25 91 76  9 98 84 13 70 21 51\n' +
    'Card 139: 18 65 64 57 45 19  8 88 28 87 |  7 41 73 64 45 50 27 81 72 74 60 47 75 68  3 48 20 69 62 40 65  5 15 51 86\n' +
    'Card 140: 75 25 42 77 98 92 64 17 41 29 | 96 62 61 53 68 80 12 32 73 16 85 54 78 10 95  2 84  6 89 69 60 48 45 34 94\n' +
    'Card 141: 43 31 45 49  3 55 99 74 89 10 | 78 95 28  2 33 75 89 13 32 15 26 56 61 66 41 50 60 59 12 85 34 64 91 23 76\n' +
    'Card 142: 47  9 99 28  3 71  2 51 96 19 | 72 31 16  4 88 70 68 64 75 35 85 58 21 54 77 29 15 82 59 60 39 37  8 18 65\n' +
    'Card 143: 38 60 24 15 64 87 33 48 47  6 | 28 48 59 53 51 49 74 77 70 56 25 29  4 39 24 32 65 35 21 89 15 76 37 83 27\n' +
    'Card 144: 49 32 47 58 31 12 87 35 18 88 | 21 18 97 31 35 28 96 56 87 12 59  3 49 86 61 20 32 47 39 58 88 91 73 71 34\n' +
    'Card 145: 98 29  7 88 44  5 50 28 47 23 | 44 47 98 29 62 17  7 28 23 14 15 54 72  5 16 50 64 68 60 19 27 12 85 67 49\n' +
    'Card 146: 36 62 49 69 76 98 51 85  9 17 | 92 69 97 85 17 96 76 72 88  3 48 56 81 62  1 25 30 70 99  2 44  9 28 79 51\n' +
    'Card 147: 73 54 10 47 96 13 89  7 33 91 | 98 75 26 59 69 45 66 11  5 12 74 36 55  9 85 60  1 34 84 42 32  3 76 70  4\n' +
    'Card 148:  2 79 56 60 74 62 78 26  8 82 |  1 95 39  9 86 61 64 82 55 84 37 90  8 93 10 21 80 26 11 78 47 48 25 22 98\n' +
    'Card 149: 94 10 87 47 23 68 82 13 21 46 | 16 54 89 99 80 64 70 38 81 86 46 30 58 85 35 25 32 52 10 59 97 47 12 23 75\n' +
    'Card 150: 67 70 48 88 72  8 49 97 90 19 | 47 25 80  9 72 76 21 59 95 27 10 77 87 19 88 37 67 49 70  8  3 71 62 41 97\n' +
    'Card 151: 53 36 18 77 88 75 52 57 41 81 | 19 31 71 57 13 12 73 52 36  9 54 10 88 91 75 77 44 17 18 66 30 53 81 41 43\n' +
    'Card 152:  6 61 37 73 40 22 47 18 68 52 | 18 73 22 61 96 79 23 45 68 37 48 40 11 58 41 56 47 80 52 44 93 87  6 33 13\n' +
    'Card 153: 75 42 83 82 63 40 76 46 38  2 |  2 79 83 69 85 25 14 74 42 78 46 63 22 31 12 26 20 38  4 73 90 75 92 76 62\n' +
    'Card 154: 17 18 68 36 51 91 93 19 87 37 | 72 70 24 30 36 14 63 86 71 47 98 10 55 64 46 11  5 53 41 89 32  2 22 84  6\n' +
    'Card 155:  6  1 31 79 58 61 45 24 53 76 | 20 65 54 16 70  5 60 41 43 34  9  1 89 37 36 51 53 29 99 19 95 98 61  7 42\n' +
    'Card 156: 62  4 91 76 20 82 11 17  5 42 | 29 20 13 61  4 62 65 17 11 78 90 94 27 59 75 25 10 85 42 76  5 15 36 22 64\n' +
    'Card 157: 90 56 15 50 20 81 14 46 58  4 | 30 66 38 91 14 34 75 56 48 51 80 26 22 62 69 57 47 94 20 84 65 37  4 46 90\n' +
    'Card 158: 99 21 94 54 38 31 55 35 97 37 | 75 51 90 13 25 71 16 30 77 59 81 37 35 76 78 92  1 97 54 21 96 49 27 38 66\n' +
    'Card 159: 18 41 14 36 26 64 48 80 42 51 | 71 84 97 92 87 78 57 53 41 18 67 72 27 94 96  6  2 80  3 89 30 81 47 86 79\n' +
    'Card 160:  5 24 58 57 46 41 60 18 19 14 | 67  6 89 12  9 79 72 46 22 83 84 58 20 85 36 19 11 65 10 26 39 15 56 57 62\n' +
    'Card 161: 24 54  9 68 19 82 18 12  5 43 | 55 31 74  8 62 35 20 36 97 21 30 48 80 32 77 91 45 61 57 86 93 11 83 26 87\n' +
    'Card 162: 33 94 73 79 32 48 51 21 61 72 | 31 90 99 97 46 53 23 89 34  4 14 64 18 63 36 70 44 85 40 62 96 20 67 12  2\n' +
    'Card 163: 14 60 29 93 22 45 51 40 37 16 | 55 21  7 72 23 58 36 60 94 28 35  6 44 43 86 56 31 39 15 59 69 20 84  4 70\n' +
    'Card 164: 42 68 19 43 69 92 27 88  1 91 | 81 45 20 47  3 32 26 64 66 61 60 76 85 96  5 11 39 71  4 38 62 57 13 46 77\n' +
    'Card 165: 62 27 64 82  1 55 21 31 41 63 | 60 28 21 38 94 15  1 64 55 50 82 34 47 36 12 27 63 59 84 31 70 73 62 30 41\n' +
    'Card 166: 48 21 18 91 32 77 81  6 43 79 | 36 52 79 81 25 32 71 20 78 43 21 67 57 49 33  8 77  6 13 48 91 18 68 56 66\n' +
    'Card 167: 67 77 84 69 56 70 13 90 51 36 | 56 39 49 57 77 90 47 61 59 67 70 99 36 69 16 98 74 51 84 38 72 96 91 13 73\n' +
    'Card 168: 66 84 31 35 87 19 70 17 78 11 | 51 59 73 43 44 90 38 24 75  2 49 97  8 95 13 29 10 65 88 89 67  5  4 11 26\n' +
    'Card 169: 82 94 62 39 24 81 87  1 75 28 | 24 82 51 94 91 28 63 59 87 62 35 34 76 81 25 89 96 23 19 39 75  1 15  4  9\n' +
    'Card 170:  7 38 18 64 49 61 59 97 79 63 | 14 19 85 65 53  6 47 13 89 64 25 30 79 17 97  9 98  7 63 33 23 26 59 57 11\n' +
    'Card 171: 41 43 96 53 70 93 52  5 61 85 | 10 52 94 13 25 53 93 70 30 81 61  2 86 15 41 85 43 71 74 58 22 96 34  5 36\n' +
    'Card 172: 37 96 83  2 88 89 14 87 58  6 | 83 19 38 63 33 95 24 96 66 71  9 88  4 89 17 76 58 64 61 43 56 82 36 97 44\n' +
    'Card 173: 72 90 63 32 20 54  2 11 47  4 | 48 85 64  7 14 31 43 79 46 60 39 72 47 78 73 20 81 32 83 44 96 99 15 45 75\n' +
    'Card 174: 56 75 90 13 41 52 17 66 71 10 | 78 26 90 13 10  7 29 41 39 33 50 52 66 56 20 71  5 87 64 61 75 99 49 17 22\n' +
    'Card 175: 46  9 37 81 13 31  8 73 67 51 | 83 93 59 44 85 70 73 20 72 69 92 88 63 52 81 29 64  1  4 86 24 21  8 35 33\n' +
    'Card 176: 44 96 92 26 63 31 77 21 93 48 | 63 47  2 58 43 16 44 96  4 53 37 27 26 19 32 34 76 49 28 23 46 92 59 77  1\n' +
    'Card 177: 19  6 67 46 45 82 28 37 10 22 | 93 52 85 16 41 31 48 75 28 55 14 94 53  2  5 44  7 84 18 63 22 20 79 91 46\n' +
    'Card 178: 64 27 44 42 20 99  7 51 19 55 | 60 73 61 72 31 89 18 50 11 96 45 90 58 44 99  4 30 97 83 86 21 56 51  7 34\n' +
    'Card 179: 75 51 17 82 94 49 74 61 97 85 | 10 92 27 96 69 65 82 21 59 56 14 22 12 51 35 70 13 30 11 34 78 71  3  7 49\n' +
    'Card 180: 30 96 63 46 41 26 53 37  3 77 | 47 32  1 19 51 53 78 39 50 83 77  6 29 71 31 33 38 67 46  3 66 41 90 21 63\n' +
    'Card 181: 89 70 19 80 45 27 92 44 62 77 | 13 44 88 26 95 29  9 38 62  5 84  6 97 75 81 34 42 40 70 77 92 80 51 86 45\n' +
    'Card 182: 86 89  6 23 60 61 93 99 66 17 |  6 42 79 91 92 77 43 40 24 81 41 59 93 72 18 34 48  5 62 97 37 57 65 14 15\n' +
    'Card 183: 80 83 50 30 33 79 93 58  5 92 | 91 20 18 29 16 58 99 53 14  3 77 76 10 41 13 74 61 38 65 31  4 36  5 37 83\n' +
    'Card 184: 23 11 82 70 51 20 69 43 68 62 |  1  2 41 15 91 59 56 12  5 94 21 25 60 61 81 44  9 51 75 63 32 77 22 42 85\n' +
    'Card 185: 25 72 60 66 28 48 13 76 57 73 | 77 90 80 89 71 97 63 11 39  3 65 21 34 51 95 45 52 29 30 83 48 53 37 94  5\n' +
    'Card 186: 25  3 81 78 75 48 38 71 43 80 | 58 56 22 93 69  2  6 14 36 66 31 50 67 53 27 86 95 72 55 46 12 35 34 96 16\n' +
    'Card 187: 23 29 10 25 38  7 77 45 15 43 | 66 13 95 44 22 18 32 30 34 42 37 68  9 89 74  6 85 12 84 88  2 36 52 79 72\n' +
    'Card 188: 64 51 10 75 70 37 14 83 63 55 | 16 13 78 24 69 60 54  8 41 88 47 17  4 77  2 89 57 35 48 91 56 58 97 50 68\n' +
    'Card 189: 80 29 21 76 35 83 10 67 56 78 |  2 75 48 50 99  4 37 71  3 40 25 81 45 59 32 17 80 70 15 19 24 21 26 82 66\n' +
    'Card 190: 53 12 10 77 17 32 33 21  8 38 | 31 49 12 77 32 99 21 37 10 64 18 59  8 44 13  4 68 33 56 83 17 91 53 72 84\n' +
    'Card 191: 59 43 17 45 19 74 24 46  3 54 | 74 51 38 17 18 90 54 56 19 71 28 78 24 59  3 27 45 46 37 57 63 43 20 55 13\n' +
    'Card 192: 25 26 85  3 31 13 45 73 29 94 | 92 82  9 67 72 23 24 47 91 14 59 18 98 21 28 34 84 64 94 73 61 13 79  7 85\n' +
    'Card 193: 71 74 39 10 17 26 69 76 58  5 |  5 30 17 89 71 34 43 40 39 96 16 99 38 75 32 56 68 84 26 92 50 86  9 54 60\n' +
    'Card 194: 96 66 82 60 17 34 81 20  6 91 | 19 81  7 22 93 60 98 69 41 40 50 94 92 72 17  6 25 42 58 79  1 82 36 45 84\n' +
    'Card 195: 37 46 98 59 40 32 76 53 13 58 | 94 16 97 13 48 87 25 20 85 44 78 96  5 36 90 19 21 81 41 12 37 75 79 67 11\n' +
    'Card 196: 39 50  6 64 36 54 99 97 91 82 | 70 74 62 53 58 10 89 75 95 43  1 83 39 44 54 65 82 69 45 13 79 50 49 40 77\n' +
    'Card 197: 19 16 28 25  2 99 90 53  1 17 | 83  2 53 67 78 45 19 74 28 63  9 23 73 40 99 34 96 38 56 16 90 54  1 17 25\n' +
    'Card 198: 21 70 46 35 49 97 25 66 76 83 |  1 70 49 13 11 94 83 58 25 77 75 52 35 76 82 97 26 22 34 63  6  9 14 66  2\n' +
    'Card 199: 29 33 92 17 90  8 84 86 27  1 |  1 29 18 49 63 27 16 15 59  5 62 66 23 13 92 89 64 22 14  3 73  7 77  2 70\n' +
    'Card 200: 19 41  4 59 51 14 65 28 98 37 | 31 94  5 42 65 19 90 37 17 61 33 50  2  7 51  4 62 85 72 32 10 29 64 63 43\n' +
    'Card 201:  1  4 39 99 93 91 24 13 68 96 | 32 12 96 85 76 17 71 91 81 50 30 55 41 97 98 53  9 40 69 79 59 72 45 36 99\n' +
    'Card 202: 40 53 74 51 64 87 17 69 96 65 | 96 53 13 80 50 78 64 21 54 15 12 62 40 82 65 69 29 25 74 98 87 55 10  4 35\n' +
    'Card 203: 42 96 15 85 44 13 87 17 61 46 | 91 46 76 82 36 75 29 43 15 21 96 48 17 79 40 12 20 47 33 45 88 62 32  6 19\n' +
    'Card 204: 69 65 83 25 33 40 96 41 76 86 | 54 57 37 53 26 78 42 77 70 87 35 75 14 49 86 36  4 72  8 58 64 17 18 15  7\n' +
    'Card 205: 38 55 33 66 59 60 57 58 11 80 | 76 74 57 68 44 72 81 93 71 95 50 21 43 66 47 31 42 98 30 22 16 99 94  6 37\n' +
    'Card 206: 38 16 51 65 34 20 66  7 64 43 | 89 77 62  9 22  4 30 28 73 83 46 91  6 37 13 90 40 94 54 97 85 25 29 70 59\n' +
    'Card 207: 16 15 93 20 74  3 28 91 99 32 | 20 58 72  8 41 30 19 42 93 13 35 29 45 79 59 67 40 80 99 88 64 76 86 96 63\n' +
    'Card 208: 68  5 11 66 81  3 64 45 44 94 | 82 73 20 74 17 46 31  6 40 81 44 85 33  1 80 47 48 84 32 67 65 88 53 49 14\n' +
    'Card 209: 87 84 58 97 31 20 92 30 83 49 | 19 50 41 68 34 24 38 15 98 49 16 70 61 37 69  3 77 60 54  2 66 59 42 94 18\n' +
    'Card 210: 94 47 23 65 18 20 11 69 48 74 |  2 70 54 75 29 57 53 90 49 15 46 13  8  5 93 21 95 96 52  6 77 32 34 47 91\n' +
    'Card 211: 26 70 22 97 55 51 41 29 61 78 | 12 15 84 16  3 38  2 43 66 24 10 71 48 45 53  1 13 23 69 35 74 40  5 77 52'

console.log(calculatePoints(text))
