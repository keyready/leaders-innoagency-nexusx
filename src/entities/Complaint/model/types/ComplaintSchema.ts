export interface Complaint {
    _id: string;
    isBanned?: boolean;
    from?: string;
    target?: string;
    decision?: string;
    comment?: string;
}

export interface ComplaintSchema {
    data?: Complaint
    isLoading: boolean;
    error?: string
}
