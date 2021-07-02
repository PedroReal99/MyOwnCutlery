import { Type } from "@nestjs/common";

// available roles 
export enum STATE {
    PENDING="pending",
    PROCESSIING= "processing",
    IN_DISTRIBUTION= "in destribution",
    DELIVERED= "delivered",
    CANCELED="canceled"
};

export const State = STATE;

// verify role
export function verifyState(expression:string){

    var state: string;
    switch (expression.toLowerCase()) {
        case STATE.PENDING:
            state = STATE.PENDING;
            break;
        case STATE.PROCESSIING:
            state = STATE.PROCESSIING;
            break;
        case STATE.IN_DISTRIBUTION:
            state = STATE.IN_DISTRIBUTION;
            break;
        case STATE.DELIVERED:
            state = STATE.DELIVERED;
            break;
        case STATE.CANCELED:
                state = STATE.CANCELED;
                break;
        default:
            state = null;
    }
    return state;
}