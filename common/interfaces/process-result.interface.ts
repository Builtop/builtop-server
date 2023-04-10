export interface ProcessResult<T> {
    success: boolean,
    errorMessage?: string,
    innerError?: string,
    data?: T,
}