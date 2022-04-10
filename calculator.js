class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.operatorCheck = true; //목적: 연산자가 두번 들어가주는것을 막기위해
        this.equalsCheck = false; //목적: =을 누르고 숫자를 눌렀을때의 그 숫자만 나오도록
        this.allclear();
    }//생성자에 인자로 콜백함수를 쓸수있다.
    //숫자를 넣었을때 show칸에 보이도록
    appendNumber(number) {//ex 32를 구하고 바로 2를 누르면 2로 초기화 즉 true값을 받았으므로
        if(this.equalsCheck) {
            this.displayContent = number; //기존숫자에다가 새로운 숫자를 대입
            this.equalsCheck = false;
        }
        else { //equalsCheck가 false일때 실행
            this.displayContent += number;//기존숫자에 새로운숫자가 추가
        }
        this.operatorCheck = false;
    } 
    updateDisplay() { //위에 숫자를 입력
        this.displayElement.value  = this.displayContent;
        //숫자가 들어간걸 그 #show 즉 input값에 넣어주는것
    }
    appendOperator(operator) {
        if(this.operatorCheck) return false; //true일때 false를 리턴해 즉 연산자 두번입력X
        if(this.equalsCheck) this.equalsCheck = false;
        //ex 30+2
        this.displayContent += operator;//operatorcheck가 false일때만 연산자가 적용
        return this.operatorCheck = true; //true여야 updateDisplay실행되는것
    }//2번째누를땐 true이므로 적용이 안될것
    allclear() {
        this.displayElement.value = 0;
        this.displayContent = '';
        this.operatorCheck = true;
    }
    compute() { //계산식 함수를 쓰는것 ex 8+5=13을 해서 계산해준다
        if(this.operatorCheck) return; //true이면 함수를 빠져나와 즉 6* 하고 = 누르면 에러 안뜸
        this.displayContent = eval(this.displayContent);
        return this.equalsCheck = true; 
        //true를 리턴하면 다시 숫자를 넣을때 이전꺼는 없어지고 숫자만대입
    }//숫자를 추가하든 연산자를 추가하든 this.displayContent를 추가함
    dot() {
        this.displayContent = this.displayContent + '.';
    }
    clear() { //뒤에서 부터 빼오는 slice개념 사용
        //그냥  slice를 쓰면 배열로 되기때문에 
        //toString()함수를 통해 문자열로 반환후 뒤에서 빼버려
        this.operatorCheck = true;
        this.displayContent = this.displayContent.toString().slice(0, -1);   
    }
    square() {
        this.displayContent *= this.displayContent;
    }
}

//foreach문을 써야함. 왜냐 SelectorAll을 통해 배열로 받아오기때문
const buttons = document.querySelectorAll('.button button');

const displayElement = document.querySelector('#show'); 

const calculator = new Calculator(displayElement); //콜백함수 호출

//buttons에 있는 요소들을 button에 담는다
buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch(button.className) {
            case "num":
                calculator.appendNumber(button.innerText);//button안에 있는 글자를 넘긴다
                calculator.updateDisplay();
                break;
            case "operator": //button안에 있는 innerText를 불러와
                if (calculator.appendOperator(button.innerText)) {
                    calculator.updateDisplay();//true일때만 updateDisplay() 실행
                }//적용안되는거를 updateDisplay()에도 적용시켜야하므로
                break;
            case "allclear":
                calculator.allclear();
                break;
            case "equal":
                calculator.compute();
                calculator.updateDisplay();
                break;
            case "dot":
                calculator.dot();
                calculator.updateDisplay();
                break;
            case "clear":
                calculator.clear();
                calculator.updateDisplay();
                break;
            case "square":
                calculator.square();
                calculator.updateDisplay();
                break;
        }
    });
}); 