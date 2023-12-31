
const isSymbolSet1 = (strArr, i, j) => {
    return strArr[i][j].charCodeAt(0) >= 33 && strArr[i][j].charCodeAt(0) <= 45;
};
const isSymbolSet2 = (strArr, i, j) => {
    return strArr[i][j].charCodeAt(0) === 47;
};
const isSymbolSet3 = (strArr, i, j) => {
    return strArr[i][j].charCodeAt(0) >= 58 && strArr[i][j].charCodeAt(0) <= 64;
};
const calculateSum = (text) => {
    const lineArr = text.split('\n');
    const matrixMap = new Map();
    let allNumber = new Array(lineArr.length);
    let sum = 0;
    let isPartNumber = false;
    let strNumber = '';
    let isNextElementNotANumber = false;
    let symbolChar = '';
    let product = 1;


    for(let i = 0; i < lineArr.length ; i++) {
        const elementArr = lineArr[i].split('');
        allNumber[i] = new Array(elementArr.length);
        for(let j = 0; j < elementArr.length; j++) {
            allNumber[i][j] = elementArr[j];
        }
    }

    for(let i = 0; i < allNumber.length ; i++ ) {
        for (let j = 0; j < allNumber[i].length; j++) {
            if(allNumber[i][j].charCodeAt(0) >= 48 && allNumber[i][j].charCodeAt(0) <= 57) {
                strNumber = strNumber + allNumber[i][j];
                if (i > 0 && j > 0) {
                    if (isSymbolSet1(allNumber, i - 1, j - 1) || isSymbolSet2(allNumber,i - 1, j - 1) || isSymbolSet3(allNumber,i - 1, j - 1)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i-1][j-1]+(i-1)+'-'+(j-1);
                    }
                    if (isSymbolSet1(allNumber,i - 1, j) || isSymbolSet2(allNumber,i - 1, j) || isSymbolSet3(allNumber,i - 1, j)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i-1][j]+(i-1)+'-'+j;
                    }
                    if(j < allNumber[i].length - 1) {
                        if (isSymbolSet1(allNumber,i - 1, j + 1) || isSymbolSet2(allNumber,i - 1, j + 1) || isSymbolSet3(allNumber,i - 1, j + 1)) {
                            isPartNumber = true;
                            symbolChar = allNumber[i-1][j+1]+(i-1)+'-'+(j+1);
                        }
                    }
                    if (isSymbolSet1(allNumber, i, j - 1) || isSymbolSet2(allNumber, i, j - 1) || isSymbolSet3(allNumber, i, j - 1)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i][j-1]+i+'-'+(j-1);
                    }
                }
                if (i < allNumber.length - 1 && j < allNumber[i].length - 1) {
                    if (isSymbolSet1(allNumber,i + 1, j + 1) || isSymbolSet2(allNumber,i + 1, j + 1) || isSymbolSet3(allNumber,i + 1, j + 1)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i+1][j+1]+(i+1)+'-'+(j+1);
                    }
                    if (isSymbolSet1(allNumber, i, j + 1) || isSymbolSet2(allNumber, i, j + 1) || isSymbolSet3(allNumber, i, j + 1)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i][j+1]+i+'-'+(j+1);
                    }
                    if (j > 0) {
                        if (isSymbolSet1(allNumber,i + 1, j - 1) || isSymbolSet2(allNumber,i + 1, j - 1) || isSymbolSet3(allNumber,i + 1, j - 1)) {
                            isPartNumber = true;
                            symbolChar = allNumber[i+1][j-1]+(i+1)+'-'+(j-1);
                        }
                    }
                    if (isSymbolSet1(allNumber,i + 1, j) || isSymbolSet2(allNumber,i + 1, j) || isSymbolSet3(allNumber,i + 1, j)) {
                        isPartNumber = true;
                        symbolChar = allNumber[i+1][j]+(i+1)+'-'+j;
                    }
                }
            } else {
                isPartNumber = false;
                strNumber = '';
                symbolChar = ''
            }
            isNextElementNotANumber = j < allNumber[i].length - 1 && (allNumber[i][j+1].charCodeAt(0) < 48 || allNumber[i][j+1].charCodeAt(0) > 57)
            if(isPartNumber && (isNextElementNotANumber || j === allNumber[i].length - 1)) {
                if(matrixMap.has(symbolChar)) {
                    let arr = matrixMap.get(symbolChar)
                    arr.push(parseInt(strNumber))
                    matrixMap.set(symbolChar, arr)
                } else {
                    let arr = [];
                    arr.push(parseInt(strNumber))
                    matrixMap.set(symbolChar, arr)
                }
                strNumber = ''
            }

        }
    }

    for(let [key, value] of matrixMap) {
        if(value.length === 2) {
            product = value[0] * value[1]
            sum = sum + product
        }
    }
    return sum;
}

const text = '........440...............418..643.....438......740.261......................................727...........................870..............\n' +
    '...............338.............-........*.......*.......34&.$........@.....&742................................353..26.......*...188...238..\n' +
    '..................*369.....334.......624..749....533........690...894...........466......../....&......294....................1.............\n' +
    '..338....367............................................../...............565..@....456.357....873........#..=...916.#60....................\n' +
    '........*...............*......402.......473..%400..+415.165....364........*.....$....*......*...............410...=..........#........#....\n' +
    '..342....886....122..457..866........438....*.....................*........739...716...131....561..748.......................206......155...\n' +
    '.................-.........../..........@.185..78.556........120..856..436............................*.....%730.307....382#................\n' +
    '...................352...........................*....282.......$...........*......716......904*588....807.........*........................\n' +
    '.590.......225....*......610...............&434......*...................805.878......*......................#539..412......452......993....\n' +
    '....*407...................%............=..........489..............#..................390....621.708........................-..............\n' +
    '..........542#...880...@.......*.....%...877..................264....3........750.............../.*.............-.......570.......&.........\n' +
    '.....290...........@.540....167.873.970................669.....#.....................169...........718....&...240......*........764.400.....\n' +
    '.......*......639.......................103.....@.......*..................................731.........413...........974...............*....\n' +
    '......174........#..-331....&................465.............428...$118.....................*......714.......209*418........*....@......513.\n' +
    '...........869.............120.....101................379...*..................488.579...344......*.......................94.802.105........\n' +
    '...834.............254............=........657.........@...198..160....258........*.............449........972@.553%.................234....\n' +
    '...*.....@...........*....................../.....273............*...................&......................................545.365.........\n' +
    '.773......296.........85...256.......977.............*....203...216.....394......872.240.......406*.......&254...............*..*...........\n' +
    '......-...............................................830.....%....................*..............................................615.608...\n' +
    '...739..15*903....93.........714..442*...769.....838.......829.....741.....@469.......60...........181..376.......63.........172........*...\n' +
    '.................=......306............@...*.......*...900.....309..*...............-.....428..333...*.....*921..*....673............499....\n' +
    '.........599...........&........221....137..432....930....*.....*..216..........#..381...*.....*....767.................@..........=........\n' +
    '.993......-..............243....$.......................150...456.............677......400..338.............................766.468.........\n' +
    '........................*....................509....................815.............................................308.....*..........575..\n' +
    '...................908.112........767....215..........400..220........*............962.825......46......30.....21-........875......453*.....\n' +
    '....845........840............../....*.../........423*....*....929..76......682-...*.....&.........@.....*..........&196....................\n' +
    '867.*.........+.........=671....429..278......46.......$...194../.................611.............401.....788....&.......201.........*38....\n' +
    '....21...599........................................863..................946...23............*547.............244...........*.....963.......\n' +
    '.........*...........65.............659......612..........497.......&705..................121.........................29....80..............\n' +
    '.......670....391...*......&....405.*..........*..........=.....................721............321...........585.464...............598......\n' +
    '....................892..472.....*...526....615.......51......790..........-633........847.......*...310..60..#..*.......517.415......*.....\n' +
    '.....732......*473.............825.................67*.......*.....488...........@....*....298.240....*....*....548.............+...........\n' +
    '........*..222.....377.........................710......512...839........340......829.836....#.........619.776.........695.358......417.....\n' +
    '.......51................632*........................85*..........*.......*..125...........%....@360............109....../.............*....\n' +
    '...........880....836........979...........496.247.......885......754..658.....*..622.......840...........118......*.120......779..92..746..\n' +
    '651....617....*..*...............@.....291*.......*883...*...................529...*.............531.........*...857.-..........%.=.........\n' +
    '.........*.......699.....639.583.181........457+.......699.829......308..........704....299.......*....332.622..........467*.........684.491\n' +
    '......258...............................25*........441...............-...212..............*......820...............440*.....352.........*...\n' +
    '...34.........186................255.......526.618..........775.702.........*.940......=...822.........................515......947.........\n' +
    '...*.............*195.....693.......*..........#.....826.......*.....%....331...*.......49.....677..............920.........781*......-.....\n' +
    '....657....52.............*..........766................*..289.....589........34................*...................&............=...421....\n' +
    '............*.......9.$...831..............*952....469.886....*.........283........525.....986..516..............184..949......670..........\n' +
    '.568........283...../.431......*....420.259...................807..568..*........%..+..634*...........915..&938.........$...................\n' +
    '...*...........................77............874...558..............#....596..902..............368......#..................&....$.958..702..\n' +
    '455....................389..............&..../.......+......*409......-.............909.......*...........978*341...188...74..26..*....*....\n' +
    '..........17....360.......*............617...............153.........887.122.......*.......184........258........................755...348..\n' +
    '......612.#.......*......425.968$..496..............918.......313........+....535..764.............19*.....*......173....=..................\n' +
    '........-......440..384...................474...940..=..586@.&.....466...........=...............-.........797.......@.406...-......%.......\n' +
    '....816............*..............@.760....*.....*..................$..156...............676...451..462........774.........346.....558......\n' +
    '....*.......258..888...#165.....166...#...27......766...........83......$.........&302......-........*........*.............................\n' +
    '..655.....$.................548.......................109......-....................................61..252..849.......299.....880....-.....\n' +
    '..........550.=495.62.........*.......-........691*......*648.......837&....736*722....*12.................*......*......$.283*.....35...539\n' +
    '......475............*358...&.........605..........963..............................514....673..840........787....420.......................\n' +
    '..431....*....62.964.......814.$832.............................................844.......*.......*.293.......................297.....+.....\n' +
    '......%..730......*........................./..145...&............45.#.............*.....365....276...*..............125......*.......178...\n' +
    '....924.........814......143%.............295.#....811.*253.....-..-.910.....605..595................34..957.........*........413...........\n' +
    '..........220.................$.....769......................738......................461.177.........../.......848...63..407........354....\n' +
    '.........$..........657.985...426........................-....................903.......*..#...703........784.....&......*.............*....\n' +
    '...............105....&.-...................264..........50.....593.181..252...*......808.........*.......*............509.154.....678..210.\n' +
    '.......263........@...........57....854.............*38.........*....*...-.....89...........$../........%.889....404.........-..............\n' +
    '.918..%.................*534..*.............838..731.......$501.409...............942....958..516....720.........%..............777.........\n' +
    '....$.........%435....24.......657.561.......*.......841...................961......./............-.......886*......442....627=...*....516..\n' +
    '.........925...............827......*...149..236..28*.........599...249...$......958...........220............611.....*.&.......314.........\n' +
    '..........*..*.........120....*..$..158.*...........................................=..786...............428.......831...211.........%......\n' +
    '.........530.456........*..355..74......870........65.........................843........&.../......@......*..........................425...\n' +
    '.....................657..........................*....50.......=............*.......93......817..413..598..83..............................\n' +
    '.....818*427...+131.................459..474.938...570.........53........217..785...*..................*.......*......................#.....\n' +
    '.193....................233..491.......*................52.........$.......*........483...817...484....114....295.......%298..689..552......\n' +
    '....*...........................#....25...848....@537..$...........302.....507............&.........................%.......................\n' +
    '...817..........383..431...464............................845....................896.........................715.920....468..........531....\n' +
    '........................*.................337...85.......*.....................................331.........................*326..../.=......\n' +
    '.........587.....533...601.................*...+.......726...949.760...374*.............849...............923.....328...........671.........\n' +
    '.705....../........*..............437.....426..................*...........945...............................*................/.....670.....\n' +
    '....*...........657....*593........./.............279.......672................*711..........742*679.........754....351@.......225..........\n' +
    '..898...600..........57................86....826...#..................97....601........................93................163..........270...\n' +
    '..........*..............&.530-....324*.....*........833.....876........*.........908*........172$....*............548................*.....\n' +
    '..71......403.........584................377.........*......*...........920...........432.............723......650*....570.......593...718..\n' +
    '...............739...........................199..418......16..668.............852.........555#...........................*516..*...........\n' +
    '....642.............*..................93@.....*..........................602.+............................49......&.............202.267....\n' +
    '..........861..268...60.....-...............993......%...320................/...............261.........$.........897..................=....\n' +
    '.........*........*..........249....................389..*.........416.........*...........*.............962...........928*310..............\n' +
    '................33................727...346*850...........845.......*.......695.388...690..834.....471.........................746.....882..\n' +
    '....576...............824.....491../...............464...........173..............................*.....514+....27.965........#....939......\n' +
    '.................................*.............832....*.....515......337........./215..640$.......985.............*..................%......\n' +
    '.......-..........343..586......................*....569..*....=......#...618.............................368.................%188.....815..\n' +
    '....721...480..................847...............651.......576...........&........./...356..........287..-..................................\n' +
    '..........+.......587...........*.....................34.......84.................96..*......790....+..............286..310.@........451....\n' +
    '............929..*.......613.....480.389..761........*........*..............97......712.......*....................*..*....335....%.....795\n' +
    '....125.762*......104....&...900.......*...*.......794........83..............*.............860.....$........622.723..771.......706.....*...\n' +
    '119*........................*....&....474..268..............*....65.........781.......817............814.................................940\n' +
    '..............777.192.....187.302....................363.253....=.............................565........834........-.......519.............\n' +
    '..............*...................*..+197.........*.....................14....230.........................*....552.733..657....-......134...\n' +
    '....47$...448.744.....562..234..849.......894...298........136..........*....$...........650*..31...787....357..............................\n' +
    '..........=..........*.......@..............*.............$..........839.........................*....*.............201...992...............\n' +
    '......+...........535...@.............989-..........477......................273.......625.....544.367....................+............69...\n' +
    '....456..493..........282..............................@....810..689@.361.....*...123.....*262...............995..429*........../......*....\n' +
    '.............................564.115...507*720................................473..*.../........................+.....200....230........8...\n' +
    '.................814.....90.*.......+..........508.872..418....496*783.................643......&437..244.....$...................654.......\n' +
    '.......376..........*...*....32..........356......*......*.................691.../.......................*.221............813@.......$......\n' +
    '.........#.........31....971....352@.....*...566*.......278....-.......%..*......25.........*...222....963.......42.............-...........\n' +
    '.....944...............................189.........#..&.......213....542.468.613.........494.......*..........$...............666...........\n' +
    '.......+...783...........930......*701......772...148.350...................../.../681..........*......@.......799......30........729.......\n' +
    '..................407.....#.....#............*............$.............142..................513.858...431................*.513...=.........\n' +
    '.....621.+720.41...@.............318...$661..197.104..997.252.*346.......*.....241..............................249....296../.........*355..\n' +
    '.........................*........................*....=.................194..../....285............&......204*...*................614......\n' +
    '....465......256.......31.154............84....990..............999..+.................*...965.....817..........674.........................\n' +
    '......+.........$...............515.........................554.*.....485.$411.......382..#...........................399....364....*568....\n' +
    '.........87..52.....896..........&....................583..@.....550..........................@774...........97*106.....*......-.670........\n' +
    '..........*...........*.&......@...2....*444.............*...388........................................................150.................\n' +
    '.........263.........20.623..264..*..513.................655.......430.....820.....................=....156..840/..883...........283*78.....\n' +
    '..........................................793.....298........../.......212...@..234.715.*133....705.....*............#......................\n' +
    '.....................................*.......*...*.............992......*.........=..@..................870................324......=..712..\n' +
    '.452.......818*237...........329...73.....754.....955....645.+...........478............340.970......*................817....@...982........\n' +
    '....@..705..........115...................................*...157.620...........&.......*....$......565.....8.@.........*.............669...\n' +
    '..........*715.481.*....................*........836......714.....*...........124....968........=...........*..426....693........753...*....\n' +
    '..26@..........*....892...272.259....461.387..82....*...........208...126.....................850..........299..........................135.\n' +
    '......947...682...*..........*................@...482.....854............*.....613.....................719..................................\n' +
    '...33.-.........131....586............396.......#.....1...................889..+....*577..........782....*.......969$...............951.653.\n' +
    '....*........$............*.............*....469......*..111./822................105.........131+.*..........816........618............*....\n' +
    '...95.....355..........+.....+.469.241..736.........831...........227.......639........474$........703..610.....*......*.....199.....$......\n' +
    '..................597...572.85....*............462.......@536..........@793....*..77.........................798...374..20......&....246....\n' +
    '......374.........*.................848....552*................545...........307......956.67............336*.........*......................\n' +
    '.647.......#819..305.........735...*....................-........*...............824....*...*....100........383...@...695........%...245....\n' +
    '....@.762...............727...*..373.........241*656...581..842.910...................672..229...*...............869............249.........\n' +
    '........*...........563......899.........406................*..........12%.....................78..614......+166........../92...........787.\n' +
    '.........558....282*.......................*.763...313.....999.....807...............+....489.......*............261...........130...*.*....\n' +
    '.....356.............325.....265..740...923..*......*................*..../....120...456.....*....%.102.....791....*..141........@.666.65...\n' +
    '......*...870$.......*...431..#......*.......631...212............957..124.......*........558..946.............&.763...-..903#..............\n' +
    '....437..............412....*.........29....................539...............703.......*............844....................................\n' +
    '.........345................177..................609..398......@.....................138.185..+......*......................193-.....929....\n' +
    '..............&...%....950...............489........=....*119.....909.522........%.............928.331...18.799.....*914....................\n' +
    '....422.....304....753.*..................=.....751....................*........144.....53*878............%..$...579...............658......\n' +
    '.......................618...................$.........344*91........533............439...........556..................=..............*.....\n' +
    '.........275..................................12.................764........&..........*..................710..609....902........80.753.....\n' +
    '............*.738......5#.................................595..........976+.887.......468.-.......114............./........*484.............\n' +
    '495.......804...*.................988....+..411...........=................................86...........$......=........631.................\n' +
    '.................458.........927...*..514.....-.......933.........192.850.85......858..209............379......462............139....70.....\n' +
    '........@.....+..........107*.....229....................*............*....%.896./......../..................=...........*.....#............\n' +
    '........991..272.....575.................................958...........917.....*............*.......94.....985...+587...184.................\n' +
    '...............................................657..........................423..........742.367...............................634..........'

console.log(calculateSum(text));
