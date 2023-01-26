export type Student = {
    id: number;
    presenceState: boolean;
    signatureTimestamp?: string;
    signature?: string;
    comment?: string;
    dateCreated?: string;
    dateUpdated?: string;
    firstName: string;
    lastName: string;
}
