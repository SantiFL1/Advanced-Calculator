

const DarkButton = document.getElementById('Dark')
const BrightButton = document.getElementById('Bright')
const Calculator = document.getElementById('Calculator')
const Buttons = document.getElementsByClassName('SimpleButton')
const ButtonsCointainer = document.getElementById('ButtonsCointainer')
const ScreenString = document.getElementById('ScreenString')
const Result = document.getElementById('Result')




const Operations = ['x','/','+','-','X','*','.','^','^2','*10^','√','sin','cos','tan']
const NotBeginningOperations = ['x','/','*','X','^','^2','*10^']
const MightHaveSignBefore = ['-','+','.','√','sin','cos','tan']
const Brackets = ['(',')']
const NotWrittenKeys = ['enter','backspace']
const Duplicables = ['+','-']
let ArrayButtons=[]
for (let i=0 ; i<=Buttons.length-1;i++) {
    ArrayButtons.push(Buttons[i])
}
let String = ''

// Dark and Bright mode

BrightButton.addEventListener('click',(c)=>{
    c.preventDefault()
    Calculator.style.background='rgb(170, 170, 170)';
    ScreenString.style.color='black'
    Result.style.color='black'
    ArrayButtons.forEach(button=>{
        
        button.style.color='black'
        button.style.background='rgb(124, 124, 124)'
    })

    BrightButton.style.background='rgb(124, 124, 124)'
    DarkButton.style.background='rgb(124, 124, 124)'
})

DarkButton.addEventListener('click',(c)=>{
    c.preventDefault()
    
    Calculator.style+='linear-gradient(180deg,black,white);'
    ScreenString.style.color='white'
    Result.style.color='white'
    ArrayButtons.forEach(button=>{
        
        button.style.color='white'
        button.style.background='transparent'
    })
    BrightButton.style.background= 'transparent'
    DarkButton.style.background='transparent'
})

//Operations
function Write (key) {

    if (key==='F5') {return}
    { //Shortcuts

        if (key==='π') {key=(Math.PI).toFixed(5).toString()}
        
        if (key==='t' || key ==='T') {key='tan'}

        if (key==='c' || key ==='C') {key='cos'}

        if (key==='s' || key ==='S') {key='sin'}

        if (key==='p' || key ==='P') {key='^'}
        
        if (key==='√x' || key==='r'){key='√'}

        if (key==='x10ⁿ'|| key=='e'|| key=='E'){key='*10^'}

        if (key==='X²'){key='^2'}

        if (key ==='Xⁿ') {
            key='^'
        }
    }

    if (key!=='X²' && key !=='Xⁿ') {
        key=key.toLowerCase() 
    }
    
    //ERRORS 
    {

        if (ScreenString.textContent==='' && NotBeginningOperations.includes(key)){
            alert("You can't write that sign in the beginnings")
            return

        }
        if (Operations.includes(ScreenString.textContent[ScreenString.textContent.length-1]) 
        && !MightHaveSignBefore.includes(key) 
        && Operations.includes(key)
        
        ) {
            
            alert("You can't write those signs in a row")
            return
        } 
        if ( !Duplicables.includes(key) 
        && ScreenString.textContent[ScreenString.textContent.length-1] == key
        && Operations.includes(key) ){
            alert("You can't write those signs in a row")
            return
        }
        if ( key==ScreenString.textContent[ScreenString.textContent.length-1]
            && key==ScreenString.textContent[ScreenString.textContent.length-2]
            && Operations.includes(key)
        ){
            alert("You can't write the same sign three times ")
            return
        }
    }
    //Add characters to the String
    {    
        if (!isNaN(parseInt(key)) || Operations.includes(key) || Brackets.includes(key)){
            
            if (key=='x') {
                String+='*';
                
            }
            
            else {
                String+=key
                
            }
        }
        
        ScreenString.textContent = String
        
        switch (key){
            case 'enter': if (String!=='') Equal();break;
            case '=':Equal();break
            case 'backspace':Delete();break
            case 'del':Delete();break
            case 'ac':String='';ScreenString.textContent='';Result.textContent='';break

        }

        if (ScreenString.textContent.includes('undefined')){
            String = String.replace(('undefined'),'')
        }
    }    
}
function Equal () {
    //Delete signs at the end of the string
    while (Operations.includes(String[String.length-1]) || Brackets.includes(String[String.length-1]) && !isNaN(String[String.length-1])){
        Delete()
    }

    //Exponentiation
    if (String.includes('^')) {
        
        
        
        //Getting the base and exponent of the exponentiation
        let ReversedBase = ''
        let Base = ''
        let Exponent = ''
        let InvolvedCharacters = [String.indexOf('^')]
        
        for (let i = String.indexOf('^')-1 ; i>=0 ; i--) {
            if (Operations.includes(String[i]) && String[i]!=='.') {
                break

            }
            ReversedBase+=String[i]
            InvolvedCharacters.push(i)
        }

        for (let i = String.indexOf('^')+1 ; i<=String.length-1 ; i++) {
            if (Operations.includes(String[i])) {

                break
            }
            Exponent+=String[i]
            InvolvedCharacters.push(i)
        }

            
        
        for (let i = ReversedBase.length-1 ; i>=0 ; i--){
            Base+=(ReversedBase[i])
        }
        
        //Operation
        let ResultP = parseFloat(Base)
        for (let i = 1 ; i<parseFloat(Exponent) ; i++) {
            
            ResultP = ResultP *parseFloat(Base)
        }
        //Adding exponentiation to the whole operation string
        String = String.toString()
        let FirstCharacter = 100
         for (x of InvolvedCharacters) {
            if (x<FirstCharacter){FirstCharacter=x}
            String = String.substring(0,x) + 'x' + String.substring(x+1)
        } 
        
        for (let i = String.length-1 ; i>=0 ; i--) {
            if (InvolvedCharacters.includes(i)){
                
                String = String.replace((String[i]),'')
            }
        }
        
        String= String.substring(0,FirstCharacter)+ResultP+String.substring(FirstCharacter)
        
        
        
    }

    //Root

    if (String.includes('√')) {
        

        if (!isNaN(String[String.indexOf('√')-1])) {
           
            String = String.substring(0,String.indexOf('√')) + '*' + String.substring(String.indexOf('√')) 
        }

        let Base = ''
        let RootResult = 0
        let RootLastCharacter = 0
        
        for (let i = String.indexOf('√')+1 ; i<String.length ; i++) {
            if (Operations.includes(String[i]) && String[i]!=='.' ){
                break
            }
            
            Base+=String[i]
            RootLastCharacter = i
        }

    RootResult = Math.sqrt(parseFloat(Base))
    
    String = String.substring(0,String.indexOf('√')) + RootResult.toString() + String.substring(RootLastCharacter+1)
    }
    
    //SINE

    if (String.includes('sin')){
        
        if (!isNaN(String[String.indexOf('sin')-1])) {
            String = String.substring(0,String.indexOf('sin')) + '*' + String.substring(String.indexOf('sin')) 
        }    
        
        let Base = ''
        let SineResult = 0
        let SineLastCharacter = 0
        
        for (let i = String.indexOf('n')+1 ; i<String.length ; i++) {
            if (Operations.includes(String[i]) && String[i]!=='.' ){
                break
            }
            
            Base+=String[i]
            SineLastCharacter = i
        }
        
        Base=parseFloat(Base)
        SineResult = Math.sin(Base*Math.PI/180)
        
        String = String.substring(0,String.indexOf('s')) + SineResult.toString() + String.substring(SineLastCharacter+1)
        
    }

    //Cosine

    if (String.includes('cos')){
        
        if (!isNaN(String[String.indexOf('cos')-1])) {
            String = String.substring(0,String.indexOf('cos')) + '*' + String.substring(String.indexOf('cos')) 
        }    
        
        let Base = ''
        let CosResult = 0
        let CosLastCharacter = 0
        
        for (let i = String.indexOf('s')+1 ; i<String.length ; i++) {
            if (Operations.includes(String[i]) && String[i]!=='.' ){
                break
            }
            
            Base+=String[i]
            CosLastCharacter = i
        }
        
        Base=parseFloat(Base)
        
        CosResult = Math.cos(Base*Math.PI/180)
        
        String = String.substring(0,String.indexOf('c')) + CosResult.toString() + String.substring(CosLastCharacter+1)
        
    }

    //Tangent
    if (String.includes('tan')){
        
        if (!isNaN(String[String.indexOf('tan')-1])) {
            String = String.substring(0,String.indexOf('tan')) + '*' + String.substring(String.indexOf('tan')) 
        }    
        
        let Base = ''
        let TanResult = 0
        let TanLastCharacter = 0
        
        for (let i = String.indexOf('n')+1 ; i<String.length ; i++) {
            if (Operations.includes(String[i]) && String[i]!=='.' ){
                break
            }
            
            Base+=String[i]
            TanLastCharacter = i
        }
        
        Base=parseFloat(Base)
        
        TanResult = Math.tan(Base*Math.PI/180)
        
        String = String.substring(0,String.indexOf('t')) + TanResult.toString() + String.substring(TanLastCharacter+1)
        
    }

    //Evaluating the string
    String = eval(String)
    String = String.toString()
    
    
    
    if(String.includes('.')){
        String = (eval(String)).toFixed(3)    
        Result.textContent = String
    }
    else{
        Result.textContent = eval(String)
    
    }
        
    String=Result.textContent
}
function Delete () {
    String = String.substring(0,String.length-1)
    ScreenString.textContent=String
}

document.addEventListener('keyup',k=>{
    
Write(k.key)
})

ButtonsCointainer.addEventListener('click',(b)=>{
    b.preventDefault()
    Write(b.target.innerText)
    

})