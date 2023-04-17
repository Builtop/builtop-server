export interface ProcessResult<T> {
    success: boolean,
    errorMessage?: string,
    innerError?: string,
    token?: string,
    data?: T,
}