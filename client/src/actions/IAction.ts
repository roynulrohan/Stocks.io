import { Action } from 'redux';

/**
 * https://github.com/acdlite/flux-standard-action
 */

export default interface IAction extends Action<string> {
    type: string;
    payload?: any;
    error?: boolean;
    meta?: any;
}
