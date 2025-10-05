export interface Log {
    id?: number;
    ts?: string;
    actor_user_id: number;
    action: string;
    entity_id: number;
    entity_type: string;
    result: string;
    ip?: string;
}