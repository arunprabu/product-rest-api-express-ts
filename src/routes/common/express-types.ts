import { Request, Response } from 'express';
import { PlainObject } from 'jet-validators';

type UrlParams = Record<string, string>;

export type Req = Request<UrlParams, void, PlainObject>;
export type Res = Response;
