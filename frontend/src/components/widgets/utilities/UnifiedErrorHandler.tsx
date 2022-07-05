export default class UnifiedErrorHandler {
    public static handle(error: Error, message: string): void {
        alert(message);
        console.error(error);
    }
}