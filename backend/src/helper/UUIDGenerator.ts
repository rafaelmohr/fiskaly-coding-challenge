import * as crypto from "node:crypto";

export function newUUID(): string {
    return crypto.randomUUID();
}
