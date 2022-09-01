export interface Ecs {
    version: string;
}

export interface User {
    name: string;
}

export interface Service {
    name: string;
    version: string;
}

export interface Container {
    name: string;
}

export interface Tracing {
    uuid: string;
    request_id: string;
    idSessaoFrwk: string;
}

export interface Log {
    level: string;
    logger: string;
}

export interface Error {
    stack_hash: string;
    stack_trace: string;
}

export interface LogObject {
    id: string;
    '@timestamp': Date;
    '@version': string;
    ecs: Ecs;
    user: User;
    canal: string;
    service: Service;
    container: Container;
    tags: string[];
    tracing: Tracing;
    log: Log;
    message: string;
    error: Error;
}

