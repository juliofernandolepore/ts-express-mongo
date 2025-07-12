
export interface JSONResponse {
    error: boolean
    message: string
    data?: any

};

export class JSONRespuesta<T = any> implements JSONResponse {
    public error: boolean;
    public message: string;
    public data?: T;

    private constructor(error: boolean, message: string, data?: T) {
        this.error = error;
        this.message = message;
        this.data = data;
    }         
    
    public modificar(error?: boolean, message?: string, data?: T): this {
        if (error !== undefined) {
            this.error = error;
        }
        if (message !== undefined) {
            this.message = message;
        }
        if (data !== undefined) {
            this.data = data;
        }
        return this; // Permite encadenar llamadas
    }

    public static vacio<TData = any>(): JSONRespuesta<TData> {        
        return new JSONRespuesta<TData>(false, "");
    }
}