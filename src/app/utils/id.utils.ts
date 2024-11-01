import { PBKDF2, HmacSHA256 } from "crypto-js";

import * as moment from "moment";

export class NGXSeasonIDUtils {

    private static count: number = -1;

    public static generateHashID(name: string, keySize: number = 256, iterations: number = 512): string {
        this.count = (this.count + 1) % Number.MAX_SAFE_INTEGER;

        const password: string = `${name}_${this.count}`;
        const salt: string = `${name}_${moment().format('x')}`;
        const key: string = PBKDF2(password, salt, { keySize, iterations }).toString();
        return HmacSHA256(salt, key).toString();
    }

}