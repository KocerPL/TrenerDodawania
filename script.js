var IO ={
    TRAINER:document.getElementById("trainer"),
    CONFIG:document.getElementById("config"),
    CORRECT:document.getElementById("correct"),
    INCORRECT:document.getElementById("incorrect"),
    RESULT:document.getElementById("result"),   
    SCRIPTNOTLOADED:document.getElementById("scriptNotLoaded"), 
    IN:{
        CONFIG:{
            SELF:document.getElementById("config"),
            MINRANGE:document.getElementById("minRange"),
            MAXRANGE:document.getElementById("maxRange"),
            COUNT:document.getElementById("count"),
            START:document.getElementById("start")
        },
        TRAINER:{
            
            CHECK:document.getElementById("check"),
            YOURVALUE:document.getElementById("yourValue"),
        },
        GLOBALS:{
            RESET:document.getElementsByClassName("reset"),
            NEXT:document.getElementsByClassName("next")
        }
    },
    OUT:{
       GLOBALS:{
        TRYNUMBER:document.getElementsByClassName("tryNumber"),
        TRYCOUNT:document.getElementsByClassName("tryCount"),
        EQUATION:document.getElementsByClassName("equation"),
        CORRECTANSWER:document.getElementsByClassName("correctAnswer"),
        CORRECTCOUNT:document.getElementsByClassName("correctCount"),
        INCORRECTCOUNT:document.getElementsByClassName("incorrectCount"),
        CORRECTPERCENT:document.getElementsByClassName("correctPercent")
       }
    }
}
function hideScriptNotLoaded()
{
    IO.SCRIPTNOTLOADED.style.display="none";
}
function showConfig()
{
    IO.CONFIG.style.display="block";
}
function hideConfig()
{
    IO.CONFIG.style.display="none";
}
function showTrainer()
{
    IO.TRAINER.style.display="block";
}
function hideTrainer()
{
    IO.TRAINER.style.display="none";
}
function showCorrect()
{
    IO.CORRECT.style.display="block";
}
function hideCorrect()
{
    IO.CORRECT.style.display="none";
}
function hideInCorrect()
{
    IO.INCORRECT.style.display="none";
}
function showInCorrect()
{
    IO.INCORRECT.style.display="block";
}
function showResults()
{
    IO.RESULT.style.display="block";
}
function hideResults()
{
    IO.RESULT.style.display="none";
}
var tryNumber=0;
var tryCount=0;
var solution=0;
var correctCount=0;
var incorrectCount=0;
var minRange=-20;
var maxRange=20;
function randRange(min,max)
{
    return  Math.floor((Math.random()*(max-min))+min);
}
function updateTryNumber()
{
  for(let tn of IO.OUT.GLOBALS.TRYNUMBER) tn.innerHTML = tryNumber;
}
function nextEquation()
{
    tryNumber++;
    updateTryNumber();
    var firstNumber = randRange(minRange,maxRange);
    var secondNumber = randRange(minRange,maxRange);
    solution=firstNumber+secondNumber;
    IO.IN.TRAINER.YOURVALUE.value="";
    var equation=firstNumber.toString()+(secondNumber>0?"+":"")+secondNumber.toString()+"=";
    for (let EQ of IO.OUT.GLOBALS.EQUATION)
    {
        EQ.innerHTML=equation;
    }
}
function updateCounts()
{
    for(let cc of IO.OUT.GLOBALS.CORRECTCOUNT)
        cc.innerHTML = correctCount;
    for(let ic of IO.OUT.GLOBALS.INCORRECTCOUNT)
        ic.innerHTML = incorrectCount;
    for(let pc of IO.OUT.GLOBALS.CORRECTPERCENT)
        pc.innerHTML = ((correctCount*100)/(correctCount+incorrectCount)).toString();
}
function check()
{
    console.log("click");
    var yourValue = Number.parseInt(IO.IN.TRAINER.YOURVALUE.value);
    console.log(yourValue,solution);
    if(yourValue==solution)
    {
        correctCount++;
        updateCounts();
        hideTrainer();
        showCorrect();
    }
    else
    {
        incorrectCount++;
        updateCounts();
        hideTrainer();
        showInCorrect();
    }
}
function endScreen()
{
    showResults();
}
function loadNextEquation()
{
    hideCorrect();
    hideInCorrect();
    if(tryNumber>=tryCount)
    {endScreen(); return; }
    nextEquation(); 
    showTrainer();
}
function startTraining()
{
    minRange = Number.parseInt(IO.IN.CONFIG.MINRANGE.value);
    maxRange = Number.parseInt(IO.IN.CONFIG.MAXRANGE.value);
    tryCount = Number.parseInt(IO.IN.CONFIG.COUNT.value);
    for(let TC of IO.OUT.GLOBALS.TRYCOUNT)
        TC.innerHTML = tryCount;
    hideConfig();
    nextEquation();
    showTrainer();
}
function reset()
{
    tryCount=0;
    solution=0;
    correctCount=0;
    incorrectCount=0;
    minRange=-20;
    maxRange=20;
    tryNumber=0;
    hideResults();
    showConfig();
}
function run()
{
    hideScriptNotLoaded();
    showConfig();
    IO.IN.CONFIG.START.onclick=startTraining;
    IO.IN.TRAINER.CHECK.onclick=check;
    for(let next of IO.IN.GLOBALS.NEXT)
        next.onclick = loadNextEquation;
    for(let rst of IO.IN.GLOBALS.RESET)
        rst.onclick = reset;
}

run();