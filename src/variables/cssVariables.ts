/** @desc Re-export parsed and typed scss variables to ts code */

import * as cssVariables from './variables-export.scss';

// See pre-exports in `variables-export.scss`
export interface TVariables {
  blockRootNode: string;
}

const vars = cssVariables as TVariables;

const {
  // prettier-ignore
  blockRootNode,
} = vars;

export {
  // prettier-ignore
  blockRootNode,
};
