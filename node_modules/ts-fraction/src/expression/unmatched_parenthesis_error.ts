export default class UnmatchedParenthesisError extends Error {

    constructor(message: string) {
        super(message)
        this.name = 'UnmatchedParenthesisError'
    }

}