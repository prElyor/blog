export class ValidationClass {
    email (email: string): boolean {
        const regexEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regexEmail.test(email)
    }

    text (text: string): boolean{
        return !!text.trim();
    }

    username (text: string): boolean {
        return text.trim().length >= 6;
    }

    password (password: string): boolean {
        return password.trim().length > 5;
    }
}

export const Validate = new ValidationClass()