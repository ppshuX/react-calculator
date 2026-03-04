import ACTIONS from "./actions"

const evaluate = state => {
    let {lastOperand, currentOperand, operation} = state;
    let last = parseFloat(lastOperand);
    let current = parseFloat(currentOperand);

    let res = "";

    switch(operation) {
        case '+':
            res = last + current;
            break;
        case '-':
            res = last - current;
            break;
        case '×':
            res = last * current;
            break;
        case '÷':
            res = last / current;
            break;
    }
    return res.toString();
}

const reducer = (state = {
    currentOperand: "",
    lastOperand: "",
    operation: "",
    overwrite: false,
}, action) => {
    switch(action.type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: action.digit,
                    overwrite: false,
                }
            }
            if (state.currentOperand === '0' && action.digit === '0')
                return state;

            if (state.currentOperand === '0' && action.digit !== '.')
                return {
                    ...state,
                    currentOperand: action.digit,
                }

            if (action.digit === '.' && state.currentOperand.includes('.'))
                return state;

            // 当前没有数字时，单独点 "." 显示 "0."
            if (action.digit === '.' && (state.currentOperand === '' || state.currentOperand === '0')) {
                return {
                    ...state,
                    currentOperand: "0."
                }
            }

            return {
                ...state,
                currentOperand: state.currentOperand + action.digit,
            }

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: "",
                    overwrite: false,
                }
            }
            if (state.currentOperand === "")
                return state;

            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        
        case ACTIONS.CHOOSE_OPERATION:
            if (state.lastOperand === "" && state.currentOperand === "") {
                return state;
            }

            if (state.lastOperand === "") {
                return {
                    ...state,
                    lastOperand: state.currentOperand,
                    operation: action.operation,
                    currentOperand: "",
                }
            }

            if (state.currentOperand === "")
                return {
                    ...state,
                    operation: action.operation,
                }

            // 已有两个操作数：先算出结果作为 lastOperand，清空 currentOperand，再记下新运算符
            return {
                ...state,
                lastOperand: evaluate(state),
                operation: action.operation,
                currentOperand: "",
            }

        case ACTIONS.EVALUATE:
            if (state.operation === "" || state.currentOperand === "" || state.lastOperand === "") {
                return state;
            }
            return {
                ...state,
                currentOperand: evaluate(state),
                lastOperand: "",
                operation: "",
                overwrite: true,
            }

        case ACTIONS.CLEAR:
            return {
                ...state,
                currentOperand: "",
                lastOperand: "",
                operation: "",
                overwrite: false,
            }

        default:
            return state;
    }
}

export default reducer;