export class User{
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    address!: string;
    phone_number?: string;
    seller!: number;
    token?: string;
}